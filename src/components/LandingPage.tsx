import { useNavigate } from "react-router-dom";
import "../CSS/landingPage.css";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div id="main">
        <h1>Welcome to MockAPI</h1>
        <p>
          Your instant fake API generator! Spin up fake endpoints in seconds
        </p>
        <button onClick={() => navigate("/mockapi")}>Start Mocking Now</button>
      </div>
      <div id="sub-main">
        <p>Want early access to new features like POST, auth, etc?</p>
        <input type="email" placeholder="Your Email" />
        <button>Notify me</button>
      </div>
    </>
  );
};
