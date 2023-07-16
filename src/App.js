import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import Home from "./screens/Home";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
