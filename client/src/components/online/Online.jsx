import "./online.css";

export default function Online({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="rightbarFrndListItem">
      <div className="rightbarFrndImgCnt d-flex position-relative">
        <img className="rightbarFrndImg" src={PF+user.profilePicture} alt="" />
        <span className="rightbarFrndImgBadge position-absolute badge rounded-circle  bg-success translate-middle border border-light">
          <div className="visually-hidden">Online</div>
        </span>
      </div>
      <span className="rightbarFrnd">{user.username}</span>
    </li>
  );
}
