import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import { Register } from "./pages/Register/Register";
import { NewNote } from "./pages/notes/NewNote";
import { EditNote } from "./pages/notes/EditNote";
import { Login } from "./pages/Login/Login";
import "./app.css";
import { Footer } from "./components/Footer/footer";
import { useState } from "react";
import PrivateRoute from "./PrivateRoute/PrivateRoute ";
import User from "./contexts/user";
import { Admin } from "./pages/Admin";
import { LogOut } from "./pages/Logout/LogOut";
import { ListNotes } from "./pages/notes/ListNotes";
import { ShowNote } from "./pages/notes/ShowNote";
// Componente principal de la aplicación.
const App = () => {
  const [signedIn, setSignedIn] = useState(false);
  console.log("signedIn" + signedIn);

  const logoutfunc = () => {
    localStorage.clear();
    setSignedIn(false);
  };

  return (
    <>
      <User.Provider value={{ signedIn, updateUser: setSignedIn }}>
        <Router>
          <nav className="secondary">
            {!signedIn && <Link to="/">Inicio</Link>}
            {!signedIn && <Link to="/login">Iniciar sesión</Link>}
            {signedIn && <Link to="/private">Panel de administración</Link>}
            {signedIn && <Link to="/addNotes">Añadir Nueva Nota</Link>}
            {signedIn && <Link to="/listNotes">Lista de Notas</Link>}
            {signedIn && <button onClick={logoutfunc}>Cerror Sesión</button>}
          </nav>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              path="/addNotes"
              element={
                <PrivateRoute>
                  <NewNote />
                </PrivateRoute>
              }
            />
            <Route
              path="/notes/:id"
              element={
                <PrivateRoute>
                  <ShowNote />
                </PrivateRoute>
              }
            />
            <Route
              path="/notes/:id/edit"
              element={
                <PrivateRoute>
                  <EditNote />
                </PrivateRoute>
              }
            />
            <Route
              path="/listNotes"
              exact
              element={
                <PrivateRoute>
                  <ListNotes />
                </PrivateRoute>
              }
            />
            <Route
              path="/private"
              exact
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/logout"
              element={
                <PrivateRoute>
                  <LogOut />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </User.Provider>

      <Footer />
    </>
  );
};

export default App;
