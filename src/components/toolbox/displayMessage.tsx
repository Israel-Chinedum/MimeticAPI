import { useState, useRef } from "react";

export const useDisplayMsg = () => {
  type messageType = "warning" | "success" | "error";

  const [revealMsg, setRevealMsg] = useState<boolean>(false);
  const msgType = useRef<messageType>("success");
  const message = useRef<string>("");
  const showMsg = ({
    msg,
    type,
    timer,
  }: {
    msg: string;
    type: messageType;
    timer: number;
  }) => {
    message.current = msg;
    msgType.current = type;
    setRevealMsg(true);
    setTimeout(() => {
      setRevealMsg(false);
    }, timer);
  };
  return {
    revealMsg,
    message: message.current,
    msgType: msgType.current,
    showMsg,
  };
};
