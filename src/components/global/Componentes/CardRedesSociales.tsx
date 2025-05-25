import React from 'react'
import { generalConfig } from "@util/generalConfig"
const CardRedesSociales = () => {
    const {
        classCardContent,
        textInicialesLogo,
        gradientFrom = "slate-500",
        gradientVia = "gray-500",
        gradientTo = "stone-500",
        shadowColor = "amber-500/20",
        innerBg = "black/80",
        textColor = "white",
      } = generalConfig.Home.socialRedes
    
      return (<>
        <div className={classCardContent}>
          <div className="flex flex-col items-center text-center">
            {/* Company logo */}
            <div
              className={`w-24 h-24 rounded-full bg-gradient-to-br from-${gradientFrom} via-${gradientVia} to-${gradientTo} flex items-center justify-center mb-6 shadow-lg shadow-${shadowColor}`}
            >
              <div
            className={`w-20 h-20 rounded-full bg-black/80 text-${textColor} text-3xl font-bold flex items-center justify-center`}
          >
                {textInicialesLogo}
              </div>
            </div>

      {/* Company name */}
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-400 via-gray-400 to-stone-400 mb-2">
        className BARBER
      </h1>

      {/* Glowing line */}
      <div className="w-16 h-1 bg-gradient-to-r from-slate-500 via-stone-600 to-gray-500 rounded-full mb-4 shadow-lg shadow-purple-500/20" />

      {/* Company mission */}
      <p className="text-gray-300 mb-8 max-w-xs">
        "No es solo una barbería, es una experiencia exclusiva para el caballero moderno que busca calidad y estilo 
        en un ambiente elegante. Ofrecemos servicios de cortes de cabello, cejas, barba y más, brindamos una atención 
        personalizada que asegura cada detalle. Ven y vive un servicio clásico diseñado para ti."
      </p>

      {/* Social media buttons */}
      <div className="flex items-center justify-center gap-4 mt-2">
        {/* Facebook */}
        {/* <div className="w-12 h-12 rounded-full backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-lg group-hover:shadow-cyan-500/20 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-facebook-icon lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </div> */}

        {/* Instagram */}
        <a href="https://www.instagram.com/classbarber.es/profilecard/?igsh=MzJyODBpZzBkaGJ1" target='blank'>
        <div className="w-12 h-12 rounded-full backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-lg group-hover:shadow-purple-500/20 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-instagram-icon lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
        </div>
        </a>

        {/* TikTok */}
        <a href="https://www.tiktok.com/@class.barbershop?_t=8qq6B5fgnfF&_r=1" target='blank'>
        <div className="w-12 h-12 rounded-full backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-lg group-hover:shadow-pink-500/20 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tiktok" viewBox="0 0 16 16">
<path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
</svg>
        </div>
        </a>
        {/* Twitter/X */}
        {/* <div className="w-12 h-12 rounded-full backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-lg group-hover:shadow-blue-500/20 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-twitter-icon lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
        </div> */}
        {/* LinkedIn */}
        {/* <div className="w-12 h-12 rounded-full backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-lg group-hover:shadow-blue-500/20 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
        </div> */}
        {/* Github */}
        {/* <div className="w-12 h-12 rounded-full backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-lg group-hover:shadow-blue-500/20 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
        </div> */}
      </div>
    </div>
  </div>
  </>)
}

export default CardRedesSociales