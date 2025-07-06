import { useState, useRef, useEffect } from "react";

export const usePrint = ({
  element,
  text = "Please provide text!",
  tpl = 100,
  delay = 1000,
  cursorHeight = "30px",
  cursorWidth = "1px",
  cursorColor = "grey",
  showCursor = true,
}: {
  element: HTMLElement | null;
  text: string;
  tpl?: number;
  delay?: number;
  cursorHeight?: string;
  cursorWidth?: string;
  cursorColor?: string;
  showCursor?: boolean;
}) => {
  const blink = useRef<number>(0);
  const printing = useRef<number>(0);
  const typing = useRef<boolean>(false);
  const msg = useRef<string>("");
  const [printNumber, setPrintNumber] = useState<number>(0);

  const start = () => !typing.current && setPrintNumber((prev) => prev + 1);

  useEffect(() => {
    if (element) {
      typing.current = true;
      element.innerText = "";

      const textArr = text.split("");
      let i = 0;

      const cursor = (typing: boolean) => {
        if (typing && element) {
          element.style.borderRightColor = cursorColor;
          return;
        }

        if (element.style.borderRightColor == cursorColor) {
          element.style.borderRightColor = "transparent";
        } else {
          element.style.borderRightColor = cursorColor;
        }
      };

      const print = () => {
        if (i == textArr.length) {
          textArr.length = 0;
          clearInterval(printing.current);
          showCursor && (blink.current = setInterval(cursor, 500));
          typing.current = false;
          return;
        }

        element.textContent += textArr[i];
        i++;
      };

      if (showCursor) {
        element.style.width = "max-content";
        element.style.height = cursorHeight;
        element.style.borderRight = `${cursorWidth} solid ${cursorColor}`;

        clearInterval(blink.current);
        blink.current = setInterval(cursor, 500);

        setTimeout(() => {
          clearInterval(blink.current);
          cursor(true);
          printing.current = setInterval(print, tpl);
        }, delay);
      } else {
        setTimeout(() => {
          printing.current = setInterval(print, tpl);
        }, delay);
      }
    } else {
      msg.current = "Please provide an element!";
    }
  }, [printNumber]);

  return { start };
};
