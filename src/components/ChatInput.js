import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

const ChatInput = ({handleSendMsg}) => {
const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick=(emojiObject)=>{
    console.log(emojiObject.emoji);
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  }

  const sendChat=(e)=>{
    e.preventDefault();
    handleSendMsg(msg);
    setMsg("");
  }
  return (
    <Container style={{position:"fixed"}} >
    <div className="button-container">
    <div className="emoji">
    <BsEmojiSmileFill onClick={handleEmojiPickerhideShow}/>
    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}
    style={{
        position: "absolute",
        top: "-460px",
        
        
      }}
    
    />}
    </div>
    </div>
    <form className="input-container" style={{height: "2.7rem"}} onSubmit={sendChat}>
    <input type="text" placeholder="type your message here" 
     onChange={(e) => setMsg(e.target.value)}
    value={msg}
    
    />
    <button type="submit"><IoMdSend/></button>
    
    </form>
    
    </Container>
  )
}

export default ChatInput
const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  margin-top:32.5rem;
  
  
 
 
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 0.5rem;
    
    .emoji {
        position: relative;
        svg {
          font-size: 2.5rem;
          color: #ffff00c8;
          cursor: pointer;
          padding-left:0.5rem;
        }
       
     
          
        }
      }
    
   
  
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
   
    background-color: #ffffff34;
   
    input {
      width: 45.5rem;
      
      background-color: transparent;
    
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      @media screen and (min-width: 320px) and (max-width: 1080px) {
       font-size:1rem;
        width:19rem;
       
        
      }

      &::selection {
        background-color:#76a8f5;
      }
      &:focus {
        outline: none;
      }
      
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 12rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #596FB7;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
          
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
  
`;
