import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { generalConfig } from "@util/generalConfig";

const GoogleAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("googleToken");
    const savedUser = localStorage.getItem("googleUser");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSuccess = (response) => {
    const userToken = response.credential; // El token JWT devuelto por Google
    setToken(userToken);

    // Decodificar el token para obtener la información del usuario
    const userInfo = JSON.parse(atob(userToken.split(".")[1]));
    setUser(userInfo);

    // Guardar la sesión en localStorage
    localStorage.setItem("googleToken", userToken);
    localStorage.setItem("googleUser", JSON.stringify(userInfo));
  };

  const handleError = () => {
    console.error("Error al iniciar sesión con Google");
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);

    // Eliminar la sesión de localStorage
    localStorage.removeItem("googleToken");
    localStorage.removeItem("googleUser");

    console.log("Sesión cerrada");
  };

  return (
    <GoogleOAuthProvider clientId={generalConfig.GoogleAuth.clientId}>
      <div style={{ textAlign: "center", margin: "20px" }}>
        <h1>Iniciar sesión con Google</h1>
        {!user ? (
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        ) : (
          <div>
            <h2>Bienvenido, {user.name}!</h2>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
