
import "./rightbar.css";
import {Users} from '../../dummyData'
import Online from "../online/Online";


export default function Rightbar({user}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  const HomeRightbar =()=>{
    return(
      <>
      <div className="birthdayCnt">
          <img src={`${PF}gift.png`} className="birthdayImg" alt="" />
          <span className="birthdayText">
            <b>Adnan</b> and <b>3 other friends</b> have birthday today
          </span>
        </div>
        <hr className="rightbarHr" />
        <img className="rightbarAdImg" src={`${PF}ad/1.jpeg`} alt="" />
        
        <h5 className="rightbarTitle">Online Friends</h5>
        <ul className="rightbarFrndList">
           {Users.map(u=>(
               <Online user={u} key={u.id}/>
           ))}
        </ul>
      </>
    )
  }
  const ProfileRightbar =()=>{
    return(
      <>
      <h5 className="rightbarTitle">About</h5>
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">City</span>
        <span className="rightbarInfoValue">{user.city}</span>
      </div>
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">From</span>
        <span className="rightbarInfoValue">{user.from}</span>
      </div>
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">Relationship</span>
        <span className="rightbarInfoValue">{user.relationship===1 ? "Single":user.relationship===2?"Married":"-"}</span>
      </div>
      <div className="rightbarEmptyDiv"></div>
      <h5 className="rightbarTitle">Friends</h5>
      <div className="rightbarFollowings">
        <div className="rightbarFollowing">
          
          <img src={`${PF}person/1.jpeg`} className="rightbarFollowingImg" alt="" />
          <span className="rightbarFollowingName">Vanshil</span>
        </div>
      </div>
      </>
    )
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user && <ProfileRightbar/>}
        {!user && <HomeRightbar/>}
        
      </div>
    </div>
  );
}
