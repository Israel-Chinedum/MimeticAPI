import "../CSS/mockapp.css";
import { useRef, useState, useEffect } from "react";
import { usePrint } from "./toolbox/print";
import { useFetch } from "./toolbox/fetch";
import { useMessage, loadAnimation } from "./toolbox/MyContext";
import ObjectEditor from "./toolbox/ObjectEditor";

export const MockApp = () => {
  const pTag = useRef<HTMLParagraphElement>(null);
  const endpoint = useRef<string>("");
  const jsonData = useRef<object>({});
  const [editorData, setEditorData] = useState<string>("");
  const [display, setDisplay] = useState<string>("none");

  const { showMsg } = useMessage();
  const { setAnimation, setPlayState } = loadAnimation();

  const { start } = usePrint({
    element: pTag.current,
    cursorColor: "lightblue",
    tpl: 10,
    delay: 500,
    text: endpoint.current,
  });

  const { error, response, makeReq } = useFetch({
    link: "https://mockapi-server.onrender.com/mockapi",
    method: "POST",
    data: jsonData.current,
  });

  const validator = () => {
    if (editorData !== "") {
      try {
        const json = JSON.parse(editorData);
        return { json };
      } catch (error) {
        return { valErr: "Invalid JSON data!" };
      }
    } else {
      return { valErr: "Please input data!" };
    }
  };

  const sendReq = () => {
    const { valErr, json } = validator();
    if (valErr) {
      showMsg({ msg: valErr, type: "warning", timer: 3000 });
    } else {
      jsonData.current = json;
      makeReq();
      setAnimation(true);
      setPlayState(true);
    }
  };

  useEffect(() => {
    if (response.msg) {
      setAnimation(false);
      setPlayState(false);
      if (!error) {
        endpoint.current = response.msg["endpoint"];
        setDisplay("block");
        start();
      } else {
        showMsg({ msg: response.msg, type: "error", timer: 3000 });
      }
    }
  }, [response]);

  return (
    <>
      <div id="mockapi-space">
        <div id="code-area">
          <ObjectEditor
            value={editorData}
            onChange={(value) => setEditorData(value as string)}
          />
          <button
            id="gen-btn"
            onClick={() => {
              sendReq();
            }}
          >
            Generate api link
          </button>
        </div>
        <div id="endpoint-area">
          <p ref={pTag}>Your link will appear here!</p>
          <button
            onClick={() => {
              pTag.current?.innerText &&
                navigator.clipboard
                  .writeText(pTag.current?.innerText)
                  .then(() =>
                    showMsg({ msg: "Copied", type: "success", timer: 3000 })
                  )
                  .catch((err) => {
                    showMsg({ msg: "Copied", type: "warning", timer: 3000 });
                    console.log("Error: ", err);
                  });
            }}
            id="copy-btn"
            style={{ display: `${display}` }}
          >
            Copy
          </button>
          <p
            style={{
              color: "grey",
              marginTop: "50px",
              border: "none",
              textAlign: "start",
            }}
          >
            Note each link you generate will be active
            <br /> for 24 hours and after that, will be deactivated!
          </p>
        </div>
      </div>
    </>
  );
};
