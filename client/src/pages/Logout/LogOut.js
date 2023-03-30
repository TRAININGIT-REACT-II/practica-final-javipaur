import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import User from "../../contexts/user";

export const LogOut = () => {
  const user = useState(User);
  //destruimos lo alamcenado en el localStorge y  redirigimos al login
  localStorage.clear(); //for localStorage
  sessionStorage.clear(); //for sessionStorage

  const handleLogin = () => {
    setIsLogged(true);
  };
  return (
    <>
      {" "}
      <p>Sesion Cerrada!!</p>
      <Navigate
        to={{
          pathname: "/login",
          state: { msg: "Por favor, haz login primero" },
        }}
      />
    </>
  );
};
