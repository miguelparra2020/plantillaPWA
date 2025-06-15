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
  }, [])

  const handleSuccess = (response) => {
    const userToken = response.credential; // El token JWT devuelto por Google
    setToken(userToken);

    // Decodificar el token para obtener la información del usuario
    const userInfo = JSON.parse(atob(userToken.split(".")[1]));
    setUser(userInfo);

    // Guardar la sesión en localStorage
    localStorage.setItem("googleToken", userToken);
    localStorage.setItem("googleUser", JSON.stringify(userInfo));
    window.location.reload();
  };

  const handleError = () => {
    console.error("Error al iniciar sesión con Google");
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    
    // Eliminar datos de la sesión del localStorage
    localStorage.removeItem("googleToken");
    localStorage.removeItem("googleUser");

    window.location.reload();
  };

  return (
    <GoogleOAuthProvider clientId={generalConfig.GoogleAuth.clientId}>
        {!user ? (
          <section className="bg-gray-50 ">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
              <div className="flex flex-col justify-center">
                  <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none
                  text-gray-900 md:text-5xl lg:text-6xl ">Bienvenido a nuestro aplicativo web</h1>
                  <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl ">
                    Iniciar sesión es necesario para acceder a los contenidos relacionados con el usuario.
                  </p>
              </div>
              <div>
                  <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl ">
                      <h2 className="text-2xl font-bold text-gray-900 ">
                          Iniciar sesión con tu cuenta de Google
                      </h2>
                      <form className="mt-8 space-y-6" action="#">
                      {!user && (
                      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
              )}
                      </form>
                  </div>
              </div>
          </div>
        </section>
        ):(<div>
        <section className="bg-white  bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] ">
        <div className="py-8 px-4 mx-auto max-w-screen-xl flex flex-col items-center justify-center 
        text-center lg:py-16 z-10 relative">
          <img className="w-10 h-10 rounded-full" src={user.picture} alt="Rounded avatar" />
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
            {user.name}
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48">
            {user.email}
          </p>
          <button
            onClick={handleLogout}
            type="button"
            className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-red-700 bg-red-100 rounded-full hover:bg-red-200"
          >
            <span className="text-xs bg-red-600 rounded-full text-white px-4 py-1.5 me-3">Cerrar sesión</span>
            <svg
              className="w-2.5 h-2.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </div>

            <div className="bg-gradient-to-b from-blue-50 to-transparent  w-full h-full absolute top-0 left-0 z-0"></div>
        </section>
        </div> ) }      
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
