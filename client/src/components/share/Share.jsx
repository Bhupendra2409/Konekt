import './share.css'
import { PermMedia, Label, Room, EmojiEmotions } from '@material-ui/icons'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';

import { storage } from '../../firebaseconfig'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import NoAvatar from '../NoAvatar';

export default function Share() {
    

    const { user } = useContext(AuthContext);
    
    const desc = useRef();
    const [imageLink, setImageLink] = useState("")
    // console.log("user is " , user);
    const [file, setFile] = useState(null);


    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    // console.log("this is PF",PF );

    const uploadImage = async () => {
        try {
            var name = `${user.user.username}` + Date.now();

            var storageRef = ref(storage, '/images/' + name);
            await uploadBytes(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    // console.log("file download at", downloadURL);
                    setImageLink(downloadURL);

                })
            });
        } catch (err) {
            console.log(err)
        }

    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            if (file)
                uploadImage();


            var newPost = {
                userId: user.user._id,
                desc: desc.current.value,
                photo: imageLink
            }
            if (imageLink === "") {
                newPost = {
                    userId: user.user._id,
                    desc: desc.current.value,
                }
            }
            await axios.post("/posts", newPost);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    {user.user.profilePicture ? <img className='shareProfileImg' src={user.user.profilePicture} alt="" /> : <NoAvatar letter={user.user.username[0]}/>}
                    
                    <input placeholder="What's on your mind" ref={desc} className='shareInput' />
                </div>
                <hr className="shareHr" />
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                            <PermMedia htmlColor='tomato' className='shareIcon' />
                            <span className='shareOptionText'>Photo or Video</span>
                            <input style={{ display: "none" }} type="file" id="file" accept='.png,.jpg,.jpeg' onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor='blue' className='shareIcon' />
                            <span className='shareOptionText'>Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor='green' className='shareIcon' />
                            <span className='shareOptionText'>Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor='gold' className='shareIcon' />
                            <span className='shareOptionText'>Feelings</span>
                        </div>
                    </div>
                    <button className="btn shareButton" type='submit'>Share</button>
                </form>
            </div>
        </div>
    )
}
