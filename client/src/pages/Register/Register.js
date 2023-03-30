import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import "./register.css";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerRequest = useApi("/api/register", "", {}, false);

  const onSubmit = (e) => {
    e.preventDefault();

    registerRequest.updateParams({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    });

    registerRequest.perform();

    // fetch("/api/register", {
    //   // Cambiamos el método a POST
    //   method: "POST",
    //   // Obtenemos el cuerpo del mensaje. Hacemos uso de JSON.stringify
    //   // Para obtener una cadena a partir del objeto
    //   body: JSON.stringify({ username: username, password: password }),
    //   // Modificamos la cabecera
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   // Obtenemos la respuesta
    //   .then((res) => res.json())
    //   .then((json) =>
    //     setUser({
    //       id: json?.id,
    //       username: json?.username,
    //       token: json?.token,
    //       error: json?.error,
    //     })
    //   )
    //   .catch((err) => console.error(err));
  };

  const onChangeUsername = (e) => {
    const { value } = e.target;
    setUsername(value);
  };

  const onChangePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  return (
    <>
      <h1>Register</h1>
      {registerRequest && registerRequest.error ? (
        <p className="red">{registerRequest?.error}</p>
      ) : (
        ""
      )}
      <form onSubmit={onSubmit}>
        <label>Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={onChangeUsername}
          placeholder="Username"
        />
        <label>Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="Password"
        />
        <button>Enviar</button>
      </form>
      {registerRequest.data && registerRequest.data?.id ? (
        <>
          <p className="succes">Usuario Insertado con exito!!</p>
          <pre>{JSON.stringify(registerRequest?.data)}</pre>
        </>
      ) : (
        ""
      )}
    </>
  );
};
