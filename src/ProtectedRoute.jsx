import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  return localStorage.getItem("token") ? (
    <Component />
  ) : (
    <Navigate to="/signin/unauthorized" />
  );
};

export default ProtectedRoute;
