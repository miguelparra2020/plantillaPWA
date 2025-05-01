import { ArrowBigLeftDash, ArrowBigRightDash, ArrowRightCircle, Check, CheckCircle2, ChevronDown, ChevronUp, ShoppingCart } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { BusinessCategory, RenderInitialQuestionComponentProps } from '../../interfaces/modelsStage4'
import { useStore } from '@nanostores/react'
import { languajePage } from 'src/stores/languajePage'
import { generalConfig } from '@util/generalConfig'
import { crearStore, initializeCategoryCardSettings } from 'src/stores/crearStore'
import { useScrollToTop } from 'src/hooks/useScrollToTop'


export const RenderInitialQuestionComponent = ({ setCurrentStep, handlePrev }: RenderInitialQuestionComponentProps) => {
    const { data: dataLanguaje} = useStore(languajePage)
    const store = useStore(crearStore)
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
    useScrollToTop()
    const getStage4FieldByLang = (fieldId: string) => {
      const lang = dataLanguaje.languajeChoose
      const langMap: Record<string, any> = {
        "/es/": generalConfig.Create.stage4.es,
        "/en/": generalConfig.Create.stage4.en,
        "/pt/": generalConfig.Create.stage4.pt,
        "/fr/": generalConfig.Create.stage4.fr,
      }
    
      return langMap[lang]?.[fieldId] || ""
    }
    
    // Genera campos como titleId1CRIQStage4, desciptionId1CRIQStage4...
    const generateFields = (prefix: string, count: number) => {
      return Array.from({ length: count }, (_, i) => getStage4FieldByLang(`${prefix}${i + 1}CRIQStage4`))
    }
    
    // Genera includesId1Item1CRIQStage4, includesId1Item2CRIQStage4...
    const generateItems = (prefix: string, categories: number, itemsPerCategory: number) => {
      return Array.from({ length: categories }, (_, catIndex) =>
        Array.from({ length: itemsPerCategory }, (_, itemIndex) =>
          getStage4FieldByLang(`${prefix}${catIndex + 1}Item${itemIndex + 1}CRIQStage4`)
        )
      )
    }
    
    // Para ejemplos, cada categoría tiene un número distinto de ejemplos
    const exampleCounts = [5, 4, 4, 4, 4]
    const examples = exampleCounts.map((count, i) =>
      Array.from({ length: count }, (_, j) =>
        getStage4FieldByLang(`examplesId${i + 1}Item${j + 1}CRIQStage4`)
      )
    )
    
    const titles = generateFields("titleId", 5)
    const descriptions = generateFields("desciptionId", 5)
    const includes = generateItems("includesId", 5, 3)
    
    const businessCategories: BusinessCategory[] = Array.from({ length: 5 }, (_, i) => {
      const category: BusinessCategory = {
        id: `${i + 1}`,
        title: titles[i],
        description: descriptions[i],
        includes: includes[i],
        examples: examples[i],
        categiryIsActive: false,
        cardInicioSettings: {
          showImage: false,
          iconColor: 'slate',
          iconColorShade: 500,
          icon: 'star',
          title: titles[i],
          description: descriptions[i],
          textAlign: 'text-left',
          rounded: 'rounded-lg',
          shadow: 'shadow-md',
          hasBorder: false,
          borderWidth: 'border',
          borderColor: 'slate',
          borderShade: '500'
        }
      }
      return category
    })

    const [businessCategoriesState, setBusinessCategoriesState] = useState<BusinessCategory[]>(businessCategories)

    // Cargar valores iniciales desde el store
    useEffect(() => {
      const currentState = crearStore.get()
      if (currentState.infoStage4?.selectedCategories) {
        setSelectedCategories(new Set(currentState.infoStage4.selectedCategories))
      }
    }, [])

    // Actualizar el store cuando cambien las categorías seleccionadas
    useEffect(() => {
      const currentState = crearStore.get()
      crearStore.set({
        ...currentState,
        infoStage4: {
          ...currentState.infoStage4,
          businessCategories: currentState.infoStage4?.businessCategories?.map(cat => ({
            ...cat,
            categiryIsActive: selectedCategories.has(cat.id)
          })) || [],
          selectedCategories: Array.from(selectedCategories)
        }
      })
    }, [selectedCategories])

    const toggleCategory = (id: string) => {
        const newSelected = new Set(selectedCategories)
        if (newSelected.has(id)) {
          newSelected.delete(id)
        } else {
          newSelected.add(id)
        }
        setSelectedCategories(newSelected)
    }

    const toggleExpanded = (id: string) => {
        const newExpanded = new Set(expandedCategories)
        if (newExpanded.has(id)) {
          newExpanded.delete(id)
        } else {
          newExpanded.add(id)
        }
        setExpandedCategories(newExpanded)
    }

    return (
        <div className="flex flex-col items-center justify-center h-full p-4 space-y-2">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium text-zinc-900">
      {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage4.es.titleRenderInitialQuestionStage4:""}
      {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage4.en.titleRenderInitialQuestionStage4:""}
      {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage4.pt.titleRenderInitialQuestionStage4:""}
      {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage4.fr.titleRenderInitialQuestionStage4:""}
            </h3>
            <p className="text-sm text-zinc-500  max-w-xs">
      {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage4.es.descriptionRenderInitialQuestionStage4:""}
      {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage4.en.descriptionRenderInitialQuestionStage4:""}
      {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage4.pt.descriptionRenderInitialQuestionStage4:""}
      {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage4.fr.descriptionRenderInitialQuestionStage4:""}
            </p>
          </div>
          <div className="flex flex-col gap-6 p-6 bg-gray-50 ">
            <div className="space-y-2">
              {store.infoStage4?.businessCategories?.map((category) => (
                <div key={category.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                        ${selectedCategories.has(category.id) 
                          ? 'bg-blue-500 border-blue-500' 
                          : 'border-gray-300 hover:border-blue-500'}`}
                    >
                      {selectedCategories.has(category.id) && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{category.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleExpanded(category.id)}
                    className="w-full mt-4 flex items-center justify-center gap-2 py-2 px-4 bg-blue-50 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors"
                  >
                    <span className="text-sm font-medium">
                      {expandedCategories.has(category.id) ? <>
        {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage4.es.hideDetailsRenderInitialQuestionStage4:""}
        {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage4.en.hideDetailsRenderInitialQuestionStage4:""}
        {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage4.pt.hideDetailsRenderInitialQuestionStage4:""}
        {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage4.fr.hideDetailsRenderInitialQuestionStage4:""}
        </> :  <>
        {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage4.es.viewDetailsRenderInitialQuestionStage4:""}
        {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage4.en.viewDetailsRenderInitialQuestionStage4:""}
        {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage4.pt.viewDetailsRenderInitialQuestionStage4:""}
        {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage4.fr.viewDetailsRenderInitialQuestionStage4:""}
        </>}
                    </span>
                    {expandedCategories.has(category.id) ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {expandedCategories.has(category.id) && (
                    <div className="mt-4 space-y-4 pt-4 border-t border-gray-100">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">
        {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage4.es.includeRenderInitialQuestionStage4:""}
        {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage4.en.includeRenderInitialQuestionStage4:""}
        {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage4.pt.includeRenderInitialQuestionStage4:""}
        {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage4.fr.includeRenderInitialQuestionStage4:""}:</h4>
                        <div className="space-y-2">
                          {category.includes.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-gray-600">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">
        {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage4.es.examplesRenderInitialQuestionStage4:""}
        {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage4.en.examplesRenderInitialQuestionStage4:""}
        {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage4.pt.examplesRenderInitialQuestionStage4:""}
        {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage4.fr.examplesRenderInitialQuestionStage4:""}:</h4>
                        <div className="space-y-2">
                          {category.examples.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <ArrowRightCircle className="w-4 h-4 text-blue-500" />
                              <span className="text-sm text-gray-600">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}


                </div>
              ))}

      {selectedCategories.size > 0 && (
              <div className="mt-2 p-4 bg-slate-100 rounded-lg">
                <p className="font-medium">
        {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage4.es.selectCategoriesRenderInitialQuestionStage4:""}
        {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage4.en.selectCategoriesRenderInitialQuestionStage4:""}
        {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage4.pt.selectCategoriesRenderInitialQuestionStage4:""}
        {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage4.fr.selectCategoriesRenderInitialQuestionStage4:""}: {selectedCategories.size}</p>
                <ul className="mt-2">
                  {Array.from(selectedCategories).map((id) => (
                    <li key={id} className="inline-block bg-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                      {businessCategories.find((cat) => cat.id === id)?.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            </div>
          </div>
          <div className="flex flex-row w-[90%] items-center justify-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
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
              disabled={selectedCategories.size === 0}
              className={`w-full z-10 h-10 flex items-center justify-center gap-2 ${
                selectedCategories.size === 0
                  ? 'bg-zinc-600'
                  : 'bg-zinc-900 hover:bg-zinc-800'
              }  text-white text-sm font-medium rounded-xl transition-colors self-end`}
            >
                <ArrowBigRightDash className="w-4 h-4" />
            {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage4.es.buttonNextStage4:""}
            {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage4.en.buttonNextStage4:""}
            {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage4.pt.buttonNextStage4:""}
            {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage4.fr.buttonNextStage4:""}
            </button>
          </div>
        </div>
    )
}