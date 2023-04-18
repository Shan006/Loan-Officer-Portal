import { createContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState({
    token: null,
    isLogin: false,
  });
  const [socket, setSocket] = useState();
  const [userData, setUserData] = useState();
  const Navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/user_management/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserData(res.data.userDetail);
      })
      .catch((err) => {
        console.log(err.response);
        if (localStorage.getItem("token")) {
          if (err.response.data.message === "jwt expired") {
            Navigate("/signin/unauthorized");
            toast.success(
              "Session Expired Please Join Again Through Refferal Link"
            );
            localStorage.removeItem("token");
          }
        } else {
          null;
        }
      });
  }, [localStorage.getItem("token")]);

  return (
    <AuthContext.Provider
      value={{ session, setSession, userData, socket, setSocket }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
