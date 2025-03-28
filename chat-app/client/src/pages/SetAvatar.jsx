import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import loader from '../asstes/loader.gif'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from '../utils/APIRoutes';

const multiavatar = require('@multiavatar/multiavatar')

export default function SetAvatar() {
    const api = "https://api.multiavatar.com/55555";
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000, //in ms
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };

    useEffect(() => {
        if (!localStorage.getItem('chat-app-user')) {
            navigate("/login");
        }
    },[])
    

    const setProfilePicture = async() => {
        if(selectedAvatar === undefined){
            toast.error("Avatar not selected", toastOptions)
        }
        else{
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`,{
                image: avatar[selectedAvatar]
            });
            console.log(data);
            if(data.success){
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user",JSON.stringify(user));
                localStorage.clear();
                toast.success("You have successfully set your avatar. Please log in again.");
                setTimeout(() => {
                    navigate('/login'); // Redirect after a brief delay
                }, 2000); 
                // navigate('/login');
            }
            else{
                toast.error("Error setting Avatar. Please try again later.")
            }
        }
    }
    useEffect(() => {
        const data = [];
        for (let i = 0; i < 4; i++) {
            try {
                const randomSeed = Math.floor(Math.random() * 1000); // Use Math.floor for integer
                const svg = multiavatar(randomSeed); // Generate SVG avatar
                const base64Image = btoa(svg); // Convert SVG to base64
                data.push(`data:image/svg+xml;base64,${base64Image}`); // Prepend base64 format
            } catch (error) {
                toast.error("Error fetching avatars", toastOptions);
            }
        }
        setAvatar(data);
        setIsLoading(false);
    },[]);

return (
    <> {
        isLoading ? <Container>
            <img src={loader} alt="loader" />
        </Container> : <Container>
            <div className="title-container">
                <h1>Pick an avatar for your profile picture</h1>
            </div>
            <div className="avatars">
                {avatar.map((avatarData, index) => {
                    return (
                        <div
                            key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""
                                }`}>
                            <img src={avatarData} alt="avatar" onClick={() => setSelectedAvatar(index)} />
                        </div>
                    )
                })}
            </div>
            <button className="submit-btn" onClick={setProfilePicture}>Set profile</button>
        </Container>
            }
            <ToastContainer />
    </>
)
}

const Container = styled.div`
display:flex;
justify-content: center;
align-items: center;
flex-direction:column;
gap: 3rem;
background-color:#131324;
height:100vh;
width:100vw;
.loader{
    max-inline-size: 100%;
    }
.title-container{
    h1{
    color:white;
    }
}
.avatars{
display:flex;
align-items: center;
gap:2rem;
    .avatar{
    border: 0.4rem solid transparent;
    padding: 0.4rem;
    border-radius: 5rem;
    diplay:flex;
    justify-content: center;
    align-items:center;
    transition:0.5s ease-in-out;
        img{
        height:6rem;
    }
    }
    .selected{
    border:0.4rem solid wheat;
    }
    }
.submit-btn{
        background-color: #997afe;
        color:white;
        padding:1rem 2rem;
        border:none;
        cursor:pointer;
        border-radius:0.4rem;
        font-size:1rem;
        text-transform:uppercase;
        transition:0.5s ease-in-out;
        &:hover{
        background-color: #4e0eff}}
`;
