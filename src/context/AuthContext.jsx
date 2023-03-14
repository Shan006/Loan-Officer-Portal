import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState({
    token: null,
    isLogin: false,
  });
  const [userData, setUserData] = useState();
  const Navigate = useNavigate();

  useEffect(() => {
    if (session.token !== null) {
      localStorage.setItem("token", session.token);
    }
  }, [session]);

  useEffect(() => {
    session.isLogin
      ? axios
          .get(
            `${import.meta.env.VITE_REACT_APP_SERVER_URL}/user_management/me`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            setUserData(res.data.userDetail);
          })
          .catch((err) => {
            Navigate("/signin/unauthorized");
            toast.error(
              "Session Expired Please Join Again Through Refferal Link"
            );
            console.log(err);
          })
      : null;
  }, [session]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setSession({
        token: token,
        isLogin: true,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ session, setSession, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
