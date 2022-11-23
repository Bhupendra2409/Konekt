import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import Feed from '../feed/Feed';
import Rightbar from '../rightbar/Rightbar';
import { useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext'

import { storage } from '../../firebaseconfig'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useContext } from 'react';
import axios from 'axios';

export default function EditProfile({setIsEditProfile}) {

    const { user } = useContext(AuthContext);


    const [profilePicture, setProfilePicture] = useState(null);
    const [coverPicture, setCoverPicture] = useState(null);
    const [relationship, setRelationship] = useState("");
    const [description, setDescription] = useState("")
    const [city, setCity] = useState("")

    const [profilePictureLink, setProfilePictureLink] = useState("");
    const [coverPictureLink, setCoverPictureLink] = useState("");

    const [relnum, setRelnum] = useState(3)
    useEffect(() => {
      setRelnum(relationship==="Single" ? 1 : relationship==="Mingle" ? 2 : 3);
    }, [relationship])
    
    // console.log(relationship)
    const uploadProfileImage = async () => {
        try {
            var name = `${user.user.username}` + Date.now();

            var storageRefProfilePicture = ref(storage, '/profile/' + name);

            await uploadBytes(storageRefProfilePicture, profilePicture).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    // console.log("file download at", downloadURL);
                    setProfilePictureLink(downloadURL);
                })
            });



        } catch (err) {
            console.log(err)
        }

    }

    const uploadCoverImage = async () => {
        try {
            var name = `${user.user.username}` + Date.now();


            var storageRefCoverPicture = ref(storage, '/cover/' + name);
            await uploadBytes(storageRefCoverPicture, coverPicture).then((snapshot) => {
                getDownloadURL(snapshot.ref).then(async (downloadURL) => {
                    // console.log("file download at", downloadURL);
                    setCoverPictureLink(downloadURL);
                    
                })
            });



        } catch (err) {
            console.log(err)
        }

    }



    const submitProfileChanges = async (e) => {
        e.preventDefault();
        try {
            // if (profilePicture)
                await uploadProfileImage().then(await uploadCoverImage().then(console.log(profilePictureLink)));
                setTimeout(async()=>{
                    const res = await axios.put(`/user/${user.user._id}`,{
                        userId : user.user._id,
                        city: city,
                        desc: description,
                        relationship: relnum,
                        profilePicture : profilePictureLink,
                        coverPicture:coverPictureLink
                    })
                    setIsEditProfile(false);
                    console.log(res.data);
                },2000)
                

            // if (coverPicture)
            //     await uploadCoverImage();
        } catch (err) {
            console.log(err);
        }

    }
    return (
        <div className="profile">
            <Sidebar />
            <div className="profileRight px-4 mt-4">
                <form>
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="text" readonly className="form-control-plaintext" id="staticEmail" value={user.user.email} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">City</label>
                        <input type="email" value={city} onChange={(e)=>setCity(e.target.value)} className="form-control" id="exampleFormControlInput1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label" >Profile Picture</label>
                        <input className="form-control" type="file" accept='.png,.jpg,.jpeg' id="formFile" onChange={(e) => { setProfilePicture(e.target.files[0]) }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cover" className="form-label" >Cover Picture</label>
                        <input className="form-control" type="file" accept='.png,.jpg,.jpeg' id="cover" onChange={(e) => { setCoverPicture(e.target.files[0]) }} />
                    </div>


                    <label htmlFor="relationshipform" className='form-label'>Relationship status </label>
                    <select onChange={(e) => { setRelationship(e.target.value) }} className="form-select form-select-sm" id='relationshipform' aria-label=".form-select-sm example">
                        <option defaultValue={true}>Select one</option>
                        <option >Single</option>
                        <option  >Mingle</option>
                        <option >Prefer not to disclose</option>
                    </select>


                    <button type="submit" className="btn mt-4 btn-primary" onClick={submitProfileChanges}>Submit</button>
                </form>

            </div>
        </div>
    )
}
