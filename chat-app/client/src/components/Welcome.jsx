import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Robot from '../asstes/robot.gif'

export default function Welcome({currentUser}) {
  return (
    <Container>
        <img src={Robot} alt='RobotImage'/>
        <h1>
            Welcome, <span>{currentUser ? currentUser.username : ""}</span>
        </h1>
        <h3>Please select a chat to Start Messaging.</h3>  
    </Container>
  )
}

const Container = styled.div`
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
color:white;
img{
    height: 20rem;
}
span{
color: #4e00ff;
}
`;