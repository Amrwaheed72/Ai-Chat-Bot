import { createContext, useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ChatAppContext = createContext();
const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;

function ChatAppProvider({ children }) {
  const [chats, setChats] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const [showChatList, setShowChatList] = useState(false);

  function handleVisibilty() {
    setShowChatList((prev) => !prev);
  }

  // 🚀 Load chats from localStorage when component mounts
  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem("chats")) || [];
    setChats(storedChats);
    if (storedChats.length > 0) {
      setActiveChat(storedChats[0].id);
      setMessages(storedChats[0].messages);
    }
  }, []);

  // 🚀 Update messages when active chat changes
  useEffect(() => {
    const activeChatObj = chats.find((chat) => chat.id === activeChat);
    setMessages(activeChatObj ? activeChatObj.messages : []);
  }, [activeChat, chats]);

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
      updateChatMessages(activeChat, updatedMessages);

      setInputValue("");
      setIsTyping(true);

      try {
        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
              model: "mistralai/mistral-saba-latest",
              messages: [{ role: "user", content: inputValue }],
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `OpenAI API error: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("API Response:", data);

        const chatResponse = data.choices[0].message.content.trim();
        const newResponse = {
          type: "response",
          text: chatResponse,
          timestamp: new Date().toLocaleTimeString(),
        };

        const updatedMessagesWithResponse = [...updatedMessages, newResponse];
        setMessages(updatedMessagesWithResponse);
        updateChatMessages(activeChat, updatedMessagesWithResponse);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setIsTyping(false);
      }
    }
  }

  function createNewChat(initialMessage = "") {
    const newChat = {
      id: uuidv4(),
      displayId: `Chat ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      messages: initialMessage
        ? [
            {
              type: "prompt",
              text: initialMessage,
              timestamp: new Date().toLocaleTimeString(),
            },
          ]
        : [],
    };

    const updatedChats = [newChat, ...chats];
    setChats(updatedChats);
    setActiveChat(newChat.id);
    setMessages(newChat.messages);

    localStorage.setItem("chats", JSON.stringify(updatedChats));
  }

  function updateChatMessages(chatId, updatedMessages) {
    const updatedChats = chats.map((chat) =>
      chat.id === chatId ? { ...chat, messages: updatedMessages } : chat
    );

    setChats(updatedChats);
    localStorage.setItem("chats", JSON.stringify(updatedChats));
  }

  function handleSelectChat(id) {
    setActiveChat(id);
  }

  function handleDeleteChat(id) {
    const updatedChats = chats.filter((chat) => chat.id !== id);
    setChats(updatedChats);
    localStorage.setItem("chats", JSON.stringify(updatedChats));

    if (id === activeChat) {
      const newActiveChat = updatedChats.length > 0 ? updatedChats[0].id : null;
      setActiveChat(newActiveChat);
      setMessages(newActiveChat ? updatedChats[0].messages : []);
    }
  }

  useEffect(() => {
    if (chatEndRef.current) {
      setTimeout(() => {
        chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 100);
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
        showEmojiPicker,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
}

function useChatApp() {
  const context = useContext(ChatAppContext);
  if (!context)
    throw new Error("ChatApp context must be used within ChatAppProvider");
  return context;
}

export { ChatAppProvider, useChatApp };
