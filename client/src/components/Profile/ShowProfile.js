import React from 'react'
import Sidebar from '../sidebar/Sidebar';
import Feed from '../feed/Feed';
import { Edit } from '@material-ui/icons';
import Rightbar from '../rightbar/Rightbar';

export default function ShowProfile({ user, setIsEditProfile }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="profile">
            <Sidebar />
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img
                            className="profileCoverImg"
                            src={user.coverPicture}
                            alt=""
                        />
                        <img
                            className="profileUserImg" id="profilePagePhoto"
                            src={user.profilePicture}
                            alt=""
                        />



                    </div>
                    <div className="profileInfo">
                        <h4 className="profileInfoName">{user.username}</h4>
                        <span className="profileInfoDesc">{user.desc}</span>
                        {/* <button className='btn btn-primary mt-2' onClick={(e)=>{e.preventDefault();setIsEditProfile(true)}}>Edit Profile</button> */}
                        
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Feed username={user.username} />
                    <Rightbar user={user} />
                </div>
            </div>
        </div>
    )
}
