import React from 'react'
import { RenderInitialQuestionComponentProps } from "../../interfaces/modelsStage4"
import { useStore } from '@nanostores/react'
import { crearStore } from 'src/stores/crearStore'
import { RenderCardSearchInCategory2 } from './categoryId2/RenderCardSearchInCategory2'
import { RenderCardSearchInCategory1 } from './categoryId1/RenderCardSearchInCategory1'
import { RenderCardSearchInCategory3 } from './categoryId3/RenderCardSearchInCategory3'
import { RenderCardSearchInCategory4 } from './categoryId4/RenderCardSearchInCategory4'
import { RenderCardSearchInCategory5 } from './categoryId5/RenderCardSearchInCategory5'

export const RenderCardsSearchInCategory = ({ setCurrentStep, handlePrev }: 
    RenderInitialQuestionComponentProps) => {
      const store = useStore(crearStore)

    return (
      <form  className="flex flex-col gap-4 flex-1 p-4 justify-between items-center">
        <h1>Personalizando la categoría: <br /><strong>{store.infoStage4.categorySelectToEdit?.id} - {store.infoStage4.categorySelectToEdit?.title}</strong></h1>
                <div className="space-y-4 p-4 rounded-xl bg-zinc-50 w-full max-w-lg">
                    <div className="text-sm text-zinc-700">
                        <p className="font-medium mb-2">Personalización de tarjeta de búsqueda</p>
                        Esta tarjeta aparecerá en las búsquedas dentro de la categoría, permitiendo a sus usuarios visualizar los productos o servicios disponibles.
                    </div>
                </div>
        {store.infoStage4.categorySelectToEdit?.id === "1" ? <>
          <RenderCardSearchInCategory1 setCurrentStep={setCurrentStep} handlePrev={handlePrev}/>
        </>: null}
        {store.infoStage4.categorySelectToEdit?.id === "2" ? <>
          <RenderCardSearchInCategory2 setCurrentStep={setCurrentStep} handlePrev={handlePrev}/>
        </>: null}
        {store.infoStage4.categorySelectToEdit?.id === "3" ? <>
          <RenderCardSearchInCategory3 setCurrentStep={setCurrentStep} handlePrev={handlePrev}/>
        </>: null}
        {store.infoStage4.categorySelectToEdit?.id === "4" ? <>
          <RenderCardSearchInCategory4 setCurrentStep={setCurrentStep} handlePrev={handlePrev}/>
        </>: null}
        {store.infoStage4.categorySelectToEdit?.id === "5" ? <>
          <RenderCardSearchInCategory5 setCurrentStep={setCurrentStep} handlePrev={handlePrev}/>
        </>: null}
        </form>
    )
}