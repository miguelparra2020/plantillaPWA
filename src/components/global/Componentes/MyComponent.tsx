import React, { useState, useEffect } from 'react'
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query'

type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  if (!res.ok) {
    throw new Error('Error fetching todos')
  }
  return res.json()
}

// Componente React Query que solo se usa una vez que estamos en el cliente
const TodoList: React.FC = () => {
  const { data, isLoading, error } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  if (isLoading) return <p>Cargando...</p>
  if (error instanceof Error) return <p>Error: {error.message}</p>

  return (
    <ul className="list-disc pl-5 space-y-2">
      {data?.slice(0, 5).map((todo) => (
        <li key={todo.id} className="text-gray-800">{todo.title}</li>
      ))}
    </ul>
  )
}

// Componente principal que maneja el renderizado isomórfico y la inicialización de React Query
const MyComponent: React.FC = () => {
  // Estado para detectar si estamos en el navegador y no en SSR
  const [isClient, setIsClient] = useState(false);
  
  // QueryClient que solo se inicializa una vez en el cliente
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutos
      },
    },
  }));

  // Solo ejecutamos este efecto en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Contenido para el servidor (SSR)
  if (!isClient) {
    return <div className="p-4 bg-white shadow rounded-lg">Cargando datos...</div>;
  }

  // Contenido para el cliente con React Query inicializado
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-4 bg-white shadow rounded-lg">
        <h2 className="text-xl font-bold mb-4">Lista de Tareas</h2>
        <TodoList />
      </div>
    </QueryClientProvider>
  );
};

export default MyComponent
