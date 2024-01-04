import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Robot from "../assets/robot.gif"
import { useNavigate } from 'react-router-dom';

const Welcome = ({currentUser}) => {
    const navigate = useNavigate();
    // const [userName, setUserName] = useState("");
//   useEffect(() => {
//     (async()=>{
//     setUserName(
//       await JSON.parse(
//         localStorage.getItem("chat-app-user")
//       ).username
//     )})()
//   }, []);
const handleClick=()=>{
        
    localStorage.clear();
    navigate("/login");
    console.log("clicked")
}
  return (
    <Container>
   
    <img src={Robot} alt='robot'/>
    <h1>Welcome, <span>{currentUser.username}!</span></h1>
    <h3>Please select a chat to Start messaging.</h3><br/>
    <h3>Want to logged-out! <button style={{backgroundColor: "#4e0eff",padding: "0.7rem",color:"white",border:"none",fontSize:"1.2rem",
    borderRadius: "0.5rem",cursor:"pointer"}} onClick={handleClick}><p>Logout</p></button></h3>
    </Container>
  )
}

export default Welcome;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height:16rem;
    
  }
  span {
    color: #4e0eff;
  }
`;
