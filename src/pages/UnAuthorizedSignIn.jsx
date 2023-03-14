import React, { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import Signin from "./Signin";

const UnAuthorizedSignIn = () => {
  const myRef = useRef(false);

  useEffect(() => {
    if (myRef.current) return;
    myRef.current = true;
    toast.success("Session Expired Please Join Again Through Refferal link");
  }, []);
  return (
    <>
      <Signin />
    </>
  );
};

export default UnAuthorizedSignIn;
