import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Estilos inline para el ToastContainer
const toastContainerStyle = {
  zIndex: 9999,
  position: 'fixed',
  top: '80px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '90%',
  maxWidth: '500px',
} as React.CSSProperties;

const CustomToast: React.FC = () => {
  return (
    <div style={toastContainerStyle}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default CustomToast;
