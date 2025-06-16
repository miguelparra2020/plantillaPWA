import React, { useState } from 'react';

type MenuOption = {
  id: string;
  name: string;
  icon: string;
  color: string;
  notifications: number;
  isActive: boolean;
};

const ControlAdmin = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menuOptions: MenuOption[] = [
    { id: 'resumen', name: 'Resumen', icon: '📊', color: '#5470D6', notifications: 5, isActive: false },
    { id: 'costos', name: 'Costos de la plataforma', icon: '💲', color: '#D6B156', notifications: 3, isActive: false },
    { id: 'serviciosGenerales', name: 'Servicios Generales', icon: '⚙️', color: '#4ECB71', notifications: 8, isActive: false },
    { id: 'pedidosServicios', name: 'Pedidos de Servicios', icon: '📋', color: '#EE8142', notifications: 12, isActive: false },
    { id: 'serviciosAgenda', name: 'Servicios con Agenda', icon: '📅', color: '#9254DE', notifications: 4, isActive: false },
    { id: 'agendas', name: 'Agendas', icon: '🕒', color: '#7265E6', notifications: 7, isActive: true },
    { id: 'productos', name: 'Productos', icon: '📦', color: '#D53F8C', notifications: 15, isActive: false },
    { id: 'pedidosProductos', name: 'Pedidos de Productos', icon: '🛒', color: '#DD503F', notifications: 9, isActive: false },
    { id: 'estadisticas', name: 'Estadísticas', icon: '📈', color: '#47B5BE', notifications: 2, isActive: false },
    { id: 'ingresos', name: 'Ingresos', icon: '💰', color: '#36C75E', notifications: 6, isActive: false },
    { id: 'gastos', name: 'Gastos', icon: '💸', color: '#F56C6C', notifications: 10, isActive: false },
    { id: 'ganancias', name: 'Ganancias o pérdidas', icon: '📉', color: '#34B3F1', notifications: 1, isActive: false },
    { id: 'usuarios', name: 'Usuarios', icon: '👤', color: '#6554C0', notifications: 23, isActive: false },
    { id: 'permisos', name: 'Permisos', icon: '🔒', color: '#FF9800', notifications: 5, isActive: false },
    { id: 'roles', name: 'Roles', icon: '🔑', color: '#8BC34A', notifications: 4, isActive: false },
  ];

  const handleOptionSelect = (optionId: string, isActive: boolean) => {
    if (!isActive) return; // No hacer nada si la opción no está activa
    
    setSelectedOption(optionId);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectedOptionData = selectedOption 
    ? menuOptions.find(option => option.id === selectedOption)
    : null;

  return (
    <div className="control-admin-container">
      <div className="dropdown-container">
        <div className="dropdown-header" onClick={toggleDropdown}>
          {selectedOptionData ? (
            <>
              <div className="icon-container" style={{ backgroundColor: selectedOptionData.color }}>
                <span className="icon">{selectedOptionData.icon}</span>
              </div>
              <span className="dropdown-text">{selectedOptionData.name}</span>
              {selectedOptionData.notifications > 0 && (
                <div className="notification-badge" style={{ backgroundColor: selectedOptionData.color }}>
                  {selectedOptionData.notifications}
                </div>
              )}
            </>
          ) : (
            <span className="placeholder">Selecciona una opción</span>
          )}
          <span className="dropdown-arrow">{isDropdownOpen ? '▲' : '▼'}</span>
        </div>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            {menuOptions.map((option) => (
              <div 
                key={option.id} 
                className={`dropdown-item ${!option.isActive ? 'inactive' : ''}`}
                onClick={() => handleOptionSelect(option.id, option.isActive)}
              >
                <div className="icon-container" style={{ backgroundColor: option.color, opacity: option.isActive ? 1 : 0.5 }}>
                  <span className="icon">{option.icon}</span>
                </div>
                <span className="menu-text">{option.name}</span>
                {option.notifications > 0 && (
                  <div className="notification-badge" style={{ backgroundColor: option.color }}>
                    {option.notifications}
                  </div>
                )}
                {!option.isActive && (
                  <div className="unavailable-label">No disponible</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedOption && (
        <div className="content-container">
          <h2>{selectedOptionData?.name}</h2>
          <div >
            Contenido para {selectedOptionData?.name}
          </div>
        </div>
      )}

      <style>{`
        .control-admin-container {
          display: flex;
          flex-direction: column;
          max-width: 600px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
        }
        .dropdown-container {
          position: relative;
          margin-bottom: 20px;
        }
        .dropdown-header {
          display: flex;
          align-items: center;
          padding: 12px 15px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          background-color: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          justify-content: space-between;
          position: relative;
        }
        .dropdown-header:hover {
          background-color: #f9f9f9;
        }
        .dropdown-text {
          flex-grow: 1;
          margin-left: 10px;
          font-size: 16px;
        }
        .dropdown-arrow {
          margin-left: 10px;
          font-size: 12px;
          color: #666;
        }
        .placeholder {
          color: #999;
          font-size: 16px;
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          margin-top: 5px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 100;
          max-height: 350px;
          overflow-y: auto;
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          padding: 12px 15px;
          cursor: pointer;
          transition: background-color 0.2s;
          position: relative;
        }
        .dropdown-item:hover {
          background-color: #f5f5f5;
        }
        .dropdown-item:not(:last-child) {
          border-bottom: 1px solid #f0f0f0;
        }
        .icon-container {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          flex-shrink: 0;
        }
        .icon {
          font-size: 20px;
        }
        .menu-text {
          font-size: 16px;
        }
        .content-container {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        }
        .content-container h2 {
          margin-top: 0;
          color: #333;
          font-size: 18px;
          font-weight: 600;
        }
        .content-body {
          padding: 15px;
          background-color: white;
          border-radius: 8px;
          min-height: 200px;
          border: 1px solid #eaeaea;
        }
        .notification-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 20px;
          height: 20px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: bold;
          color: white;
          padding: 0 6px;
          margin-left: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          position: relative;
        }
        .inactive {
          background-color: #f5f5f5;
          cursor: not-allowed;
          opacity: 0.8;
          position: relative;
        }
        .unavailable-label {
          font-size: 11px;
          color: #e74c3c;
          font-weight: 500;
          margin-left: auto;
          padding: 2px 6px;
          border: 1px solid #e74c3c;
          border-radius: 4px;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

export default ControlAdmin;