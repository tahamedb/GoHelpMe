import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { userData } from "../../lib/dummydata";
import { AuthContext, AuthContextProvider } from "../../context/AuthContext";
function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>GoHelpMe</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            <span>{currentUser.username}</span>
            <div className="badge">
              {userData.badge && <img src={`/${userData.badge}.png`} alt="" />}
            </div>
            <Link to="/profile" className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in </a>
            <a href="/register" className="register">
              Sign up{" "}
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign in </a>
          <a href="/">Sign up </a>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
