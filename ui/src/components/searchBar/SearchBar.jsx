import "./searchBar.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState({
    city: "",
  });

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="searchBar">
      <div className="type"></div>
      <form>
        <input
          type="text"
          name="city"
          placeholder="City Location"
          onChange={handleChange}
        />

        <button>
          <img src="/search.png" alt="" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
