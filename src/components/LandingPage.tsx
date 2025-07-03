import { useNavigate } from "react-router-dom";
import "../CSS/landingPage.css";
import { useFetch } from "./toolbox/fetch";
import { useMessage, loadAnimation } from "./toolbox/MyContext";
import { useRef, useEffect } from "react";

export const LandingPage = () => {
  const navigate = useNavigate();
  const inputData = useRef<HTMLInputElement>(null);
  const { showMsg } = useMessage();

  const { setAnimation, setPlayState } = loadAnimation();

  const { makeReq, error, response } = useFetch({
    link: "https://mimetic-server.onrender.com/email",
    method: "POST",
    data: { email: inputData.current?.value },
  });

  const validate = (email: string) => {
    if (!email) {
      return { bool: false, empty: true };
    }
    if (!email.includes("@") || !email.includes(".com")) {
      return { bool: false, empty: false };
    }
    return { bool: true, empty: false };
  };

  useEffect(() => {
    if (response.msg) {
      setAnimation(false);
      setPlayState(false);
      if (error) {
        showMsg({ msg: response.msg, type: "error", timer: 3000 });
      } else {
        response &&
          showMsg({ msg: response.msg, type: "success", timer: 3000 });
        inputData.current && (inputData.current.value = "");
      }
    }
  }, [response]);

  return (
    <>
      <div id="main">
        <h1>Welcome to MimeticAPI</h1>
        <p>
          Effortlessly create mimetic API route keys in seconds;
          <br /> ideal for automated testing, frontend development, and live
          previews.
        </p>
        <button onClick={() => navigate("/mimeticapp")}>
          Generate Mimetic APIs Now
        </button>
      </div>
      <div id="sub-main">
        <p>Want early access to new features like POST, auth, etc?</p>
        <input type="email" ref={inputData} placeholder="Your Email" />
        <button
          onClick={() => {
            if (inputData.current) {
              const { bool, empty } = validate(inputData.current.value);
              if (bool && !empty) {
                makeReq();
                setAnimation(true);
                setPlayState(true);
              } else if (empty) {
                showMsg({
                  msg: "Please enter your email address!",
                  type: "warning",
                  timer: 3000,
                });
              } else if (!bool && !empty) {
                showMsg({
                  msg: "Invalid email address!",
                  type: "warning",
                  timer: 3000,
                });
              }
            }
          }}
        >
          Notify me
        </button>
      </div>
    </>
  );
};
