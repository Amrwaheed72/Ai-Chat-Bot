import { createContext, useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ChatAppContext = createContext();
const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
function ChatAppProvider({ children }) {
  const [chats, setChats] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState(chats[0]?.messages || []);
  const [activeChat, setActiveChat] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const [showChatList, setShowChatList] = useState(false);

  function handleVisibilty() {
    setShowChatList((showChatList) => !showChatList);
  }
  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem("chats")) || [];
    setChats(storedChats);
    if (storedChats.length > 0) {
      setActiveChat(storedChats[0].id);
      setMessages(storedChats[0].messages); // Directly use messages from chats
    }
  }, []);

  useEffect(() => {
    const activeChatObj = chats.find((chat) => chat.id === activeChat);
    setMessages(activeChatObj ? activeChatObj.messages : []);
  }, [activeChat, chats]);

  useEffect(() => {
    if (activeChat) {
      const storedMessages = JSON.parse(localStorage.getItem(activeChat)) || [];
      setMessages(storedMessages);
    }
  }, [activeChat]);

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
      localStorage.setItem(activeChat, JSON.stringify(updatedMessages));
      setInputValue("");
      const updatedChats = chats.map((chat) =>
        chat.id === activeChat ? { ...chat, messages: updatedMessages } : chat
      );
      setChats(updatedChats);
      localStorage.setItem("chats", JSON.stringify(updatedChats));
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
      localStorage.setItem(
        activeChat,
        JSON.stringify(updatedMessagesWithResponse)
      );
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
      localStorage.setItem("chats", JSON.stringify(updatedChatsWithResponse));
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
    localStorage.setItem("chats", JSON.stringify(updatedChats));
    // localStorage.getItem(newChat.id, JSON.stringify(newChat.messages));
    setActiveChat(newChat.id);
  }
  creatingNewChat();
  // console.log(chats);

  function handleSelectChat(id) {
    setActiveChat(id);
  }

  function handleDeleteChat(id) {
    const updatedChat = chats.filter((chat) => chat.id !== id);
    setChats(updatedChat);
    localStorage.setItem("chats", JSON.stringify(updatedChat));
    localStorage.removeItem(id);
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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  function handleEmojiSelect(emoji) {
    setInputValue((prevInput) => prevInput + emoji.native);
  }
  return (
    <ChatAppContext.Provider
      value={{
        handleVisibilty,
        showChatList,
        chats,
        createNewChat,
        activeChat,
        handleSelectChat,
        handleDeleteChat,
        setInputValue,
        isTyping,
        sendMessage,
        messages,
        handleInputChanges,
        inputValue,
        chatEndRef,
        handleEmojiSelect,
        setShowEmojiPicker,
        showEmojiPicker
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
}
function useChatApp() {
  const context = useContext(ChatAppContext);
  if (context === undefined)
    throw new Error("DarkMode context was used outside DarkModeProvider");
  return context;
}

export { ChatAppProvider, useChatApp };
