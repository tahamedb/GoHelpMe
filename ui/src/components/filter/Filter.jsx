import "./filter.scss";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

function Filter() {
  const [startDate, setStartDate] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [query, setQuery] = useState({
    category: "",
    startDate: null,
  });
  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFilterText(e.target.value);
  };

  return (
    <div className="filter">
      {/* <div className="headerWithSelect">
        <h1></h1>
        <div className="sortitem">
          <label htmlFor="sort">Sort By : </label>
          <select id="sort" name="sort">
            <option value="location">Location</option>
          </select>
        </div>
      </div> */}
      <div className="top">
        <div className="item">
          {/* <label htmlFor='city'>Location</label> */}
          <input
            type="text"
            id="filterText"
            name="filterText"
            placeholder="Search By Anything"
            onChange={handleChange}
            value={filterText}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          {/* <label htmlFor='category'>Category</label> */}
          <select id="category" name="category" onChange={handleChange}>
            <option value="">Select a Category</option>
            <option value="environment">Environment</option>
            <option value="education">Education</option>
            <option value="health">Health</option>
            <option value="community">Community Development</option>
            <option value="animals">Animal Welfare</option>
            <option value="arts">Arts and Culture</option>
          </select>
        </div>
        <div className="item">
          {/* <label htmlFor='startDate'>Start Date</label> */}
          <DatePicker
            id="startDate"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Start Date"
          />
        </div>
        <Link
          to={`/list?filterText=${filterText}&category=${query.category}&startDate=${query.startDate}`}
        >
          <button className="filterButton">
            <img src="/search.png" alt="" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Filter;
