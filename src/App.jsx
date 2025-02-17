import styled from "styled-components";
import ChatBotStart from "./features/chatbotstart/ChatBotStart";
import GlobalStyles from "./styles/GlobalStyles";
import { DarkModeProvider } from "./context/DarkModeContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import ChatBotApp from "./features/chatbotapp/ChatBotApp";
import { ChatAppProvider } from "./context/ChatAppProvider";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: var(--color-neutral-800);
`;
function App() {
  return (
    <ChatAppProvider>
      <DarkModeProvider>
        <Container>
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ChatBotStart />} />
              <Route path="main" element={<ChatBotApp />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </DarkModeProvider>
    </ChatAppProvider>
  );
}

export default App;
