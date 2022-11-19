import "./profile.css";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [profilePicture, setProfilePicture] = useState([]);

  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/user?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  useEffect(()=>{
    const editProfilePicture = async ()=>{
      const res = await axios.put(`/editprofilepicture?username=${username}`);
      setUser(res.data);
    }
  },[profilePicture])


  

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={PF + user.coverPicture}
                alt=""
              />
              <img
                className="profileUserImg"
                src={PF + user.profilePicture}
                alt=""
              />

              <label htmlFor='profilePicture' className="shareOption">
                <span className='shareOptionText'>Edit</span>
                <input style={{ display: "none" }} type="file" id="profilePicture" accept='.png,.jpg,.jpeg' onChange={(e) => setProfilePicture(e.target.files[0])} />
              </label>
              
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={user.username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
