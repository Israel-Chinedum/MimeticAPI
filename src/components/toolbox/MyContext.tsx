import { createContext, useContext } from "react";

export const MessageContext = createContext<{
  message: string;
  revealMsg?: boolean;
  showMsg: ({
    msg,
    timer,
  }: {
    msg: string;
    type: "warning" | "success" | "error";
    timer: number;
  }) => void;
} | null>(null);

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
// displayAnimation, setAnimation, playState, setPlayState
export const LoadAnimationContext = createContext<{
  displayAnimation: boolean;
  playState: boolean;
  setAnimation: React.Dispatch<React.SetStateAction<boolean>>;
  setPlayState: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const loadAnimation = () => {
  const context = useContext(LoadAnimationContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
