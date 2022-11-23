import "./post.css";
import { MoreVert } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from 'timeago.js'
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import NoAvatar from "../NoAvatar";


export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const { user: currentUser } = useContext(AuthContext)

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser.user._id))
  }, [currentUser.user._id, post.likes])

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/user?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put(`/posts/${post._id}/like`, { userId: currentUser.user._id })
    }
    catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              {user.profilePicture!=="" ? <img
                className="postProfileImg"
                // src={PF + user.profilePicture || PF + "person/noAvatar.jpeg"}
                src={user.profilePicture}
                alt=""
              />: <NoAvatar letter={user.username[0].toUpperCase()}/>}

            </Link>
            <span className="postUsername">
              <Link to={`/profile/${user.username}`} style={{ textDecoration: 'none' }}>
                {user.username}
              </Link>
              <span className="postDate">{format(post.createdAt)}</span>
            </span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          {/* <img className="postImg" src={PF + post.photo} alt="" /> */}
          {post.photo && <img className="postImg" src={post.photo} alt="" />}

        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={PF + "heart.png"}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <img
              src={PF + "like.png"}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people liked it!</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {post.comment.length} comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
