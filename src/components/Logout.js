import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import {BiPowerOff} from "react-icons/bi"
const Logout = () => {
    const navigate=useNavigate();
    const handleClick=async()=>{
        
        localStorage.clear();
        navigate("/login");
        console.log("clicked")
    }
  return (
    <div >
    <button style={{backgroundColor: "#010412",padding: "0.4rem",fontSize:"0.8rem",color:"white",border:"none",
    borderRadius: "0.5rem",cursor:"pointer"}} onClick={handleClick}><p>Logout</p></button>
    <Button >
      <BiPowerOff /> 
    
    </Button>
    </div>
  )
}

export default Logout;
const Button = styled.button`
  display: flex;
  padding: 0.1rem;
  background-color: #596FB7;
  margin-Left:1rem;
  border:none;
  
  svg {
    font-size: 1.5rem;
    color: #ebe7ff;
   
  }
`;