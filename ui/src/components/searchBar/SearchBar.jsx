import "./searchBar.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="searchBar">
      <form>
        <input
          type="text"
          name="query"
          placeholder="Search by city, title, description..."
          onChange={handleChange}
          value={query}
        />
        <Link to={`/list?query=${query}`}>
          <button type="button">
            <img src="/search.png" alt="Search" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
