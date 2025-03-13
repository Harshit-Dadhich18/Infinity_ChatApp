import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Logo from '../asstes/Logo.png'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';

export default function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000, //in ms
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate("/login");
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { password, username, email } = values;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions)
            }
            if (data.status === true) {
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                navigate("/");
            }
        }
    }
    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) { // first install react-toastify and aslo import its css file
            toast.error("Password and ConfirmPassword should be same.", toastOptions);
            return false;
        }
        else if (username.length < 3) {
            toast.error("Username must have more than 3 characters", toastOptions);
            return false;
        }
        else if (password.length < 6) {
            toast.error("Password must have more than 6 characters", toastOptions);
            return false;
        }
        return true;
    }
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    return (<>
        <FormContainer>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className="brand">
                    <img src={Logo} alt="LOGO" />
                    <h1>Infinity</h1>
                </div>
                <input type="text" placeholder='Enter your Username' name='username' required onChange={e => handleChange(e)} />
                <input type="email" placeholder="Enter your email" name='email' required onChange={e => handleChange(e)} />
                <input type="password" placeholder='password' name='password' required onChange={e => handleChange(e)} />
                <input type="password" placeholder='confirmPassword' name='confirmPassword' required onChange={e => handleChange(e)} />
                <button type='submit'>Create User</button>
                <span>Already have an Account?<Link to="/login"> Login</Link></span>
            </form>
        </FormContainer>
        <ToastContainer />
    </>
    )
}

const FormContainer = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background-color:#131324;
    gap:1rem;
    .brand{
        display:flex;
        align-items:center;
        justify-content:center;
        gap:1rem;
        img{
        height: 5rem;
        }
        h1{
        color:white;
        text-transform:uppercase;
        }
    }
    form{
        display:flex;
        flex-direction:column;
        gap:2rem;
        background-color:#00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input{
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius:0.4rem;
            color:white;
            width:100%;
            font-size:1rem;
            &:focus{
                border:0.1rem solid #997af0;
                outline:none
            }
        }
        button{
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
        span{
        color:white;
        text-transform:uppercase;
        a {
            color:#40e0ff;
            text-decoration:none;
            font-weight:bold;
        }
        }
    }`;