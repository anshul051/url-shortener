import { useState } from "react";
import UrlForm from "./components/UrlForm";
import ShortUrlDisplay from "./components/ShortUrlDisplay";

function App() {
  const [shortUrl, setShortUrl] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-20 px-4">
      <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          URL Shortener
        </h1>

        <UrlForm setShortUrl={setShortUrl} />

        {shortUrl && <ShortUrlDisplay shortUrl={shortUrl} />}
      </div>
    </div>
  );
}

export default App;