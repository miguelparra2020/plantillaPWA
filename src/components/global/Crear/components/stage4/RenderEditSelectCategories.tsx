import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { ArrowBigLeftDash, ArrowBigRightDash, Badge, Edit, Plus } from 'lucide-react'
import { useStore } from '@nanostores/react'
import { crearStore } from 'src/stores/crearStore'
import { generalConfig } from '@util/generalConfig'
import { RenderInitialQuestionComponentProps, BusinessCategory } from '../../interfaces/modelsStage4'
import { languajePage } from 'src/stores/languajePage'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const RenderEditSelectCategories = ({ setCurrentStep, handlePrev }: RenderInitialQuestionComponentProps) => {
    const { data: dataLanguaje} = useStore(languajePage)
    const [categories, setCategories] = useState<Array<{
      id: string
      name: string
      editedPercentage: number
    }>>([])

    useEffect(() => {
      const currentState = crearStore.get()
      if (currentState.infoStage4?.businessCategories) {
        const activeCategories = currentState.infoStage4.businessCategories
          .filter(cat => cat.categiryIsActive)
          .map(cat => ({
            id: cat.id,
            name: cat.title,
            editedPercentage: 0
          }))
        setCategories(activeCategories)
      }
    }, [])

    const handleEditCategory = (category: BusinessCategory) => {
      const currentState = crearStore.get()
      crearStore.set({
        ...currentState,
        infoStage4: {
          ...currentState.infoStage4,
          categorySelectToEdit: category
        }
      })

      // Mostrar notificación
      toast.success(`Categoría "${category.title}" seleccionada para edición`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }

  return (
    <div className="min-h-screen bg-white p-6 md:p-8">
      <ToastContainer className={"mt-60"}/>
      <div className="max-w-7xl mx-auto">
      <div className="text-center space-y-2">
            <h3 className="text-lg font-medium text-zinc-900">
                    Edición de categorías seleccionadas
            </h3>
            <br />
            </div>

        <div className=" gap-8">
          {crearStore.get().infoStage4?.businessCategories
            ?.filter(cat => cat.categiryIsActive)
            .map((category) => (
            <div 
              key={category.id}
              onClick={() => handleEditCategory(category)}
              className="cursor-pointer hover:opacity-90 transition-opacity m-4"
            >
              <CategoryCard 
                category={{
                  id: category.id,
                  name: category.title,
                  editedPercentage: 0
                }}
                onEdit={() => handleEditCategory(category)}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-row w-full items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentStep("initial-question")}
              className="w-[30%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
            >
              <ArrowBigLeftDash className="w-4 h-4" />
              {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage4.es.buttonPreviousStage4:""}
              {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage4.en.buttonPreviousStage4:""}
              {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage4.pt.buttonPreviousStage4:""}
              {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage4.fr.buttonPreviousStage4:""}
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep("edit-select-categories")}
            //   disabled={selectedCategories.size === 0}
              className={`w-full z-10 h-10 flex items-center justify-center gap-2 
                
                  bg-zinc-900 hover:bg-zinc-800'
              text-white text-sm font-medium rounded-xl transition-colors self-end`}
            >
                <ArrowBigRightDash className="w-4 h-4" />
            {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage4.es.buttonNextStage4:""}
            {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage4.en.buttonNextStage4:""}
            {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage4.pt.buttonNextStage4:""}
            {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage4.fr.buttonNextStage4:""}
            </button>
          </div>
      </div>
    </div>
  )
}

interface CategoryProps {
  category: {
    id: string
    name: string
    editedPercentage: number
  }
  onEdit: () => void
}

function CategoryCard({ category, onEdit }: CategoryProps) {
  return (
    <Card className="bg-gray-50 border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:translate-y-[-5px]">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{category.name}</h2>
          <Button
            onClick={onEdit}
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
