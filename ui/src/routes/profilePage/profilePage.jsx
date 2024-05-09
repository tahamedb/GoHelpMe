import "./profilePage.scss";
import { userData } from "../../lib/dummydata";
import List from "../../components/list/list";
import Chat from "../../components/chat/Chat";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
function ProfilePage() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = apiRequest.get("/auth/logout");
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handlePost = async () => {
    try {
      navigate("/add");
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
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar :{" "}
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
            </span>
            <span>
              Username : <b>John Doe</b>
              {userData.badge && (
                <div className="badge">
                  <img src={`/${userData.badge}.png`} alt="" />
                </div>
              )}
            </span>
            <span>
              E-mail :<b>john@gmail.com</b>{" "}
            </span>
            <span>
              <button onClick={handleLogout}>Logout</button>
            </span>
          </div>
          <div className="title">
            <h1>My Posts</h1>
            <button onClick={handlePost}>Create New Post</button>
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
