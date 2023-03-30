import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import User from "../contexts/user";

const PrivateRoute = ({ children, ...others }) => {
  const { signedIn } = useContext(User);

  return signedIn ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/login",
        state: { msg: "Por favor, haz login primero" },
      }}
    />
  );
};

export default PrivateRoute;
