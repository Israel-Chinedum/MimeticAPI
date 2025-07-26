import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MessageContext, LoadAnimationContext } from "./toolbox/MyContext";
import { LandingPage } from "./LandingPage";
import { MimeticApp } from "./MimeticApp";
import { useDisplayMsg } from "./toolbox/displayMessage";
import { LoadAnimation } from "./toolbox/LoadAnimation";
import Logo from '../../public/mockapi.svg'
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
          <div id="container" style={{ overflow: playState ? "hidden" : "" }}>
            <LoadAnimation />
            <div style={{
              display: "flex",
              alignItems: "center",
              height: "100vh",
              position: "absolute",
              opacity: "0.3",
            }}>
              <img
                src={Logo}
                style={{
                  height: "95%"
                }}
                alt=""
              />
            </div>
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
                  zIndex: "10",
                  position: "fixed",
                  top: "2vh",
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
