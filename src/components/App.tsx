import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MessageContext, LoadAnimationContext } from "./toolbox/MyContext";
import { LandingPage } from "./LandingPage";
import { MimeticApp } from "./MimeticApp";
import { useDisplayMsg } from "./toolbox/displayMessage";
import { LoadAnimation } from "./toolbox/LoadAnimation";
import { useState } from "react";
import "../CSS/App.css";

function App() {
  const { message, revealMsg, msgType, showMsg } = useDisplayMsg();
  const [displayAnimation, setAnimation] = useState<boolean>(false);
  const [playState, setPlayState] = useState<boolean>(false);

  return (
    <Router>
      <LoadAnimationContext.Provider
        value={{ displayAnimation, setAnimation, playState, setPlayState }}
      >
        <MessageContext.Provider value={{ message, showMsg }}>
          <div id="container">
            <LoadAnimation />
            <img
              src="/mockapi.svg"
              width="700vw"
              style={{
                position: "absolute",
                opacity: "0.3",
              }}
              alt=""
            />
            <div
              style={{
                position: "absolute",
                width: "500px",
                height: "500px",
                borderLeft: "10px dotted lightblue",
                borderRadius: "50%",
                opacity: "0.2",
                transform: "rotate(90deg)",
                animation: "spin 20s infinite",
              }}
            ></div>
            {revealMsg && (
              <p
                id="msg"
                style={{
                  backgroundColor:
                    msgType === "warning"
                      ? "orange"
                      : msgType === "error"
                      ? "red"
                      : "rgb(135, 186, 202)",
                  color: msgType === "error" ? "white" : "rgb(37, 37, 37)",
                }}
              >
                {message}
              </p>
            )}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/mimeticapp" element={<MimeticApp />} />
            </Routes>
          </div>
        </MessageContext.Provider>
      </LoadAnimationContext.Provider>
    </Router>
  );
}

export default App;
