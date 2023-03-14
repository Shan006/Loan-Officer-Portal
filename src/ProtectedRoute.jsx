import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const ProtectedRoute = ({ Component }) => {
  const { session } = useContext(AuthContext);
  return session.isLogin ? (
    <Component />
  ) : (
    <Navigate to="/signin/unauthorized" />
  );
};

export default ProtectedRoute;
