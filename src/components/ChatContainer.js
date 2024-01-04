import React, { useEffect, useState,useRef }  from 'react'
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import axios from 'axios';
import { recieveMessageRoute, sendMessageRoute} from '../utils/APIroutes';

const ChatContainer = ({currentChat,currentUser,socket }) => {
   
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [messages,setMessages]=useState([])
    console.log("c",currentChat)
    console.log("m",currentUser)
  
    // useEffect(()=>{
    //     (async()=>{
    //         const data = await JSON.parse(
    //             localStorage.getItem("chat-app-user")
    //           )
    //         const response = await axios.post(recieveMessageRoute,{
    //             from:data._id,
    //             to:currentChat._id,

    //         });
            
    //         setMessages(response.data);
    //     })();
    // },[])
    // console.log("messages",messages)
    // const handleSendMsg=async(msg)=>{
    //    const data= await axios.post(sendMessageRoute,{
    //         from:currentUser._id,
    //         to:currentChat._id,
    //         message:msg

    //     });
    //     socket.current.emit("send-msg",{
    //         to:currentChat._id,
    //         from:currentUser._id,
    //         message:msg
    //     })
        
        
        
    // }

    useEffect(()=>{
        (async () => {
        const data = await JSON.parse(
          localStorage.getItem("chat-app-user")
        );
        const response = await axios.post(recieveMessageRoute, {
          from: data._id,
          to: currentChat._id,
        });
        setMessages(response.data);
    })()
      }, [currentChat]);
    
      useEffect(() => {
        const getCurrentChat = async () => {
          if (currentChat) {
            await JSON.parse(
              localStorage.getItem("chat-app-user")
            )._id;
          }
        };
        getCurrentChat();
      }, [currentChat]);
    
      const handleSendMsg = async (msg) => {
        const data = await JSON.parse(
          localStorage.getItem("chat-app-user")
        );
        socket.current.emit("send-msg", {
          to: currentChat._id,
          from: data._id,
          msg,
        });
        await axios.post(sendMessageRoute, {
          from: data._id,
          to: currentChat._id,
          message: msg,
        });
    
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
      };
    
      useEffect(() => {
        if (socket.current) {
          socket.current.on("msg-recieve", (msg) => {
            setArrivalMessage({ fromSelf: false, message: msg });
          });
        }
      }, []);
    
      useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage]);
    
      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);




  return (
    <div>
    {currentChat && (
    <Container >
    <div className='chat-header'>
    <div className='user-details'>
    <div className='avatar'>
    <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
    alt="avatar" />
    </div>
    <div className='username'>
    <h3>{currentChat.username}</h3>
    </div>
    </div>
    <Logout/>
    </div>
    <div className='chat-messages'  >
    {messages.map((message) => {
        return (
          <div >
            <div
              className={`message ${
                message.fromSelf ? "sended" : "recieved"
              }`}
            >
              <div className="content ">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        );
      })}
    
    </div>
    <ChatInput handleSendMsg={handleSendMsg}/> 
    </Container>
    )}</div>
  )
}

export default ChatContainer;
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    background-color: #596FB7;
   
    overflow: hidden;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      .avatar {
        img {
          height: 2.5rem;
          
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
   margin-top:1.8rem;
   height:25rem;
   
   
  

  
    &::-webkit-scrollbar {
      width: 0.2rem;
      
      
      &-thumb {
        background-color: #f2f8fa;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content:flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
        
      }
    }
  }
`;
