import React from 'react'
import { RenderInitialQuestionComponentProps } from "../../interfaces/modelsStage4"
import { useStore } from '@nanostores/react'
import { crearStore } from 'src/stores/crearStore'
import { RenderCardSearchInCategory2 } from './categoryId2/RenderCardSearchInCategory2'
import { RenderCardSearchInCategory1 } from './categoryId1/RenderCardSearchInCategory1'

export const RenderCardsSearchInCategory = ({ setCurrentStep, handlePrev }: 
    RenderInitialQuestionComponentProps) => {
      const store = useStore(crearStore)

    return (
      <form  className="flex flex-col gap-4 flex-1 p-4 justify-between items-center">
        <h1>Personalizando la categoría: <br /><strong>{store.infoStage4.categorySelectToEdit?.id} - {store.infoStage4.categorySelectToEdit?.title}</strong>
        </h1>
        <div className="space-y-4 p-4 rounded-xl bg-zinc-50  ">
          <div className="text-sm text-zinc-700 ">
            <p className="font-medium mb-2">Personzalización visual del area de busqueda de los items de la categorida escogida</p>
            En este apartado podrá personalizar la forma como aparecerá en el inicio de la plataforma la card o cads que personalizó, en esta o estas cards puede indicar categorias o realizar una invitación al usuario para que ingrese al área seleccionada
          </div>
        </div>
        {store.infoStage4.categorySelectToEdit?.id === "1" ? <>
          <RenderCardSearchInCategory1 setCurrentStep={setCurrentStep} handlePrev={handlePrev}/>
        </>: null}
        {store.infoStage4.categorySelectToEdit?.id === "2" ? <>
          <RenderCardSearchInCategory2 setCurrentStep={setCurrentStep} handlePrev={handlePrev}/>
        </>: null}

        
        </form>
    )
}