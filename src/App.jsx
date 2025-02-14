import styled from "styled-components";
import ChatBotStart from "./Components/ChatBotStart";
import GlobalStyles from "./styles/GlobalStyles";
import { DarkModeProvider } from "./context/DarkModeContext";
import { BrowserRouter, Navigate, replace, Route, Routes } from "react-router";
import ChatBotApp from "./Components/ChatBotApp";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: var(--color-grey-50);
`;
function App() {
  return (
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
  );
}

export default App;
