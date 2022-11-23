import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const profilePicture = user.user.profilePicture;
  const username = user.user.username;

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="topbarCnt">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Tachyon</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="Search here" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">
              1
            </span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">
              4
            </span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">
              5
            </span>
          </div>
        </div>
        <Link to={`/profile/${username}`}>
          <img
            src={profilePicture ? PF + profilePicture : PF + "person/1.jpeg"}
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
