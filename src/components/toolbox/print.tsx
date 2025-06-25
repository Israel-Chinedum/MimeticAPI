import { useState, useEffect } from "react";

export const print = ({
  element,
  text = "Please provide text!",
  tpl = 100,
  delay = 1000,
  cursorHeight = "30px",
  cursorWidth = "1px",
}: {
  element: HTMLElement | null;
  text: string;
  tpl?: number;
  delay?: number;
  cursorHeight?: string;
  cursorWidth?: string;
}) => {
  return new Promise<void>((resolve, reject) => {
    if (element) {
      element.innerText = "";

      const textArr = text.split("");
      let i = 0;
      console.log(textArr);

      element.style.width = "max-content";
      element.style.height = cursorHeight;
      element.style.borderRight = `${cursorWidth} solid grey`;

      const cursor = (typing: boolean) => {
        if (typing && element) {
          element.style.borderColor = "grey";
          return;
        }

        if (element.style.borderColor == "grey") {
          element.style.borderRightColor = "transparent";
        } else {
          element.style.borderRightColor = "grey";
        }
      };

      let blink = setInterval(cursor, 500);

      setTimeout(() => {
        clearInterval(blink);
        cursor(true);
        const print = setInterval(() => {
          if (i == textArr.length) {
            clearInterval(print);
            blink = setInterval(cursor, 500);
            return resolve();
          }
          element.textContent += textArr[i];
          i++;
        }, tpl);
      }, delay);
    } else {
      return reject("Please provide an element!");
    }
  });
};
