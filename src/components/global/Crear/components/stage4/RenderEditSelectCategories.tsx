import React, { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge, Edit, Plus } from 'lucide-react'

const initialCategories = [
    { id: 1, name: "Tecnología", editedPercentage: 75 },
    { id: 2, name: "Diseño", editedPercentage: 45 },
    { id: 3, name: "Marketing", editedPercentage: 90 },
    { id: 4, name: "Desarrollo", editedPercentage: 30 },
    { id: 5, name: "Innovación", editedPercentage: 60 },
    { id: 6, name: "Estrategia", editedPercentage: 100 },
  ]
export const RenderEditSelectCategories = () => {
    const [categories, setCategories] = useState(initialCategories)

  return (
    <div className="min-h-screen bg-white p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
      <div className="text-center space-y-2">
            <h3 className="text-lg font-medium text-zinc-900">
                    Edición de categorías seleccionadas
            </h3>
            <br />
            </div>

        <div className=" gap-8">
          {categories.map((category) => (<>
            <CategoryCard key={category.id} category={category} /> <br />
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

interface CategoryProps {
  category: {
    id: number
    name: string
    editedPercentage: number
  }
}

function CategoryCard({ category }: CategoryProps) {
  return (
    <Card className="bg-gray-50 border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:translate-y-[-5px]">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{category.name}</h2>
          <Button
            className="h-8 w-8 rounded-full bg-gray-100 hover:bg-cyan-500/20 hover:text-cyan-600 transition-colors flex items-center justify-center"
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Editar {category.name}</span>
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Progreso</span>
            <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-gray-300">{category.editedPercentage}% editado</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="h-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
              style={{ width: `${category.editedPercentage}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
