import React from 'react';
import { CrearProvider } from './CrearContext';

export const ContextosGlobales = ({ children }) => {
  return (
    <CrearProvider>
      {children}
    </CrearProvider>
  );
};