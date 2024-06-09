import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import { singlePostData, userData } from "../../lib/dummydata";
import Map from "../../components/map/Map";
import { useLoaderData, useNavigate } from "react-router-dom";
import DOMpurify from "dompurify";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useState, useContext } from "react";

function SinglePage() {
  const post = useLoaderData();
  const postId = post.id;
  const navigate = useNavigate();

  console.log(post);
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const handleChat = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    try {
      const response = await apiRequest.post("/chats/", {
        receiverId: post.userId,
      });
      navigate(`/profile/${response.data.id}`);
    } catch (error) {
      console.log(
        "Error creating chat:",
        error.response ? error.response.data : error
      );
    }
  };
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

  console.log(post);
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images}></Slider>
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="progressBarContainer">
                  <progress
                    value={post.participants || 0}
                    max={post.requiredParticipants}
                    className="progressBar"
                  ></progress>
                  <span>
                    {parseInt(post.participants) || 0} participants, required:{" "}
                    {post.requiredParticipants}
                  </span>
                </div>
              </div>
              {/* <div className="user">
                  <img src={userData.img} alt="" />
                  <span>{userData.name}</span>
                  </div> */}
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMpurify.sanitize(post.description),
              }}
              style={{ paddingBottom: "20px" }}
            ></div>
          </div>
        </div>
      </div>
      {/* <div className="features"></div>
        <div className="wrapper">
          <p className="title">User Details</p>
          <div className="listVertical">
            <div className="feature">
            {/* <img src={userData.img} alt="" className='user'/> */}
      {/* <div className="featureText">
            <span>{userData.name}</span>
            {userData.badge && <img src={`/badge${userData.badge}.png`} alt={`${userData.badge} badge`} />}
        <div className="lastOnline">
          <img src="/clock .png" alt="" />
          <span>{userData.lastOnline}</span>
        </div>
            </div>
            </div> */}

      {/* </div>
          <p className="title">Post Details</p>
          <div className="listVertical">
          <div className="feature">
      <div className="featureText">
        <strong>Estimated Duration:</strong>
        <span>{singlePostData.estimatedDuration}</span>
      </div>
      <div className="featureText">
        <strong>Minimum Age Required:</strong>
        <span>{singlePostData.minAge}</span>
      </div>
      <div className="featureText">
        <strong>Start Date:</strong>
        <span>{singlePostData.startDate}</span>
      </div>
    </div> */}
      {/* </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[singlePostData]}></Map>
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button>
              <img src="/save.png" alt="" />
              Save the Post
            </button>
          </div> */}
      {/* </div>
    // </div> */}
      <div className="features">
        <div className="wrapper">
          <p className="title">User details</p>
          <div className="listVertical">
            <div className="feature">
              <div className="user">
                <img src={post.user.avatar} alt="" />
              </div>

              <div className="featureText">
                <div className="userDetails">
                  <span>{post.user.username}</span>
                  {post.user.badge && (
                    <img src={`/${post.user.badge}.png`} alt="" />
                  )}
                </div>
              </div>
            </div>
            <div className="feature">
              <div className="clock">
                <img src="/clock.png" alt="" />
              </div>
              <div className="featureText clockText">
                <p>
                  <span>Joined at:</span>
                  {new Date(post.user.createdAt).toLocaleString(undefined, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>
              </div>
            </div>
            {/* <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>Must have 3x the rent in total household income</p>
              </div>
            </div> */}
          </div>
          {/* <p className="title">Post Details</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>80 sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>2 beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>1 bathroom</span>
            </div>
          </div> */}
          <p className="title">Post Details</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/category1.png" alt="" />
              <div className="featureText">
                <span>Category: </span>
                <p>{post.category}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/hourglass.png" alt="" />
              <div className="featureText">
                <span>Estimated Duration : </span>
                <p>{post.volunteerPostDetail.estimatedTime}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/age.png" alt="" />
              <div className="featureText">
                <span>Min Age Required : </span>
                <p>{post.volunteerPostDetail.minAge}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/deadline.png" alt="" />
              <div className="featureText">
                <span>Start Date : </span>
                <p>
                  {new Date(post.startDate).toLocaleString(undefined, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button onClick={handleChat}>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}
            >
              <img src="/save.png" alt="" />
              {saved ? "Post saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
