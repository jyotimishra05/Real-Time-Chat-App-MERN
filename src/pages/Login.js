'use strict';
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/logo.svg"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { loginRoute } from "../utils/APIroutes"

const Login= () => {
  const navigate=useNavigate();
  const [values, setValues] = useState({
    email:"",
    password:"",
   
  })
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    theme: "dark",
  };
  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      navigate("/");
    }

  },[])
  const handleSubmit =async(e)=>{
    e.preventDefault();
    if (handleValidation()) {
      const {  username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password
      });
      // console.log({data})

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user",
          // process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.matchUser)
        );
        navigate("/");
      }
    }
  }

  const handleChange=(e)=>{
    console.log(e.target.name)
    setValues({
      ...values,
      [e.target.name]:e.target.value
    })

  }
  const handleValidation=()=>{
    const {password,username}=values;
    if (password === "") {
      toast.error(
        "Username and Password are required !",
        toastOptions
      );
      return false;
    } 
    else if (username.length ==="") {
      toast.error(
        "Username and Password are required !",
        toastOptions
      );
      return false;
    } 
    
   

    return true;
    
  }
  return (
    <div>
    <FormContainer>
    
    <form onSubmit={handleSubmit}>
    <div className='brand'>
    <img src={Logo} alt='logo'/>
    <h1>snappy</h1>
    </div>
    <input type='text' 
    name='username' 
    placeholder='Username' 
    onChange={handleChange} 
    min="3"/>


    <input type='password' 
    name='password' 
    placeholder='Password' 
    onChange={handleChange} />

    

    <button type='submit' >Login In</button>
    <span>Don't have an account ? <Link to="/register">Register</Link></span>
    </form>
    </FormContainer>
    <ToastContainer/>
      
    </div>
  )
}
const FormContainer = styled.div `height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
export default Login

