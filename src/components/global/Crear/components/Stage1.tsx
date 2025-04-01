import React from 'react'
import { StageProps } from '../interfaces/models'
import CardGeneral from './CardGeneral'
import { Stage1Settings } from './stage1/Stage1Settings'
import { ButtonHandleNextStage1 } from './stage1/ButtonHandleNextStage1'
import { useStore } from '@nanostores/react'
import { crearStore } from '../../../../stores/crearStore'
import { languajePage } from '../../../../stores/languajePage'

const Stage1: React.FC<StageProps> = ({ totalStages, currentStage, handleNext }) => {
  const progressPorcent = Math.floor((currentStage / totalStages) * 100)
  const { data, loading, error } = useStore(crearStore)
  const { data: dataLanguaje, loading: loadingLanguaje, error: errorLenguaje } = useStore(languajePage)
  const handleUpdate = () => {
    crearStore.set({ data: 'Nuevos datos', loading: false, error: null });
  };

  const handleUpdateLenguaje = () => {
    languajePage.set({ data: {languajeChoose: "en"}, loading: false, error: null });
  }
  return (
    <>
    {loading ? <p>Cargando...</p> : <p>Datos: {data}</p>}
    {error ? <p>Error: {error}</p>:null}

    {loadingLanguaje ? <p>Cargando...</p> : <p>Datos: {dataLanguaje.languajeChoose}</p>}
    {errorLenguaje ? <p>Error: {errorLenguaje}</p>:null}
    <div>
      <button onClick={handleUpdate}>Actualizar Datos</button>
    </div>
    <div>
      <button onClick={handleUpdateLenguaje}>Actualizar Languaje</button>
    </div>
      <CardGeneral
        title={`${currentStage} - Bienvenido a la creación del comercio electrónico`}
        subtitle={'Comienza tu viaje hacia el éxito digital en minutos'}
        progress={progressPorcent}
        children={<div><Stage1Settings /> <ButtonHandleNextStage1 handleNext={handleNext}/></div>}
      />
      
    </>
  )
}

export default Stage1
