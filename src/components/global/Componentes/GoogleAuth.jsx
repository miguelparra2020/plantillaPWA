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


<section class="bg-gray-50 dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div class="flex flex-col justify-center">
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none
             text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Bienvenido a nuestro aplicativo web</h1>
            <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Iniciar sesión es necesario para acceder a los contenidos relacionados con el usuario.
            </p>
        </div>
        <div>
            <div class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                    Iniciar sesión con tu cuenta de Google
                </h2>
                <form class="mt-8 space-y-6" action="#">
                {!user && (
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        )}
                </form>
            </div>
        </div>
    </div>
</section>


      {/* <div>
            <h2>Bienvenido, {user.name}!</h2>
            <p>Email: {user.email}</p>

            <button onClick={handleLogout}>Cerrar sesión</button>
          </div> */}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
