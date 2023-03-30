import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import User from "../../contexts/user";
import useApi from "../../hooks/useApi";
import "./login.css";
export const Login = () => {
  // Obtenemos el mensaje del a ruta si lo hubiera
  const { state } = useLocation();
  // Obtenemos el contexto del usuario
  const user = useContext(User);
  // Comprobamos si hay que mostrar el mensaje
  const displayAlert = state && state.msg != null && !user.signedIn;

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const loginRequest = useApi("/api/login", "", {}, false);

  const onSubmit = (e) => {
    e.preventDefault();

    loginRequest.updateParams({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    loginRequest.perform();

    user.updateUser(true);
    // fetch("/api/login", {
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
    //   // Obtenemos la respuesta
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     if (json.error != null) {
    //       setError(json.error);
    //     } else {
    //       setToken(json?.token);
    //       setUserLogin({
    //         id: json?.id,
    //         username: json?.username,
    //         token: json?.token,
    //         error: json?.error,
    //       });
    //       setError("");
    //     }
    //   })
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
      <h1>Login</h1>

      {loginRequest.error && <p className="red">{loginRequest.error}</p>}

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
      {loginRequest.data && loginRequest.data.username ? (
        <>
          <p className="succes">Usuario existente en nuestra bd!!</p>
          <pre>{JSON.stringify(loginRequest.data)}</pre>
        </>
      ) : (
        ""
      )}
      {loginRequest?.data?.token ? (
        <>
          <p className="succes">Hay token lo guardamos en local storge!!</p>
          <pre>{localStorage.setItem("token", loginRequest?.data?.token)}</pre>
          <pre>{localStorage.setItem("userId", loginRequest?.data?.id)}</pre>
        </>
      ) : (
        ""
      )}

      {displayAlert && (
        <div className="login-alert" role="alert">
          {state.msg}
        </div>
      )}
      {user.signedIn ? (
        <p>Ya puedes acceder la panel de administración 👆</p>
      ) : (
        ""
      )}
      <Link to={"/register"}>Registrate</Link>
    </>
  );
};
