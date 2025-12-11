const ShortUrlDisplay = ({ shortUrl }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Shortened URL:
      </h2>

      <a
        href={shortUrl}
        target="_blank"
        className="text-blue-600 font-medium break-all hover:underline"
      >
        {shortUrl}
      </a>

      <button
        onClick={copyToClipboard}
        className="mt-3 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition"
      >
        Copy
      </button>
    </div>
  );
};

export default ShortUrlDisplay;
