import { useEffect, useState, useRef } from "react";

export const useFetch = ({
  link,
  method,
  data,
}: {
  link: string;
  method: string;
  data: object;
}) => {
  type resObj = { msg: any; count: number };

  const [response, setResponse] = useState<resObj>({
    msg: "",
    count: 0,
  });
  const firstRender = useRef(true);
  const error = useRef<boolean>(false);

  const [numOfReq, setNumOfReq] = useState<number>(0);
  const makeReq = () => {
    firstRender.current = false;
    setNumOfReq((prev) => prev + 1);
  };

  const request = async () => {
    if (method.toUpperCase() == "POST") {
      try {
        const res = await fetch(link, {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ data }),
          credentials: "include",
        });
        error.current = false;
        const resData = await res.json();
        setResponse((prev) => ({
          ...prev,
          msg: resData,
          count: prev.count + 1,
        }));
      } catch (err) {
        error.current = true;
        setResponse((prev) => ({
          ...prev,
          msg: "An error occured!",
          count: prev.count + 1,
        }));
        // return error;
      }
    }
  };
  useEffect(() => {
    if (!firstRender.current) {
      request();
    }
  }, [numOfReq]);
  return { error: error.current, response, makeReq };
};
