import { Marker, Popup } from "react-leaflet";
import "./pin.scss";
import { Link } from "react-router-dom";

function Pin({ item }) {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popupContainer">
          <img src={item.images[0]} alt="" className="pinImg" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <progress
              value={item.participants || 0}
              max={item.requiredParticipants}
              className="progressBar"
            ></progress>
            <span>
              {parseInt(item.participants) || 0} participants, required:{" "}
              {item.requiredParticipants}
            </span>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
