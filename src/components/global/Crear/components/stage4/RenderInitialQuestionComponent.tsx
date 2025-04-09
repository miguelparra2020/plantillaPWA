import { ArrowRightCircle, Check, CheckCircle2, ChevronDown, ChevronUp, ShoppingCart } from 'lucide-react'
import React, { useState } from 'react'
import { businessCategories } from '../../helpers/helpersStage4'
export const RenderInitialQuestionComponent = () => {
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
    const toggleCategory = (id: string) => {
        const newSelected = new Set(selectedCategories);
        if (newSelected.has(id)) {
          newSelected.delete(id);
        } else {
          newSelected.add(id);
        }
        setSelectedCategories(newSelected);
      }

      const toggleExpanded = (id: string) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(id)) {
          newExpanded.delete(id);
        } else {
          newExpanded.add(id);
        }
        setExpandedCategories(newExpanded);
      }

    return (
        <div className="flex flex-col items-center justify-center h-full p-6 space-y-8">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
        <ShoppingCart className="w-8 h-8" />
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium text-zinc-900">
            Propósitos de su negocio
        </h3>
        <p className="text-sm text-zinc-500  max-w-xs">
          Esta información nos ayudará a personalizar su experiencia de comercio electrónico.
        </p>
      </div>
    <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">

      <div className="space-y-4">
        {businessCategories.map((category) => (
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
                {expandedCategories.has(category.id) ? 'Ocultar detalles' : 'Ver detalles'}
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
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Incluye:</h4>
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
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Ejemplos:</h4>
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
        <div className="mt-6 p-4 bg-slate-100 rounded-lg">
          <p className="font-medium">Categorías seleccionadas: {selectedCategories.size}</p>
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
      </div>
    )
}