import { Link } from "react-router-dom";
import "./card.scss";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function Card({ item }) {
  console.log(item);
  const postId = item.id;
  console.log(postId);
  const [saved, setSaved] = useState(item.isSaved);
  const { currentUser } = useContext(AuthContext);

  const handleSave = async () => {
    setSaved((prev) => !prev);
    if (!currentUser) {
      useNavigate("/login");
    }
    try {
      await apiRequest.post(`/users/save?postId=${postId}`);
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>

        <div className="progressBarContainer">
          <progress
            value={item.participants}
            max={item.totalParticipants}
            className="progressBar"
          ></progress>
          <span>{item.participants} participants</span>
        </div>
        <div className="bottom">
          <div className="icons">
            <div
              className="icon"
              style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}
            >
              <img src="/save.png" alt="" onClick={handleSave} />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
