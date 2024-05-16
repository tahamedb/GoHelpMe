// import React, { useState } from "react";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import Button from "@mui/material/Button";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Divider from "@mui/material/Divider";

// const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
// const params = {
//   q: "",
//   format: "json",
//   addressdetails: "addressdetails",
// };

// export default function SearchBox() {
//   //   const { selectPosition, setSelectPosition } = props;
//   const [searchText, setSearchText] = useState("");
//   const [listPlace, setListPlace] = useState([]);

//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       <div style={{ display: "flex" }}>
//         <div style={{ flex: 1 }}>
//           {/* <OutlinedInput
//             style={{ width: "100%" }}
//             value={searchText}
//             onChange={(event) => {
//               setSearchText(event.target.value);
//             }}
//           /> */}
//           <input
//             id="address"
//             name="address"
//             type="text"
//             value={searchText}
//             onChange={(event) => {
//               setSearchText(event.target.value);
//             }}
//           />
//         </div>
//         <div
//           style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
//         >
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => {
//               // Search
//               const params = {
//                 q: searchText,
//                 format: "json",
//                 addressdetails: 1,
//                 polygon_geojson: 0,
//               };
//               const queryString = new URLSearchParams(params).toString();
//               const requestOptions = {
//                 method: "GET",
//                 redirect: "follow",
//               };
//               fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
//                 .then((response) => response.text())
//                 .then((result) => {
//                   console.log(JSON.parse(result));
//                   setListPlace(JSON.parse(result));
//                 })
//                 .catch((err) => console.log("err: ", err));
//             }}
//           >
//             Search
//           </Button>
//         </div>
//       </div>
//       <div>
//         <List component="nav" aria-label="main mailbox folders">
//           {listPlace.map((item) => {
//             return (
//               <div key={item?.place_id}>
//                 <ListItem>
//                   {/* <ListItemIcon>
//                     <img
//                       src="./placeholder.png"
//                       alt="Placeholder"
//                       style={{ width: 38, height: 38 }}
//                     />
//                   </ListItemIcon> */}
//                   <ListItemText primary={item?.display_name} />
//                 </ListItem>
//                 <Divider />
//               </div>
//             );
//           })}
//         </List>
//       </div>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import Divider from "@mui/material/Divider";

// const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

// export default function SearchBox() {
//   const [searchText, setSearchText] = useState("");
//   const [listPlace, setListPlace] = useState([]);

//   const handleSearch = () => {
//     const params = {
//       q: searchText,
//       format: "json",
//       addressdetails: 1,
//       polygon_geojson: 0,
//     };
//     const queryString = new URLSearchParams(params).toString();
//     const requestOptions = {
//       method: "GET",
//       redirect: "follow",
//     };
//     fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
//       .then((response) => response.json())
//       .then((data) => {
//         setListPlace(data);
//       })
//       .catch((err) => console.log("err: ", err));
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       <Autocomplete
//         freeSolo
//         options={listPlace.map((item) => item.display_name)}
//         value={searchText}
//         onChange={(event, newValue) => {
//           setSearchText(newValue);
//         }}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label="Search"
//             variant="outlined"
//             onChange={(event) => {
//               setSearchText(event.target.value);
//             }}
//           />
//         )}
//       />
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleSearch}
//         style={{ marginTop: "10px" }}
//       >
//         Search
//       </Button>
//       {/* <div>
//         <List component="nav" aria-label="main mailbox folders">
//           {listPlace.map((item) => (
//             <div key={item?.place_id}>
//               <ListItem>
//                 <ListItemText primary={item?.display_name} />
//               </ListItem>
//               <Divider />
//             </div>
//           ))}
//         </List>
//       </div> */}
//     </div>
//   );
// }

// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import { FixedSizeList } from "react-window";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import ListItemButton from "@mui/material/ListItemButton";

// import Divider from "@mui/material/Divider";

// const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

// export default function SearchBox() {
//   const [searchText, setSearchText] = useState("");
//   const [listPlace, setListPlace] = useState([]);

//   const handleSearch = () => {
//     const params = {
//       q: searchText,
//       format: "json",
//       addressdetails: 1,
//       polygon_geojson: 0,
//     };
//     const queryString = new URLSearchParams(params).toString();
//     const requestOptions = {
//       method: "GET",
//       redirect: "follow",
//     };
//     fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
//       .then((response) => response.json())
//       .then((data) => {
//         setListPlace(data);
//       })
//       .catch((err) => console.log("err: ", err));
//   };

//   const renderRow = ({ index, style }) => (
//     <ListItem style={style} key={index} component="div" disablePadding>
//       <ListItemButton
//         onClick={() => setSearchText(listPlace[index]?.display_name)}
//       >
//         <ListItemText primary={listPlace[index]?.display_name} />
//       </ListItemButton>
//     </ListItem>
//   );

//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       <div style={{ display: "flex" }}>
//         <div style={{ flex: 1 }}>
//           <input
//             id="address"
//             name="address"
//             type="text"
//             value={searchText}
//             onChange={(event) => {
//               setSearchText(event.target.value);
//             }}
//           />
//         </div>
//         <div
//           style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
//         >
//           <Button variant="contained" color="primary" onClick={handleSearch}>
//             Search
//           </Button>
//         </div>
//       </div>
//       <Box
//         sx={{
//           width: "100%",
//           height: 400,
//           maxWidth: 360,
//           bgcolor: "background.paper",
//         }}
//       >
//         <FixedSizeList
//           height={400}
//           width={360}
//           itemSize={46}
//           itemCount={listPlace.length}
//           overscanCount={5}
//         >
//           {renderRow}
//         </FixedSizeList>
//       </Box>
//     </div>
//   );
// }

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FixedSizeList } from "react-window";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

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
    <ListItem style={style} key={index} component="div" disablePadding>
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
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
        >
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>
      <Box
        sx={{
          width: "100%",
          height: 400,
          maxWidth: 360,
          bgcolor: "background.paper",
          display: isListVisible ? "block" : "none", // Show or hide the list based on isListVisible state
        }}
      >
        <FixedSizeList
          height={400}
          width={360}
          itemSize={46}
          itemCount={listPlace.length}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
      </Box>
    </div>
  );
}
