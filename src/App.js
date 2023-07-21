import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import ChatPage from "./screens/ChatPage";
import ChatProvider from "./ContextAPI/ChatProvider";
import TaxInvoice from "./components/Invoice";
import TextEditor from "./components/TextEditor";
import PaySlipGenerator from "./components/PaySlipGenerator";
import PriceQuotationGenerator from "./components/PriceQuotationGenerator ";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <ChatProvider>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/chats" element={<ChatPage />} />
              <Route exact path="/invoice" element={<TaxInvoice />} />
              <Route exact path="/text" element={<TextEditor />} />
              <Route exact path="/payment" element={<PaySlipGenerator />} />
              <Route
                exact
                path="/price"
                element={<PriceQuotationGenerator />}
              />
            </Routes>
          </ChatProvider>
        </Router>
      </div>
    </>
  );
}

export default App;
