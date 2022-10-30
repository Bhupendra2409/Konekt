import './share.css'
import { PermMedia,Label,Room,EmojiEmotions } from '@material-ui/icons'
import { useContext } from 'react'
import {AuthContext} from '../../context/AuthContext'
import { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';
export default function Share() {
    const {user} = useContext(AuthContext);
    const desc = useRef();

    const [file, setFile] = useState(null);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const submitHandler= async (e)=>{
        e.preventDefault();
        const newPost = {
            userId:user._id,
            desc:desc.current.value
        }
        try{
            await axios.post("/posts",newPost);
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className='shareProfileImg' src={user.user.profilePicture?PF+user.user.profilePicture:PF+"person/3.jpeg"} alt="" />
                    <input placeholder="What's on your mind" ref={desc} className='shareInput'/>
                </div>
                <hr className="shareHr" />
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                            <PermMedia htmlColor='tomato' className='shareIcon'/>
                            <span className='shareOptionText'>Photo or Video</span>
                            <input style={{display:"none"}} type="file" id="file" accept='.png,.jpg,.jpeg' onChange={(e)=>setFile(e.target.files[0])} />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor='blue' className='shareIcon'/>
                            <span className='shareOptionText'>Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor='green' className='shareIcon'/>
                            <span className='shareOptionText'>Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor='gold' className='shareIcon'/>
                            <span className='shareOptionText'>Feelings</span>
                        </div>
                    </div>
                    <button className="btn shareButton" type='submit'>Share</button>
                </form>
            </div>
        </div>
    )
}
