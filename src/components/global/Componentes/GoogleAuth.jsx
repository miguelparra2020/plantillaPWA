import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GoogleAuth = () => {
    const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const handleSuccess = (response) => {
    const userToken = response.credential; // El token JWT devuelto por Google
    setToken(userToken);

    // Decodificar el token para obtener la información del usuario
    const userInfo = JSON.parse(atob(userToken.split('.')[1])); 
    setUser(userInfo);
  };

  const handleError = () => {
    console.error("Error al iniciar sesión con Google");
  };

  return (
    <GoogleOAuthProvider clientId="389059903936-crh2qopn8c163qlk9ucfspglb6uep88o.apps.googleusercontent.com">
      <div style={{ textAlign: "center", margin: "20px" }}>
        <h1>Iniciar sesión con Google</h1>
        {!user ? (
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        ) : (
          <div>
            <h2>Bienvenido, {user.name}!</h2>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleAuth