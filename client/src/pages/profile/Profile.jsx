import "./profile.css";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router";
// import EditIcon from '@mui/icons-material/Edit';
import { Edit } from "@material-ui/icons";
import ShowProfile from "../../components/Profile/ShowProfile";
import EditProfile from "../../components/Profile/EditProfile";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [profilePicture, setProfilePicture] = useState([]);

  const [isEditProfile, setIsEditProfile] = useState(false);

  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/user?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  
  
  return (
    <>
      <Topbar />
      {!isEditProfile ? <ShowProfile user = {user} setIsEditProfile={setIsEditProfile}/> : <EditProfile setIsEditProfile={setIsEditProfile} user = {user}/>}
    </>
  );
}
