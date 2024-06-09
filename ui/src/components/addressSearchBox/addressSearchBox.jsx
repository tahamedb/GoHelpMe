import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FixedSizeList } from "react-window";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import "./addressSearchBox.scss";

import Divider from "@mui/material/Divider";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export default function SearchBox({ setLatitude, setLongitude }) {
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false);

  const handleSearch = () => {
    const params = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setListPlace(data);
        setIsListVisible(true); // Show the list after search
      })
      .catch((err) => console.log("err: ", err));
  };

  const handleListItemClick = (address, latitude, longitude) => {
    setSearchText(address);
    setLatitude(latitude);
    setLongitude(longitude);
    setIsListVisible(false); // Hide the list after selecting an address
  };

  const renderRow = ({ index, style }) => (
    <ListItem
      style={style}
      key={index}
      component="div"
      disablePadding
      alignItems="flex-start"
      divider="true"
    >
      <ListItemButton
        onClick={() =>
          handleListItemClick(
            listPlace[index]?.display_name,
            listPlace[index]?.lat,
            listPlace[index]?.lon
          )
        }
      >
        <ListItemText primary={listPlace[index]?.display_name} />
      </ListItemButton>
    </ListItem>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <input
            id="address"
            name="address"
            type="text"
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
            className="inputSearch"
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
        >
          {/* <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button> */}

          <button onClick={handleSearch} className="searchButton">
            <img src="/search.png" alt="" />
          </button>
        </div>
      </div>
      <Box
        sx={{
          width: "100%",
          height: 400,
          maxWidth: 360,
          bgcolor: "background.paper",
          display: isListVisible ? "block" : "none",
        }}
      >
        <FixedSizeList
          height={400}
          width={550}
          itemSize={80}
          itemCount={listPlace.length}
          overscanCount={5}
          sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}
        >
          {renderRow}
        </FixedSizeList>
      </Box>
    </div>
  );
}
