function SearchIframe({ searchTerm }) {
  const googleImagesUrl = `https://www.google.com/search?igu=1&tbm=isch&q=${encodeURIComponent(searchTerm)}`;


  return (
    <div className="w-2/5 ml-8 p-6 bg-white rounded-lg shadow-md h-[700px]">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Google Image Search</h3>
      <iframe
        title="Google Images"
        src={googleImagesUrl}
        className="w-full h-full border-none rounded-md"
      />
    </div>
  );
}

export default SearchIframe;

