import { useState } from "react";
import axios from "axios";

const UrlForm = ({ setShortUrl }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/shorten", {
        originalUrl: url,
      });

      setShortUrl(`http://localhost:5000/${response.data.shortCode}`);
      setUrl("");
    } catch (err) {
      setError("Failed to shorten URL. Check backend or URL validity.");
    }

    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your long URL..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-60"
      >
        {loading ? "Shortening..." : "Shorten URL"}
      </button>
    </form>
  );
};

export default UrlForm;
