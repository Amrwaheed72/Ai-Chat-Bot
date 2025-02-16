import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { v4 as uuidv4 } from "uuid";

const StyledChatApp = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;

function ChatBotApp() {
  const [chats, setChats] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState(chats[0]?.messages || []);
  const [activeChat, setActiveChat] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  function handleInputChanges(e) {
    setInputValue(e.target.value);
  }
  async function sendMessage() {
    if (inputValue.trim() === "") return;
    const newMessage = {
      type: "prompt",
      text: inputValue,
      timestamp: new Date().toLocaleTimeString(),
    };
    if (!activeChat) {
      createNewChat(inputValue);
    } else {
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setInputValue("");
      const updatedChats = chats.map((chat) => {
        if (chat.id === activeChat) {
          return { ...chat, messages: updatedMessages };
        }
        return chat;
      });
      setChats(updatedChats);
      setIsTyping(true);
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-r1:free",
            messages: [
              {
                role: "user",
                content: inputValue,
              },
            ],
          }),
        }
      );
      //  fetch(
      //   "https://api.openai.com/v1/chat/completions",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${API_KEY}`,
      //     },
      //     body: JSON.stringify({
      //       model: "gpt-3.5-turbo",
      //       messages: [
      //         {
      //           role: "user",
      //           content: inputValue,
      //         },
      //       ],
      //     }),
      //   }
      // );
      if (!response.ok) {
        throw new Error(
          `OpenAI API error: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      const chatResponse = data.choices[0].message.content.trim();
      const newResponse = {
        type: "response",
        text: chatResponse,
        timestamp: new Date().toLocaleTimeString(),
      };
      const updatedMessagesWithResponse = [...updatedMessages, newResponse];
      setMessages(updatedMessagesWithResponse);
      setIsTyping(false);
      const updatedChatsWithResponse = chats.map((chat) => {
        if (chat.id === activeChat) {
          return {
            ...chat,
            messages: updatedMessagesWithResponse,
          };
        }
        return chat;
      });
      setChats(updatedChatsWithResponse);
      console.log(newResponse);
    }
  }
  function creatingNewChat() {
    if (chats.length === 0) {
      createNewChat();
    }
  }
  function createNewChat(initialMessage = "") {
    const newChat = {
      id: uuidv4(),
      displayId: `Chat ${new Date().toLocaleDateString(
        "en-GB"
      )} ${new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })}`,

      messages: initialMessage
        ? [
            {
              type: "prompt",
              text: initialMessage,
              timestamp: new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              }),
            },
          ]
        : [],
    };
    const updatedChats = [newChat, ...chats];
    setChats(updatedChats);
    setActiveChat(newChat.id);
  }
  creatingNewChat();
  // console.log(chats);

  useEffect(() => {
    const activeChatObj = chats.find((chat) => chat.id === activeChat);
    setMessages(activeChatObj ? activeChatObj.messages : []);
  }, [activeChat, chats]);

  function handleSelectChat(id) {
    setActiveChat(id);
  }

  function handleDeleteChat(id) {
    const updatedChat = chats.filter((chat) => chat.id !== id);
    setChats(updatedChat);
    if (id === activeChat) {
      const newActiveChat = updatedChat.length > 0 ? updatedChat[0].id : null;
      setActiveChat(newActiveChat);
    }
  }
  useEffect(() => {
    if (chatEndRef.current) {
      setTimeout(() => {
        chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 100); // Small delay ensures DOM updates before scrolling
    }
  }, [messages]);

  return (
    <StyledChatApp>
      <ChatList
        chats={chats}
        createNewChat={createNewChat}
        activeChat={activeChat}
        handleSelectChat={handleSelectChat}
        handleDeleteChat={handleDeleteChat}
      />
      <ChatWindow
        setInputValue={setInputValue}
        isTyping={isTyping}
        sendMessage={sendMessage}
        messages={messages}
        handleInputChanges={handleInputChanges}
        inputValue={inputValue}
        chatEndRef={chatEndRef}
      />
    </StyledChatApp>
  );
}

export default ChatBotApp;
