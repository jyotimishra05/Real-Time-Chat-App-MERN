import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

const Contacts=({ contacts, currentUser,changeChat})=>{
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  
  useEffect(() => {
  if(currentUser){
    setCurrentUserName(currentUser.username);
    setCurrentUserImage(currentUser.avatarImage);
  }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact)
  };

  
  return (
    <div>
    {currentUserImage && currentUserImage && (
      <Container>
        <div className="brand">
          
          
        
        <div className="current-user" style={{backgroundColor:"rgb(41, 6, 145)",width: "95%"}}>
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentUserImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h3>{currentUserName}</h3>
          </div>
        </div>
        </div>
        <div className="contacts">
          {contacts.map((contact, index) => {
            return (
              <div
                key={contact._id}
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt=""
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            );
          })}
        </div>
        
      </Container>
    )}
    </div>
  );
}


const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  height:40rem;  
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 4rem;
      padding-top:1rem;
      padding-bottom:0.8rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
      padding-top:1rem;
      
    }
    
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 1rem;
    
    margin-top:1.5rem;
    
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #f2f8fa;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 95%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 2rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #596FB7;
    }
  }

  .current-user {
    
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding:4px
  
   
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white];
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts;