import validUrl from 'valid-url';
import { nanoid } from 'nanoid';
import Url from '../models/Url.js';
import dotenv from 'dotenv';

const SHORTCODE_LENGTH = 6;

export const createShortUrl = async (req, res, next) => {
    try { 
        const { originalUrl } = req.body;

        //validate URL
        if(!originalUrl || !validUrl.isWebUri(originalUrl)) {
            res.status(400);
            throw new Error("Invalid URL");
        } 

        //check if URL already exists
        const existing = await Url.findOne({ originalUrl});
        if(existing) {
            return res.json({ shortCode: existing.shortCode });
        }

        //generate unique shortCode
        let shortCode;
        let exists;
        do {
            shortCode = nanoid(SHORTCODE_LENGTH);
            exists = await Url.findOne({ shortCode });
        } while (exists);

        //save to DB
        const url = new Url({
            originalUrl,
            shortCode,
        });

        await url.save();

        res.status(201).json({ shortCode});
    } catch (err) {
        next(err);
    }
};

export const redirectToOriginal = async (req, res, next) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });
        if(!url) {
            res.status(404);
            throw new Error("Short code not found");
        }

        //increment click count
        url.clickCount += 1;
        await url.save();

        //redirect to original URL
        return res.redirect(url.originalUrl);
    } catch (err) {
        next(err);
    }
}