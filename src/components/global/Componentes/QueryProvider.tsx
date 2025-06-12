import React, { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type QueryProviderProps = {
  children: ReactNode
}

const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  // Crear una nueva instancia del cliente para cada render del componente en el cliente
  // Esto evita problemas de datos compartidos entre diferentes usuarios/pestañas
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Configuraciones por defecto para las consultas
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutos
      },
    },
  }))
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Opcionalmente puedes habilitar esto en desarrollo */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}

export default QueryProvider
