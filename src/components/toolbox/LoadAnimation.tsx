import "../../CSS/loadAnimation.css";
import { loadAnimation } from "./MyContext";
export const LoadAnimation = () => {
  const { displayAnimation, playState } = loadAnimation();

  return (
    <div
      id="load-animation-container"
      style={{ display: !displayAnimation ? "none" : "flex" }}
    >
      <div
        id="spinner"
        style={{ animationPlayState: !playState ? "paused" : "running" }}
      ></div>
    </div>
  );
};
