import React, { useEffect, useState } from "react";
import Status from "../status/Status";

export const Footer = () => {
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargamos el estado del servidor
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setStatus(data.status === "ok"))
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <footer>
        <main>
          <p>
            Estado del servidor:
            {loading ? " Cargando..." : <Status status={status} />}
          </p>
        </main>
      </footer>
    </>
  );
};
