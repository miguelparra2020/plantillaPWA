import React from "react"
import { useState } from "react"
import { Sparkles, Store, Globe, FileText } from "lucide-react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import CardGeneral from "./CardGeneral"
import { StageProps } from "../interfaces/models"

interface EcommerceSettings {
    storeName: string
    description: string
    language: string
}



const Stage1 : React.FC<StageProps> = ({ totalStages, currentStage, handleNext }) => {

    
    const progressPorcentStage = (currentStage / totalStages) * 100
    
    const [settings, setSettings] = useState<EcommerceSettings>({
        storeName: "",
        description: "",
        language: "español"
    })
  const QuantityItemsChildren = (settings.description !== "" && settings.storeName !== "" && settings.language !== "") ? 1 : (settings.description === "" && settings.storeName !== "" && settings.language !== "") ? 2 : (settings.description !== "" && settings.storeName === "" && settings.language !== "") ? 2 : (settings.description !== "" && settings.storeName !== "" && settings.language === "") ? 2 : 3
  const progressPorcent = Math.floor(progressPorcentStage / QuantityItemsChildren)

    
      const handleSettingsChange = (key: keyof EcommerceSettings, value: string) => {
        setSettings((prev) => ({
          ...prev,
          [key]: value,
        }))
      }

      const divChildren = (
        <div>
                  <form className="flex flex-col gap-4 flex-1 p-4 justify-between">
                        <div className="space-y-4">
                          {/* Nombre de la empresa */}
                <div className="space-y-2">
                     <div className="flex items-center gap-2">
                       <Store className="w-4 h-4 text-zinc-500" />
                       <span className="text-sm text-zinc-500">Nombre de su comercio eletrónico</span>
                     </div>
                     <Input
                       type="text"
                       placeholder="Mi comercio"
                       value={settings.storeName}
                       onChange={(e) => handleSettingsChange("storeName", e.target.value)}
                       className="w-full bg-zinc-100  text-sm text-zinc-900 placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900 "
                     />
                   </div>
            
                   {/* Descripción */}
                   <div className="space-y-2">
                     <div className="flex items-center gap-2">
                       <FileText className="w-4 h-4 text-zinc-500" />
                       <span className="text-sm text-zinc-500">Descripción de su actividad económica</span>
                     </div>
                     <Textarea
                       placeholder="Somos una empresa dedicada al comercio electrónico de productos tecnológicos, etc..."
                       value={settings.description}
                       onChange={(e) => handleSettingsChange("description", e.target.value)}
                       className="w-full bg-zinc-100  text-sm text-zinc-900  placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900  min-h-[100px]"
                     />
                   </div>
            
                   {/* Idioma */}
                   <div className="space-y-2">
                     <div className="flex items-center gap-2">
                       <Globe className="w-4 h-4 text-zinc-500" />
                       <span className="text-sm text-zinc-500">Idioma de la plataforma</span>
                     </div>
                     <Select value={settings.language} onValueChange={(value) => handleSettingsChange("language", value)}>
                       <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200 rounded-xl">
                         <SelectValue placeholder="Seleccione un idioma" />
                       </SelectTrigger>
                       <SelectContent className="absolute z-[3000] mt-2 bg-white">
                         <SelectItem value="español">Español</SelectItem>
                         <SelectItem value="inglés">Inglés</SelectItem>
                         <SelectItem value="francés">Francés</SelectItem>
                         <SelectItem value="portugués">Portugués</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                 </div>
            <br />
                        <button
                          disabled={settings.storeName === "" || settings.description === "" || settings.language === ""}
                          type="button"
                          onClick={handleNext}
                          className={`w-full z-10 h-10 flex items-center justify-center gap-2 ${(settings.storeName === "" || settings.description === "" || settings.language === "") ? "bg-zinc-600" : "bg-zinc-900 hover:bg-zinc-800"}  text-white text-sm font-medium rounded-xl transition-colors self-end`}
                        >
                          <Sparkles className="w-4 h-4" />
                          Empezar
                        </button>
                      </form>
                </div>
      )
    
      return (
        <>
          <CardGeneral 
            title={`${currentStage} - Bienvenido a la creación del comercio electrónico`} 
            subtitle={"Comienza tu viaje hacia el éxito digital en minutos"} 
            progress={progressPorcent} 
            children={divChildren}
            
          />
        </>
        
      )
}
export default Stage1
