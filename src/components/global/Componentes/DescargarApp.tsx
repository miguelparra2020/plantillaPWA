import React, { useState, useEffect } from "react"
import { manifest } from "../../../../utils/seoConfig"

const DescargarApp = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    // Verificar si la app ya está instalada
    if (window.matchMedia('(display-mode: standalone)').matches || 
        // La propiedad standalone es específica para Safari en iOS
        ('standalone' in window.navigator && (window.navigator as any).standalone)) {
      setIsInstalled(true);
    }

    // Evento de instalación disponible
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevenir que Chrome muestre automáticamente el prompt
      e.preventDefault();
      // Guardar el evento para usarlo después
      setDeferredPrompt(e);
      // Actualizar UI para mostrar que es instalable
      setIsInstallable(true);
    };

    // Escuchar el evento beforeinstallprompt
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Evento de app instalada
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Mostrar el prompt de instalación
    deferredPrompt.prompt();

    // Esperar a la respuesta del usuario
    const { outcome } = await deferredPrompt.userChoice;
    
    // Limpiar el evento guardado
    setDeferredPrompt(null);

    // Verificar si se aceptó la instalación
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setIsInstallable(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto my-8">
      <div className="flex items-center mb-4">
        <img 
          src={manifest.icons?.[1]?.src || "/favicons/favicon-512x512.png"} 
          alt={`${manifest.name} logo`} 
          className="w-16 h-16 mr-4"
        />
        <div>
          <h1 className="text-xl font-bold text-gray-800">{manifest.name}</h1>
          <p className="text-gray-600">{manifest.description}</p>
        </div>
      </div>

      {isInstalled ? (
        <div className="bg-green-50 border border-green-200 rounded p-4 mt-4 text-center">
          <p className="text-green-700 font-medium">¡La aplicación ya está instalada en tu dispositivo!</p>
          <p className="text-green-600 text-sm mt-1">Puedes encontrarla en tu pantalla de inicio o menú de aplicaciones.</p>
        </div>
      ) : isInstallable ? (
        <div className="mt-4">
          <button
            onClick={handleInstallClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Instalar aplicación
          </button>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Instala esta aplicación en tu dispositivo para acceder rápidamente sin necesidad de un navegador.
          </p>
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded p-4 mt-4">
          <p className="text-gray-700 text-center">
            Para instalar esta aplicación, visita este sitio desde un navegador compatible como Chrome o Edge en tu dispositivo.
          </p>
        </div>
      )}

      <div className="mt-6 border-t pt-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Ventajas de instalar</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-gray-600">Acceso rápido desde tu pantalla de inicio</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-gray-600">Funciona sin conexión a internet</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-gray-600">Experiencia nativa similar a una aplicación</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default DescargarApp