import "./profilePage.scss";
import { userData } from "../../lib/dummydata";
import List from "../../components/list/list";
import Chat from "../../components/chat/Chat";
import apiRequest from "../../lib/apiRequest";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { i } from "mathjs";
function ProfilePage() {
  const { currentUser, updateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await apiRequest.post("/auth/logout");
      console.log(res);
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar :{" "}
              <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            </span>
            <span>
              Username : {currentUser.username}
              {userData.badge && (
                <div className="badge">
                  <img src={`/${userData.badge}.png`} alt="" />
                </div>
              )}
            </span>
            <span>
              E-mail :<b>{currentUser.email}</b>{" "}
            </span>
            <span>
              <button onClick={handleLogout}>Logout</button>
            </span>
          </div>
          <div className="title">
            <h1>My Posts</h1>
            <button>Create New Post</button>
          </div>
          <List></List>
          <div className="title">
            <h1>Saved Posts</h1>
          </div>
          <List></List>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat></Chat>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
