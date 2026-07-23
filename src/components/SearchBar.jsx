function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="🔍 Search by product name..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="search"
    />
  );
}

export default SearchBar;