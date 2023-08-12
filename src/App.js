import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import ChatPage from "./screens/ChatPage";
import ChatProvider from "./ContextAPI/ChatProvider";
import TextEditor from "./components/TextEditor";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <ChatProvider>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/chats" element={<ChatPage />} />
              <Route exact path="/text" element={<TextEditor />} />
            </Routes>
          </ChatProvider>
        </Router>
      </div>
    </>
  );
}

export default App;
