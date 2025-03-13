import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { allUserRoute, host } from '../utils/APIRoutes';
import axios from 'axios';
import Contact from '../components/Contact';
import Welcome from '../components/Welcome';
import ChatContent from '../components/ChatContent';
import { io } from 'socket.io-client';
import loader from '../asstes/loader.gif'
export default function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
      }
    }
    getData();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id);
    }
    // Cleanup function
    return () => {
      socket.current?.disconnect();
    };
  }, [currentUser]);

  useEffect(() => {
    async function fetchContacts() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            const { data } = await axios.get(`${allUserRoute}/${currentUser._id}`);
            setContacts(data);
            setLoading(false); // Set loading to false when contacts are fetched
          } catch (error) {
            console.error("Error fetching contacts", error);
          }
        } else {
          navigate("/setAvatar");
        }
      }
    }

    fetchContacts();
  }, [currentUser, navigate]); // Run whenever currentUser changes

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        {loading ? (
          <div className="loader">
            <img src={loader} alt="Loading..." />
          </div>
        ) : (
          <>
            <Contact
              contacts={contacts}
              currentUser={currentUser}
              changeChat={handleChatChange}
            />
            {currentChat === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : (
              <ChatContent
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
              />
            )}
          </>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }

  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
`;
