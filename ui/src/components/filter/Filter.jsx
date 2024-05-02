import './filter.scss';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Filter(){
  const [startDate, setStartDate] = useState(null);
  return (
    <div className='filter'>
  <div className="headerWithSelect">
  <h1></h1>
  <div className="sortitem">
    <label htmlFor='sort'>Sort By : </label>
    <select id='sort' name='sort'>
      <option value="location">Location</option> 
    </select>
  </div>
</div>
      <div className="top">
        <div className="item">
          {/* <label htmlFor='city'>Location</label> */}
          <input type='text' id='city' name='city' placeholder='Search By Location' />
          
        </div>
      </div>
      <div className="bottom">
      <div className="item">
    {/* <label htmlFor='category'>Category</label> */}
    <select id='category' name='category'>
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
            id='startDate'
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText='Start Date'
          />
</div>
        <button>
          <img src="/search.png" alt="" />
        </button>
      </div>
    </div>
  )
}

export default Filter