import React, { useState } from 'react'
import styled from 'styled-components';
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


export default function ChatInput({ handleSendMsg }) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }
    const handleEmojiClick = (e) => {
        let message = msg;
        message += e.native;
        setMsg(message);
    }

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg('');
        }
    }
    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                    {
                        showEmojiPicker && <Picker data={data} onEmojiSelect={handleEmojiClick} />
                    }
                </div>
            </div>
            <form action="" className="input-container" onSubmit={(e) => sendChat(e)}>
                <input type="text" placeholder="write your text here" value={msg} name='msg' onChange={(e) => setMsg(e.target.value)} />
                <button className="submit">
                    <IoMdSend />
                </button>
            </form>
        </Container>
    )
}

const Container = styled.div`
display:grid;
grid-template-columns: 5% 95%;
align-items:center;
background-color: #080420;
padding :0 2rem;
padding-bottom: 0.3rem;
@media screen and (min-width:720px) and (max-width:1080px){
    padding:0 1rem;
    gap:1rem;
}
.button-container{
    display:flex;
    align-items:center;
    color:white;
    gap:1rem;
    .emoji{
        position:relative;
        svg{
            font-size:1.5rem;
            color:#ffff00c8;
            cursor:pointer;
            }
        em-emoji-picker{
            position : absolute;
            top: -28rem;
            background-color: #080420;
            box-shadow: 0 5px 10px #9a86f3;
            border-color: #9186f3;
            :host, #root, input, button{
                background-color: #080420;
                }
            }
                .search{
                background-color:transparent;
                border-color: #9186f3;}
        }
    }
.input-container{
width:100%;
border-radius:2rem;
display:flex;
align-items:center;
gap:2rem;
background-color:#ffffff34;
    input{
        width:90%;
        background-color: transparent;
        color:white;
        border:none;
        padding-left: 1rem;
        font-size:1.1rem;
        &::selection{
            background-color:#9a86f3;
        }
        &:focus{
            outline:none;
        }
    }
    button{
    padding:0.3rem 2rem;
    border-radius:2rem;
    display:flex;
    justify-content:center;
    align-items-center;
    background-color:#9186f3;
    border:none;
    @media screen and (min-width:720px) and (max-width:1080px){
        padding: 0.3rem 1rem;
        svg{
            <font-size:1re></font-size:1re>
            }
        }
    svg{
        font-size:2rem;
        color:white;
        }
    }
}`;

