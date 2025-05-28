import React from 'react'
import MiguelPaezImg from '@img/MiguelPaez.webp'

const Footer = () => {
    const currentYear = new Date().getFullYear()
    
    return (
        <footer className="w-full border-t border-gray-200 bg-white py-4">
            <div className=" mx-auto px-4 flex flex-col">
                {/* Navigation */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    {/* Logo */}
                    <div className="flex items-center mb-4 md:mb-0">
                        <span className="text-lg font-semibold flex items-center">
                            Class Barber Shop
                        </span>
                    </div>
                    
                    {/* Navigation Links */}
                    <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-gray-600">
                        <a href="/citas" className="hover:text-gray-900 transition-colors duration-200">Citas</a>
                        <a href="/fotos" className="hover:text-gray-900 transition-colors duration-200">Fotos</a>
                        <a href="/ubicacion" className="hover:text-gray-900 transition-colors duration-200">Ubicación</a>
                    </nav>
                </div>
                
                {/* Divider */}
                <hr className="my-4 border-gray-200" />
                
                {/* Copyright and Credits */}
                <div className="flex flex-col items-center text-center text-sm text-gray-600">
                    <p className="mb-2">© {currentYear}</p>
                    
                    {/* Developer Credits */}
                    <div className="flex items-center justify-center mb-1">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                            {/* Avatar placeholder - you can replace with an actual image */}
                            <img src={MiguelPaezImg} alt="Miguel Páez - Desarrollador de software" />
                        </div>
                        <p>Miguel Páez - Desarrollador de software</p>
                    </div>
                    
                    <p className="mb-1">&</p>
                    
                    <p className="mb-2">Kevin Zapata - Project Manager</p>
                    
                    <p>All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer