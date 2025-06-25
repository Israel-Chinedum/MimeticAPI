import "../CSS/mockapp.css";
import { print } from "./toolbox/print";
import { useRef } from "react";

export const MockApp = () => {
  const pTag = useRef<HTMLParagraphElement>(null);

  return (
    <>
      <div id="mockapi-space">
        <div id="code-area">
          <textarea
            name="text-area"
            id="text-area"
            placeholder='{message: "Enter your data"}'
          ></textarea>
          <button
            id="gen-btn"
            onClick={() => {
              print({
                element: pTag.current,
                text: "https://localhost:5000/mockapi",
              });
            }}
          >
            Generate api link
          </button>
        </div>
        <div id="endpoint-area">
          <p ref={pTag}></p>
          <button id="copy-btn">Copy</button>
        </div>
      </div>
    </>
  );
};
