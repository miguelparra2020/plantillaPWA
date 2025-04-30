import { useStore } from '@nanostores/react'
import { crearStore } from 'src/stores/crearStore'
import { Star } from 'lucide-react'

export const CardInicio = () => {
  const store = useStore(crearStore)
  const settings = store.infoStage4?.categorySelectToEdit?.cardInicioSettings

  const getTitleColor = () => {
    if (!settings) return ''
    return `text-${settings.titleColor}-${settings.titleColorShade}`
  }

  return (
    <div className="flex flex-col gap-4">
      {store.infoStage4?.cardSettings.textAlign === "text-center" ? (
        <div className="mx-auto">
          <Star className="w-8 h-8 text-slate-500" />
        </div>
      ) : store.infoStage4?.cardSettings.textAlign === "text-right" ? (
        <div className="ml-auto">
          <Star className="w-8 h-8 text-slate-500" />
        </div>
      ) : (
        <div>
          <Star className="w-8 h-8 text-slate-500" />
        </div>
      )}
      <span className={`text-xl font-bold ${getTitleColor()}`}>
        {store.infoStage4?.categorySelectToEdit?.title}
      </span>
    </div>
  )
} 