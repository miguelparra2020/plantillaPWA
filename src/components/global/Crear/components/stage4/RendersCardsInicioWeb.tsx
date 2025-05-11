import React, { useState, useRef, useEffect } from "react";
import { RenderInitialQuestionComponentProps } from "../../interfaces/modelsStage4";
import { ArrowBigLeftDash, ArrowBigRightDash, FileText, Layers, MousePointerClick, Store, Star, Heart, ThumbsUp, CheckCircle, Lightbulb, Gift, Calendar, BarChart, ShoppingCart, Trash2, ImageIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useStore } from "@nanostores/react";
import { crearStore, InfoStage4 } from "src/stores/crearStore";
import { colorOptionsTitles } from "../../helpers/helpersStage2";
import { iconOptionsToCard } from "../../helpers/helpersStage4";
import { colorOptionsButtons } from '../../helpers/helpersStage3';

export const RendersCardsInicioWeb = ({ setCurrentStep, handlePrev }:
    RenderInitialQuestionComponentProps) => {
        const store = useStore(crearStore)
        const searchInputRef = useRef<HTMLInputElement>(null)
        const [searchTerm, setSearchTerm] = useState('')
        const [filteredIcons, setFilteredIcons] = useState(iconOptionsToCard)

        useEffect(() => {
            if (searchInputRef.current) {
                searchInputRef.current.focus()
            }
        }, [searchTerm])

        const handleSettingsChange = (
            key: keyof typeof store.infoStage4.cardSettings | keyof typeof store.infoStage4.cardsInicio,
            value: string | boolean | number
        ) => {
            const currentState = crearStore.get();
            
            // Asegurarse de que infoStage4 existe con todos los campos requeridos
            if (!currentState.infoStage4) {
                currentState.infoStage4 = {
                    businessCategories: [],
                    selectedCategories: [],
                    categorySelectToEdit: null,
                    cardSettings: {
                        showImage: false,
                        icon: 'star',
                        title: '',
                        description: '',
                        titleColor: 'slate',
                        titleShade: 700,
                        paragraphColor: 'slate',
                        textAlign: 'text-center',
                        rounded: 'rounded-lg',
                        shadow: 'shadow-md',
                        hasBorder: false,
                        borderWidth: 'border',
                        borderColor: 'slate',
                        borderShade: '500'
                    },
                    cardsInicio: {
                        titleCardInicio: '',
                        descriptionCardInicio: '',
                        nameButtonCardInicio: '',
                        quantityCards: 1,
                        cardsDetails: []
                    },
                    rounded: 'rounded-lg',
                    bgColor: 'slate',
                    bgShade: '500',
                    shadow: 'shadow-md',
                    hasBorder: false,
                    borderWidth: 'border',
                    borderColor: 'slate',
                    borderShade: '500',
                    paragraphColor: 'slate'
                } as InfoStage4;
            }

            // Actualizar el estado de manera inmutable
            const updatedState = {
                ...currentState,
                infoStage4: {
                    ...currentState.infoStage4,
                    [key]: value
                }
            };

            // Actualizar el store y localStorage de manera síncrona
            crearStore.set(updatedState);
            localStorage.setItem('crearStore', JSON.stringify(updatedState));
        };

        const handleCardDetailsChange = (index: number, field: string, value: string) => {
            const currentState = crearStore.get();
            const selectedCategory = currentState.infoStage4?.categorySelectToEdit;
            
            if (selectedCategory) {
                // Crear una copia profunda del estado actual
                const updatedState = { ...currentState };
                
                if (!updatedState.infoStage4) {
                    updatedState.infoStage4 = {
                        businessCategories: [],
                        selectedCategories: [],
                        categorySelectToEdit: null,
                        cardSettings: {
                            showImage: false,
                            icon: 'star',
                            title: '',
                            description: '',
                            titleColor: 'slate',
                            titleShade: 700,
                            paragraphColor: 'slate',
                            textAlign: 'text-center',
                            rounded: 'rounded-lg',
                            shadow: 'shadow-md',
                            hasBorder: false,
                            borderWidth: 'border',
                            borderColor: 'slate',
                            borderShade: '500'
                        },
                        cardsInicio: {
                            titleCardInicio: '',
                            descriptionCardInicio: '',
                            nameButtonCardInicio: '',
                            quantityCards: 1,
                            cardsDetails: []
                        },
                        rounded: 'rounded-lg',
                        bgColor: 'slate',
                        bgShade: '500',
                        shadow: 'shadow-md',
                        hasBorder: false,
                        borderWidth: 'border',
                        borderColor: 'slate',
                        borderShade: '500',
                        paragraphColor: 'slate'
                    } as InfoStage4;
                }

                // Actualizar los detalles de la card
                const updatedCardsDetails = [...(selectedCategory.cardInicioSettings.cardsDetailsSesionCardsInicio || [])];
                
                // Asegurarse de que el array tenga suficiente longitud
                while (updatedCardsDetails.length <= index) {
                    updatedCardsDetails.push({ 
                        cardTitle: '', 
                        detailCard: '', 
                        iconCard: 'star',
                        imageCard: undefined 
                    });
                }
                
                // Actualizar el campo específico
                updatedCardsDetails[index] = { 
                    ...updatedCardsDetails[index], 
                    [field]: value 
                };

                // Actualizar el estado de la categoría seleccionada
                if (updatedState.infoStage4.categorySelectToEdit) {
                    updatedState.infoStage4.categorySelectToEdit = {
                        ...updatedState.infoStage4.categorySelectToEdit,
                        cardInicioSettings: {
                            ...updatedState.infoStage4.categorySelectToEdit.cardInicioSettings,
                            cardsDetailsSesionCardsInicio: updatedCardsDetails
                        }
                    };
                }

                // Actualizar las categorías de negocio
                if (updatedState.infoStage4.businessCategories) {
                    updatedState.infoStage4.businessCategories = updatedState.infoStage4.businessCategories.map(cat => 
                        cat.id === selectedCategory.id 
                            ? {
                                ...cat,
                                cardInicioSettings: {
                                    ...cat.cardInicioSettings,
                                    cardsDetailsSesionCardsInicio: updatedCardsDetails
                                }
                            }
                            : cat
                    );
                }

                // Actualizar el store y localStorage
                crearStore.set(updatedState);
                localStorage.setItem('crearStore', JSON.stringify(updatedState));
            }
        };

        const optionsQuantityCards = [
            { name: "1", value: 1 },
            { name: "2", value: 2 },
            { name: "3", value: 3 },
            { name: "4", value: 4 },
            { name: "5", value: 5 },
            { name: "6", value: 6 },
            { name: "7", value: 7 },
            { name: "8", value: 8 },
            { name: "9", value: 9 },
            { name: "10", value: 10 },
            { name: "11", value: 11 },
            { name: "12", value: 12 }
        ]

        const paragraphColorClassStage2 = `text-${store.infoStage2?.colorParagraph || 'stone'}-${store.infoStage2?.paragraphColorIntensity || 600}`
        // --- Lógica para gradientes en botones ---
        const selectedBgColorOption = colorOptionsButtons.find(opt => opt.value === store.infoStage3?.bgColor);
        const isButtonGradient = selectedBgColorOption?.isGradient;
        const buttonGradientClass = selectedBgColorOption?.gradientClass || '';

        const buttonHoverClass = isButtonGradient && selectedBgColorOption?.hoverClass ? selectedBgColorOption.hoverClass : '';
        const buttonTextColor = isButtonGradient && selectedBgColorOption?.textColor ? selectedBgColorOption.textColor : 'text-white';
        const buttonClasses = `
    px-2 md:py-1 md:px-4 ${buttonTextColor} text-[6px] md:text-[8px] flex flex-row items-center justify-center
    ${store.infoStage3?.rounded || 'rounded'}
    ${isButtonGradient ? buttonGradientClass : `bg-${store.infoStage3?.bgColor || 'blue'}-${store.infoStage3?.bgShade || 500}`}
    ${isButtonGradient ? buttonHoverClass : `hover:bg-${store.infoStage3?.bgColor || 'blue'}-${Math.min((store.infoStage3?.bgShade || 500) + 100, 900)}`}
    ${store.infoStage3?.shadow || 'shadow'}
    hover:${store.infoStage3?.shadow === 'shadow-none' ? 'shadow-sm' : 
           store.infoStage3?.shadow === 'shadow-sm' ? 'shadow' :
           store.infoStage3?.shadow === 'shadow' ? 'shadow-md' :
           store.infoStage3?.shadow === 'shadow-md' ? 'shadow-lg' :
           store.infoStage3?.shadow === 'shadow-lg' ? 'shadow-xl' :
           store.infoStage3?.shadow === 'shadow-xl' ? 'shadow-2xl' :
           store.infoStage3?.shadow === 'shadow-2xl' ? 'shadow-2xl' :
           'shadow-md'}
    ${store.infoStage3?.buttonFont || ''}
    ${store.infoStage3?.buttonWeight || 'font-normal'}
    ${store.infoStage3?.buttonSize === 'small' ? 'text-[4px] md:text-[6px]' :
      store.infoStage3?.buttonSize === 'large' ? 'text-[8px] md:text-[10px]' :
      'text-[6px] md:text-[8px]'}
    ${store.infoStage3?.hasBorder ? `${store.infoStage3?.borderWidth || 'border'} border-${store.infoStage3?.borderColor || 'blue'}-${store.infoStage3?.borderShade || 500}` : ""}
    transition-all duration-200
`

        const cardClasses2 = `
    overflow-hidden
    ${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.rounded || 'rounded-lg'}
    ${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.shadow || 'shadow-md'}
    ${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.hasBorder ? `${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.borderWidth || 'border'} border-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.borderColor || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.borderShade || '500'}` : ""}
    bg-white w-[70px] md:w-[120px]
  `

        // Generar clases para el texto
        const textClasses = `${store.infoStage4.cardSettings.textAlign}`  

        const colorMap = {
            amber: '#f59e0b',
            emerald: '#10b981',
            sky: '#0ea5e9',
            rose: '#f43f5e',
            slate: '#64748b',
            zinc: '#71717a',
            neutral: '#737373',
            stone: '#78716c'
        }

        const getIconColor = (color: string) => {
            return colorMap[color as keyof typeof colorMap] || color
        }
        const titleColorClass2 = `text-${store.infoStage4.cardSettings.titleColor}-${colorOptionsTitles.find((c) => c.value === store.infoStage4.cardSettings.titleColor)?.titleShade || 700}`

        const cardClasses3 = `
  overflow-hidden
  ${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.rounded || 'rounded-lg'}
  ${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.shadow || 'shadow-md'}
  ${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.hasBorder ? `${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.borderWidth || 'border'} border-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.borderColor || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.borderShade || '500'}` : ""}
  bg-white w-[230px] md:w-[230px]
`

        const selectedTitleColorOption = colorOptionsTitles.find(
            (color) => color.value === store.infoStage2?.colorTitles
        );
        const isGradient = selectedTitleColorOption?.isGradient;
        const gradientClass = selectedTitleColorOption?.gradientClass || '';

        return (
            <>
               
               <form  className="flex flex-col gap-4 flex-1 p-4 justify-between items-center">
        <h1>Personalizando la categoría: <br /><strong>{store.infoStage4.categorySelectToEdit?.title}</strong></h1>
        <div className="space-y-4 p-4 rounded-xl bg-zinc-50  ">
          <div className="text-sm text-zinc-700 ">
            <p className="font-medium mb-2">Personzalización visual de apariencia en el inicio web</p>
            En este apartado podrá personalizar la forma como aparecerá en el inicio de la plataforma la card o cads que personalizó, en esta o estas cards puede indicar categorias o realizar una invitación al usuario para que ingrese al área seleccionada
          </div>
        </div>

        {/* Contenido */}
        <div className="space-y-4 p-4 rounded-xl bg-zinc-50 ">
            <h4 className="text-sm font-medium text-zinc-900 ">Contenido invitación para ingresar al área de todos los productos</h4>
            {/* Título de la sesión de productos */}
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <Store className='w-4 h-4 text-zinc-500' />
                <span className='text-sm text-zinc-500'>Título de la sesión de productos</span>
              </div>
              <Input
                type='text'
                placeholder='Ejemplo: Descubre Nuestra Colección'
                value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.titleSesionCardsInicio || ''}
                onChange={(e) => handleCardDetailsChange(0, 'titleSesionCardsInicio', e.target.value)}
                className='w-full bg-zinc-100 text-sm text-zinc-900 placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900'
              />
            </div>

            {/* Descripción */}
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <FileText className='w-4 h-4 text-zinc-500' />
                <span className='text-sm text-zinc-500'>Descripción de la sesión productos</span>
              </div>
              <Textarea
                placeholder='Ejemplo: Explora una selección única de productos diseñados para ti.'
                value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.descriptionSesionCardsInicio || ''}
                onChange={(e) => handleCardDetailsChange(0, 'descriptionSesionCardsInicio', e.target.value)}
                className='w-full bg-zinc-100 text-sm text-zinc-900 placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900 min-h-[100px]'
              />
            </div>

            {/* Nombre de botón */}
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <MousePointerClick className='w-4 h-4 text-zinc-500' />
                <span className='text-sm text-zinc-500'>Nombre del botón de invitación a ver la categoría</span>
              </div>
              <Input
                type='text'
                placeholder='Ejemplo: Ver categoría'
                value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.nameButtonSesionCardsInicio || ''}
                onChange={(e) => handleCardDetailsChange(0, 'nameButtonSesionCardsInicio', e.target.value)}
                className='w-full bg-zinc-100 text-sm text-zinc-900 placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900'
              />
            </div>

            {/* Cantidad de cards */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-zinc-500" />
                <span className="text-sm text-zinc-500">Cantidad de cards. "Pueden ser las categorías"</span>
              </div>
              <Select
                value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.quantityCardsSesionCardsInicio?.toString() ?? '1'}
                onValueChange={(value) => {
                  const currentState = crearStore.get();
                  const selectedCategory = currentState.infoStage4?.categorySelectToEdit;
                  
                  if (selectedCategory) {
                    const updatedState = {
                      ...currentState,
                      infoStage4: {
                        ...currentState.infoStage4,
                        businessCategories: currentState.infoStage4?.businessCategories?.map(cat => 
                          cat.id === selectedCategory.id 
                            ? {
                                ...cat,
                                cardInicioSettings: {
                                  ...cat.cardInicioSettings,
                                  quantityCardsSesionCardsInicio: parseInt(value),
                                  cardsDetailsSesionCardsInicio: Array(parseInt(value)).fill(null).map((_, i) => 
                                    cat.cardInicioSettings.cardsDetailsSesionCardsInicio?.[i] || {
                                      cardTitle: '',
                                      detailCard: '',
                                      iconCard: 'star',
                                      imageCard: undefined
                                    }
                                  )
                                }
                              }
                            : cat
                        ),
                        categorySelectToEdit: {
                          ...selectedCategory,
                          cardInicioSettings: {
                            ...selectedCategory.cardInicioSettings,
                            quantityCardsSesionCardsInicio: parseInt(value),
                            cardsDetailsSesionCardsInicio: Array(parseInt(value)).fill(null).map((_, i) => 
                              selectedCategory.cardInicioSettings.cardsDetailsSesionCardsInicio?.[i] || {
                                cardTitle: '',
                                detailCard: '',
                                iconCard: 'star',
                                imageCard: undefined
                              }
                            )
                          }
                        }
                      }
                    };

                    crearStore.set(updatedState);
                    localStorage.setItem('crearStore', JSON.stringify(updatedState));
                  }
                }}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                  <SelectValue placeholder="Cantidad" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {optionsQuantityCards.map((item) => (
                    <SelectItem key={item.value} value={item.value.toString()}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Cards */}
            {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.quantityCardsSesionCardsInicio > 0 ?
            Array.from({ length: store.infoStage4.categorySelectToEdit?.cardInicioSettings?.quantityCardsSesionCardsInicio }).map((_, index) => {
              const cardsDetails = store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio || [];
              const currentCard = cardsDetails[index] || { cardTitle: '', detailCard: '', iconCard: 'star' };
              
              return (
                <div key={index}>
                  <div className="space-y-4 p-4 rounded-xl border border-gray-600">
                    {/* Título de la card*/}
                    <div className='space-y-2'>
                      <div className='flex items-center gap-2'>
                        <Store className='w-4 h-4 text-zinc-500' />
                        <span className='text-sm text-zinc-500'>Título de la card {index+1}</span>
                      </div>
                      <Input
                        type='text'
                        placeholder='Ejemplo: Ofertas'
                        value={currentCard.cardTitle || ''}
                        onChange={(e) => handleCardDetailsChange(index, 'cardTitle', e.target.value)}
                        className='w-full bg-zinc-100 text-sm text-zinc-900 placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900'
                      />
                    </div>

                    {/* Icono de la card */}
                    <div className='space-y-2'>
                      <div className='flex items-center gap-2'>
                        <Star className='w-4 h-4 text-zinc-500' />
                        <span className='text-sm text-zinc-500'>Icono de la card {index+1}</span>
                      </div>
                      <Select
                        value={currentCard.iconCard || 'star'}
                        onValueChange={(value) => handleCardDetailsChange(index, 'iconCard', value)}
                      >
                        <SelectTrigger className="w-full h-14 bg-zinc-100 border-zinc-200 rounded-xl">
                          <div className="flex items-center gap-2">
                            {(() => {
                              const IconComponent = iconOptionsToCard.find(opt => opt.value === currentCard.iconCard)?.icon || Star;
                              return <IconComponent className="w-4 h-4 text-zinc-500" />;
                            })()}
                            <SelectValue placeholder="Seleccione un icono" />
                          </div>
                        </SelectTrigger>
                        <SelectContent className="h-[300px] bg-white">
                          <div className="p-2 bg-white border-b sticky top-0 z-10">
                            <div className="flex items-center gap-2">
                              <Input
                                type="text"
                                placeholder="Buscar icono..."
                                className="w-full focus-visible:ring-0 focus-visible:ring-offset-0"
                                value={searchTerm}
                                onChange={(e) => {
                                  const term = e.target.value.toLowerCase();
                                  setSearchTerm(term);
                                  const filteredIcons = iconOptionsToCard.filter(icon => 
                                    icon.name.toLowerCase().includes(term)
                                  );
                                  setFilteredIcons(filteredIcons);
                                }}
                                autoFocus
                                onKeyDown={(e) => e.stopPropagation()}
                                onKeyUp={(e) => e.stopPropagation()}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setSearchTerm('');
                                  setFilteredIcons(iconOptionsToCard);
                                }}
                                className="p-2 hover:bg-zinc-100 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4 text-zinc-500" />
                              </button>
                            </div>
                          </div>
                          <div className="overflow-y-auto">
                            <div className="grid grid-cols-3 gap-2 p-2">
                              {filteredIcons.map((option) => {
                                const IconComponent = option.icon;
                                return (
                                  <SelectItem 
                                    key={option.value} 
                                    value={option.value}
                                    className="flex items-center justify-center p-2 hover:bg-zinc-100 rounded-lg"
                                  >
                                    <div className="flex flex-col items-center gap-1">
                                      <IconComponent className="w-6 h-6 text-zinc-500" />
                                      <span className="text-xs text-center">{option.name}</span>
                                    </div>
                                  </SelectItem>
                                );
                              })}
                            </div>
                          </div>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Detalle de la card */}
                    <div className='space-y-2'>
                      <div className='flex items-center gap-2'>
                        <FileText className='w-4 h-4 text-zinc-500' />
                        <span className='text-sm text-zinc-500'>Detalle de la card {index+1}</span>
                      </div>
                      <Textarea
                        placeholder='Ejemplo: Descubre nuestras mejores ofertas'
                        value={currentCard.detailCard || ''}
                        onChange={(e) => handleCardDetailsChange(index, 'detailCard', e.target.value)}
                        className='w-full bg-zinc-100 text-sm text-zinc-900 placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900 min-h-[100px]'
                      />
                    </div>

                    {/* Imagen de la card */}
                    {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.showImage && (
                      <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                          <ImageIcon className='w-4 h-4 text-zinc-500' />
                          <span className='text-sm text-zinc-500'>Imagen de la card {index+1}</span>
                        </div>
                        <Input
                          type='file'
                          accept='image/*'
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            // Validar el tamaño del archivo (máximo 5MB)
                            if (file.size > 5 * 1024 * 1024) {
                              alert('La imagen no debe superar los 5MB');
                              return;
                            }

                            try {
                              // Crear una URL temporal para la imagen
                              const imageUrl = URL.createObjectURL(file);
                              
                              // Obtener el estado actual
                              const currentState = crearStore.get();
                              const selectedCategory = currentState.infoStage4?.categorySelectToEdit;
                              
                              if (selectedCategory) {
                                // Crear una copia profunda del estado actual
                                const updatedCardsDetails = [...(selectedCategory.cardInicioSettings.cardsDetailsSesionCardsInicio || [])];
                                
                                // Asegurarse de que el array tenga suficiente longitud
                                while (updatedCardsDetails.length <= index) {
                                  updatedCardsDetails.push({ 
                                    cardTitle: '', 
                                    detailCard: '', 
                                    iconCard: 'star',
                                    imageCard: undefined 
                                  });
                                }
                                
                                // Actualizar solo la imagen de la card específica
                                updatedCardsDetails[index] = { 
                                  ...updatedCardsDetails[index], 
                                  imageCard: imageUrl 
                                };

                                // Actualizar el estado
                                const updatedState = {
                                  ...currentState,
                                  infoStage4: {
                                    ...currentState.infoStage4,
                                    businessCategories: currentState.infoStage4?.businessCategories?.map(cat => 
                                      cat.id === selectedCategory.id 
                                        ? {
                                            ...cat,
                                            cardInicioSettings: {
                                              ...cat.cardInicioSettings,
                                              cardsDetailsSesionCardsInicio: updatedCardsDetails
                                            }
                                          }
                                        : cat
                                    ),
                                    categorySelectToEdit: {
                                      ...selectedCategory,
                                      cardInicioSettings: {
                                        ...selectedCategory.cardInicioSettings,
                                        cardsDetailsSesionCardsInicio: updatedCardsDetails
                                      }
                                    }
                                  }
                                };

                                // Actualizar el store y localStorage
                                crearStore.set(updatedState);
                                localStorage.setItem('crearStore', JSON.stringify(updatedState));
                              }
                            } catch (error) {
                              console.error('Error al cargar la imagen:', error);
                              alert('Error al cargar la imagen. Por favor, intente nuevamente.');
                            }
                          }}
                          className='w-full bg-zinc-100 text-sm text-zinc-900 placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900'
                        />
                      </div>
                    )}
                  </div>
                </div>
              )
            }) : null}

            
        </div>
        <div className="space-y-4 p-4 rounded-xl border border-zinc-200">
        <div className="text-sm text-zinc-700 ">"La previsualización no es exacta, pero es una buena referencia"</div>
          <div className="text-sm text-zinc-700 ">
            <p className="font-medium mb-2">Visualización tipo WEB </p>       
          </div>

        <div className="relative mx-auto border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] md:h-[294px] w-[301px] md:w-[412px]">
          <div className="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:bg-gray-600/20 [&::-webkit-scrollbar-track]:bg-transparent">
            <div className="w-full mt-2 flex flex-col justify-center items-center">
              <h2 className={`text-[12px] ${store.infoStage2?.titleWeight || 'font-bold'} ${isGradient ? 'text-transparent bg-clip-text ' + gradientClass : titleColorClass2} ${store.infoStage2?.titleFont || ''} mb-2`}>
                {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.titleSesionCardsInicio || 'Título de la sesión'}
              </h2>
            </div>

            {/* Layout para una sola card */}
            {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.quantityCardsSesionCardsInicio === 1 && (
              <div className="flex flex-row items-center justify-center">
                <div className="w-[50%] h-[120px] md:h-[224px] flex flex-col items-center justify-center"> 
                  <div className="w-[90%] pb-4 flex flex-col items-center justify-center text-center">
                    <p className={`text-[8px] ${store.infoStage2?.paragraphWeight || 'font-normal'} ${paragraphColorClassStage2} ${store.infoStage2?.paragraphFont || ''} mb-6`}>
                      {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.descriptionSesionCardsInicio || 'Descripción de la sesión'}
                    </p>
                  </div>

                  <div className="w-[90%] pb-2 flex flex-col items-center justify-center text-center">
                    <button type="button" className={buttonClasses}>
                      {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.nameButtonSesionCardsInicio || 'Ver categoría'} &nbsp; 
                      <ArrowBigRightDash className='w-2 md:w-3 h-4' />
                    </button>
                  </div>
                </div>
                <div className="w-[50%] flex flex-col items-center justify-center"> 
                  <div>
                    {/* Vista previa de la card */}
                    <div className={`${cardClasses2} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer`}>
                      {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.showImage && (
                        <div className="relative">
                          <img
                            src={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[0]?.imageCard || "https://flowbite.com/docs/images/examples/image-3@2x.jpg"}
                            alt="Card preview"
                            className="object-cover w-full"
                          />
                          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                            {(() => {
                              const IconComponent = iconOptionsToCard.find(opt => opt.value === store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[0]?.iconCard)?.icon || Star;
                              return (
                                <div className={`flex items-center justify-center w-4 h-4 md:w-6 md:h-6 rounded-full bg-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconBgColor || 'slate'}-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconBgShade || 500} shadow-lg`}>
                                  <IconComponent className={`w-2 h-2 md:w-3 md:h-3 text-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconColor || 'white'}-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconColorShade || 500}`} />
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                      )}
                      {!store.infoStage4.categorySelectToEdit?.cardInicioSettings?.showImage && (
                        <div className="relative pt-8 mt-4">
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                            {(() => {
                              const IconComponent = iconOptionsToCard.find(opt => opt.value === store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[0]?.iconCard)?.icon || Star;
                              return (
                                <div className={`flex items-center justify-center w-4 h-4 md:w-6 md:h-6 rounded-full bg-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconBgColor || 'slate'}-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconBgShade || 500} shadow-lg`}>
                                  <IconComponent className={`w-2 h-2 md:w-3 md:h-3 text-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconColor || 'white'}-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconColorShade || 500}`} />
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                      )}
                      <div className={`p-1 md:p-2 ${textClasses} ${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.showImage ? 'mt-4' : 'mt-2'}`}>
                        <div className="flex flex-col gap-0.5 md:gap-1">
                          <span className={`text-[8px] md:text-[6px] ${store.infoStage2?.titleWeight || 'font-bold'} text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.titleColorCard || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.titleColorShadeCard || 500} ${store.infoStage2?.titleFont || ''}`}>
                            {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[0]?.cardTitle || 'Título de la card'}
                          </span>
                          <p className={`text-[6px] ${store.infoStage2?.paragraphWeight || 'font-normal'} text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.paragraphColorCard || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.paragraphColorShadeCard || 500} ${store.infoStage2?.paragraphFont || ''}`}>
                            {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[0]?.detailCard || 'Descripción de la card'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Layout para múltiples cards */}
            {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.quantityCardsSesionCardsInicio > 1 && (
              <div className="flex flex-col items-center justify-center w-full">
                <div className="w-[90%] pb-1 flex flex-col items-center justify-center text-center">
                  <p className={`text-[8px] ${store.infoStage2?.paragraphWeight || 'font-normal'} ${paragraphColorClassStage2} ${store.infoStage2?.paragraphFont || ''} mb-1`}>
                    {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.descriptionSesionCardsInicio || 'Descripción de la sesión'}
                  </p>
                </div>

                <div className="w-full flex justify-center items-center ">
                  <div className="flex flex-wrap justify-center gap-2 max-w-[400px] ">
                    {Array.from({ length: Math.min(store.infoStage4.categorySelectToEdit?.cardInicioSettings?.quantityCardsSesionCardsInicio || 0, 11) }).map((_, index) => {
                      const cardDetails = store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio?.[index];
                      return (
                        <div key={index} className={`${cardClasses2} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer`}>
                          {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.showImage && cardDetails?.imageCard && (
                            <div className="relative ">
                              <img
                                src={cardDetails.imageCard}
                                alt={`Card preview ${index + 1}`}
                                className="w-full object-cover"
                              />
                              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                                {(() => {
                                  const IconComponent = iconOptionsToCard.find(opt => opt.value === cardDetails?.iconCard)?.icon || Star;
                                  return (
                                    <div className={`flex items-center justify-center w-4 h-4 md:w-6 md:h-6 rounded-full bg-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconBgColor || 'slate'}-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconBgShade || 500} shadow-lg`}>
                                      <IconComponent className={`w-2 h-2 md:w-3 md:h-3 text-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconColor || 'white'}-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconColorShade || 500}`} />
                                    </div>
                                  );
                                })()}
                              </div>
                            </div>
                          )}
                          {!store.infoStage4.categorySelectToEdit?.cardInicioSettings?.showImage && (
                            <div className="relative pt-4 mt-2">
                              <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                                {(() => {
                                  const IconComponent = iconOptionsToCard.find(opt => opt.value === cardDetails?.iconCard)?.icon || Star;
                                  return (
                                    <div className={`flex items-center justify-center w-4 h-4 md:w-6 md:h-6 rounded-full bg-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconBgColor || 'slate'}-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconBgShade || 500} shadow-lg`}>
                                      <IconComponent className={`w-2 h-2 md:w-3 md:h-3 text-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconColor || 'white'}-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconColorShade || 500}`} />
                                    </div>
                                  );
                                })()}
                              </div>
                            </div>
                          )}
                          <div className={`p-1 md:p-2 ${textClasses} ${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.showImage ? 'mt-4' : 'mt-2'}`}>
                            <div className="flex flex-col gap-0.5 md:gap-1">
                              <span className={`text-[10px] ${store.infoStage2?.titleWeight || 'font-bold'} text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.titleColorCard || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.titleColorShadeCard || 500} ${store.infoStage2?.titleFont || ''}`}>
                                {cardDetails?.cardTitle || `Título de la card ${index + 1}`}
                              </span>
                              <p className={`text-[8px] ${store.infoStage2?.paragraphWeight || 'font-normal'} text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.paragraphColorCard || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.paragraphColorShadeCard || 500} ${store.infoStage2?.paragraphFont || ''}`}>
                                {cardDetails?.detailCard || `Descripción de la card ${index + 1}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="w-full mt-2 pb-2 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                  <button type="button" className={buttonClasses}>
                    {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.nameButtonSesionCardsInicio || 'Ver categoría'} &nbsp; 
                    <ArrowBigRightDash className='w-4 md:w-5 h-6' />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

    <div className="relative mx-auto bg-gray-900 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
    </div>

    <div className="text-sm text-zinc-700 ">
          <p className="font-medium mb-2">Visualización tipo Móvil</p>       
        </div>


    <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
        <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:bg-gray-600/20 [&::-webkit-scrollbar-track]:bg-transparent">
          <div className="w-full mt-20 flex flex-col justify-center items-center">
            <h6 className={`text-[12px] ${store.infoStage2?.titleWeight || 'font-bold'} ${isGradient ? 'text-transparent bg-clip-text ' + gradientClass : titleColorClass2} ${store.infoStage2?.titleFont || ''} mb-2`}>
              {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.titleSesionCardsInicio || 'Título de la sesión'}
            </h6>
          </div>
          <div className="flex mt-4 flex-col items-center justify-center">
            <div className="w-[90%] pb-4 flex flex-col items-center justify-center text-center">
              <p className={`text-[8px] ${store.infoStage2?.paragraphWeight || 'font-normal'} ${paragraphColorClassStage2} ${store.infoStage2?.paragraphFont || ''}`}>
                {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.descriptionSesionCardsInicio || 'Descripción de la sesión'}
              </p>
            </div>
          </div>
          <div className="flex mt-4 flex-col items-center justify-center">
            {/* Vista previa de las cards */}
            <div className="w-full px-4 grid grid-cols-1 gap-2">
              {Array.from({ length: store.infoStage4.categorySelectToEdit?.cardInicioSettings?.quantityCardsSesionCardsInicio || 0 }).map((_, index) => (
                <div key={index} className={`${cardClasses3} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer`}>
                  {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.showImage && store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[index]?.imageCard && (
                    <div className="relative">
                      <img
                        src={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[index]?.imageCard}
                        alt={`Card preview ${index + 1}`}
                        className="w-full object-cover"
                      />
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                        {(() => {
                          const IconComponent = iconOptionsToCard.find(opt => opt.value === store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[index]?.iconCard)?.icon || Star;
                          return (
                            <div className={`flex items-center justify-center w-4 h-4 md:w-6 md:h-6 rounded-full bg-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconBgColor || 'slate'}-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconBgShade || 500} shadow-lg`}>
                              <IconComponent className={`w-2 h-2 md:w-3 md:h-3 text-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconColor || 'white'}-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconColorShade || 500}`} />
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                  {!store.infoStage4.categorySelectToEdit?.cardInicioSettings?.showImage && (
                    <div className="relative pt-2 mt-2">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                        {(() => {
                          const IconComponent = iconOptionsToCard.find(opt => opt.value === store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[index]?.iconCard)?.icon || Star;
                          return (
                            <div className={`flex items-center justify-center w-4 h-4 md:w-6 md:h-6 rounded-full bg-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconBgColor || 'slate'}-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconBgShade || 500} shadow-lg`}>
                              <IconComponent className={`w-2 h-2 md:w-3 md:h-3 text-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconColor || 'white'}-${store.infoStage4.businessCategories?.find(cat => cat.id === store.infoStage4.categorySelectToEdit?.id)?.cardInicioSettings.iconColorShade || 500}`} />
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                  <div className={`p-2 md:p-4 ${textClasses} ${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.showImage ? 'mt-4' : 'mt-2'}`}>
                    <div className="flex flex-col gap-0.5 md:gap-1">
                      <span className={`text-[10px] ${store.infoStage2?.titleWeight || 'font-bold'} text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.titleColorCard || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.titleColorShadeCard || 500} ${store.infoStage2?.titleFont || ''}`}>
                        {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[index]?.cardTitle || `Título de la card ${index + 1}`}
                      </span>
                      <p className={`text-[8px] ${store.infoStage2?.paragraphWeight || 'font-normal'} text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.paragraphColorCard || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.paragraphColorShadeCard || 500} ${store.infoStage2?.paragraphFont || ''}`}>
                        {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[index]?.detailCard || `Descripción de la card ${index + 1}`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full mt-6 pb-2 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
            <button type="button" className={buttonClasses}>
              {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.nameButtonSesionCardsInicio || 'Ver categoría'} &nbsp; 
              <ArrowBigRightDash className='w-4 md:w-5 h-6' />
            </button>
          </div>
        </div>
    </div>

        </div>

        

        <div className="flex flex-row items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setCurrentStep("card-customization")}
          className="w-[30%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
        >
          <ArrowBigLeftDash className="w-4 h-4" />
          atrás
        </button>
          <button
            type="button"
            onClick={() => setCurrentStep("cards-search-in-category")}
            className="w-[70%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
          >
              <ArrowBigRightDash className="w-4 h-4" />
              Siguiente personalización
          </button>
        </div>
      </form>
        </>
    )
}