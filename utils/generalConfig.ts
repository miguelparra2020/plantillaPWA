import ImagenCompany from '@img/user.png';
import ImagenGrandeAvif from '@img/inicio/imagen-grande-bienvenida.avif'
import ImagenGrandeWebp from '@img/inicio/imagen-grande-bienvenida.webp'
import ImagenGrandeJpg from '@img/inicio/imagen-grande-bienvenida.jpg'
import ImagenMedianaAvif from '@img/inicio/imagen-mediana-bienvenida.avif'
import ImagenMedianaWebp from '@img/inicio/imagen-mediana-bienvenida.webp'
import ImagenMedianaJpg from '@img/inicio/imagen-mediana-bienvenida.jpg'
// Idioma del proyecto
type Idioma = "/en/" | "/es/" | "/pt/" | "/fr/"
export const getCurrentLanguage = (languajeChoose: string): Idioma => {
  return `${languajeChoose}` as Idioma;
}
// Modulos que estarán activos
export const ModuelesActives = {
  Home: true, //Inicio
  Car: true, //Carrito
  User: true, //Usuario
  Us: true, //Nosotros
  Services: true, //Servicios
  Products: true, //Productos
  Publications: true, //Publicaciones
  Contact: true, //Contacto
  Location: true, //Ubicación
  Reservation: true, //Reservas
  Quotes: true, //Citas
  Events: true, //Eventos,
  Photos: true, //Fotos
  DownloadApp: true, //Descargar
  Language: true, //Idioma
}

export const company = {
  name: "Mi Comercio Electrónico",
  principalColorTitles: "cyan",
  principalColorParrafos: "slate",
  principalColorButtonsBg: "blue",
  principalColorButtonsText: "white",
}

// Traducciones
export const translationsLinksPages = {
  "/en/": {
    downloadApp: "Download App",
    home: "Home",
    products: "Products",
    services: "Services",
    photos: "Photos",
    publications: "Publications",
    events: "Events",
    quotes: "Quotes",
    reservations: "Reservations",
    us: "Us",
    location: "Location",
    contact: "Contact",
    crear: "Create ecommerce",
    language: "Language",
  },
  "/es/": {
    downloadApp: "Descargar App",
    home: "Inicio",
    products: "Productos",
    services: "Servicios",
    photos: "Fotos",
    publications: "Publicaciones",
    events: "Eventos",
    quotes: "Citas",
    reservations: "Reservas",
    us: "Nosotros",
    location: "Ubicación",
    contact: "Contacto",
    crear: "Crear ecommerce",
    language: "Idioma",
  },
  "/pt/": {
    downloadApp: "Baixar aplicativo",
    home: "Início",
    products: "Produtos",
    services: "Serviços",
    photos: "Fotos",
    publications: "Publicações",
    events: "Eventos",
    quotes: "Citações",
    reservations: "Reservas",
    us: "Nós",
    location: "Localização",
    contact: "Contato",
    crear: "Criar ecommerce",
    language: "Linguagem",
  },
  "/fr/": {
    downloadApp: "Télécharger l'application",
    home: "Accueil",
    products: "Produits",
    services: "Services",
    photos: "Photos",
    publications: "Publications",
    events: "Événements",
    quotes: "Citations",
    reservations: "Réservations",
    us: "Nous",
    location: "Emplacement",
    contact: "Contact",
    crear: "Créer ecommerce",
    language: "Langue",
  },
}
export const getTranslation = (languajeChoose: string, key: string): string => {
  const currentLanguage = getCurrentLanguage(languajeChoose)
  return translationsLinksPages[currentLanguage][key] || key
}

export const translationHomeWellcome = {
  "/en/": {
    Wellcome: "Welcome to",
    DescriptionWellcome: "We are an e-commerce company that promises the sale of technological products through partnerships with regional suppliers and the provision of technology services."
  }, 
  "/es/": {
    Wellcome: "Bienvenido a",
    DescriptionWellcome: "Somos una empresa de comercio electrónico que promete la venta de productos tecnológicos mediante alianzas con proveedores regionales y la prestación de servicios en tecnología"
  },
  "/pt/": {
    Wellcome: "Bem-vindo a",
    DescriptionWellcome: "Somos uma empresa de comércio eletrônico que promete a venda de produtos tecnológicos por meio de parcerias com fornecedores regionais e a prestação de serviços em tecnologia."
  },
  "/fr/": {
    Wellcome: "Bienvenue à",
    DescriptionWellcome: "Nous sommes une entreprise de commerce électronique qui s'engage à vendre des produits technologiques grâce à des partenariats avec des fournisseurs régionaux et à la prestation de services technologiques."
  },
}
export  const getTranslationHomeWelcome = (languajeChoose: string, key: string): string => {
  const currentLanguage = getCurrentLanguage(languajeChoose)
  return translationHomeWellcome[currentLanguage][key] || key
}

export  const translationHomeServices = {
  "/en/": {
    title: "Professional Services"
  }, 
  "/es/": {
    title: "Servicios Profesionales"
  },
  "/pt/": {
    title: "Serviços Profissionais"
  },
  "/fr/": {
    title: "Services Professionnels"
  },
}
export  const getTranslationHomeServices = (languajeChoose: string, key: string): string => {
  const currentLanguage = getCurrentLanguage(languajeChoose)
  return translationHomeServices[currentLanguage][key] || key
}

// Paths Iconos 
export const pathsIconos = {
  path1downloadApp:"M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1z",
  path2downloadApp: "M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z",
  path1home: "M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5",
  path2home: "",
  path1products: "M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.01-.003.268-.108a.75.75 0 0 1 .558 0l.269.108.01.003zM10.404 2 4.25 4.461 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339L8 5.961 5.596 5l6.154-2.461z",
  path2products: "",
  path1services: "M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z",
  path2services: "",
  path1photos: "M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3",
  path2photos: "M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2M14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1M2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1z",
  path1publications: "M4 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z",
  path2publications: "M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1",
  path1events: "M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708",
  path2events: "",
  path1quotes: "M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708",
  path2quotes: "",
  path1reservations: "M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708",
  path2reservations: "",
  path1us: "M15 .5a.5.5 0 0 0-.724-.447l-8 4A.5.5 0 0 0 6 4.5v3.14L.342 9.526A.5.5 0 0 0 0 10v5.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14h1v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zM2 11h1v1H2zm2 0h1v1H4zm-1 2v1H2v-1zm1 0h1v1H4zm9-10v1h-1V3zM8 5h1v1H8zm1 2v1H8V7zM8 9h1v1H8zm2 0h1v1h-1zm-1 2v1H8v-1zm1 0h1v1h-1zm3-2v1h-1V9zm-1 2h1v1h-1zm-2-4h1v1h-1zm3 0v1h-1V7zm-2-2v1h-1V5zm1 0h1v1h-1z",
  path2us: "",
  path1location: "M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411",
  path2location: "",
  path1contact: "M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15",
  path2contact: "",
  path1crear: "M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z",
  path2crear: "M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z",
  path1Language: "M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001",
  path2Language: ""

}

export  const translationLanguage = {
  "/en/": {
      titleSelectLanguage: "Select Language",
      currentLanguage: "Current Language",
      spanish: "Spanish 🇪🇸 👈",
      english: "English 🇺🇲 👈",
      portuguese: "Portuguese 🇵🇹 👈",
      french: "French 🇫🇷 👈",
      requiredSelect: "Select a language",
      changeSelect: "Change Language",
  }, 
  "/es/": {
      titleSelectLanguage: "Seleccionar Idioma",
      currentLanguage: "Idioma Actual",
      spanish: "Español 🇪🇸 👈",
      english: "Inglés 🇺🇲 👈",
      portuguese: "Portugués 🇵🇹 👈",
      french: "Francés 🇫🇷 👈",
      requiredSelect: "Selecciona un idioma",
      changeSelect: "Cambiar Idioma",
  },
  "/pt/": {
      titleSelectLanguage: "Selecione o Idioma",
      currentLanguage: "Idioma Atual",
      spanish: "Español 🇪🇸 👈",
      english: "Inglês 🇺🇲 👈",
      portuguese: "Português 🇵🇹 👈",
      french: "Francês 🇫🇷 👈",
      requiredSelect: "Selecione um idioma",
      changeSelect: "Alterar idioma",
  },
  "/fr/": {
      titleSelectLanguage: "Choisir la Langue",
      currentLanguage: "Langue Actuelle",
      spanish: "Espagnol 🇪🇸 👈",
      english: "Anglais 🇺🇲 👈",
      portuguese: "Portugais 🇵🇹 👈",
      french: "Français 🇫🇷 👈",
      requiredSelect: "Sélectionnez une langue",
      changeSelect: "Changer de langue",
  },
}
export  const getTranslationLanguage = (languajeChoose: string, key: string): string => {
  const currentLanguage = getCurrentLanguage(languajeChoose)
  return translationLanguage[currentLanguage][key] || key
}

export const translationGeneralWords = {
  "/en/": {
    loading: "Loading...",
    error: "Error",
    select: "Select",
  }, 
  "/es/": {
    loading: "Cargando...",  
    error: "Error",  
    select: "Seleccionar",
  },
  "/pt/": {
    loading: "Carregando...",    
    error: "Erro",
    select: "Selecione",
  },
  "/fr/": {
    loading: "Chargement...", 
    error: "Erreur",   
    select: "Choisir",
  }
}

export  const getTranslationGeneralWords = (languajeChoose: string, key: string): string => {
  const currentLanguage = getCurrentLanguage(languajeChoose)
  return translationGeneralWords[currentLanguage][key] || key
}

export const translationCreateProject = {
  "/en/": {
    titleWellcome: "Welcome to your",
    subtitleWellcome: "E-commerce of the Future",
    editProject: "Edit project",
    previewProject: "Preview project",
    titleStage1: "Welcome to the customized ecommerce creation",
    subtitleStage1: "Start your journey to digital success in minutes",
    nameEcommerceStage1: "Name of your online store or project",
    placeholderNameEcommerceStage1: "My store",
    activityEcommerceStage1: "Description of your economic activity",
    placeholderActivityEcommerceStage1: "We are a company dedicated to e-commerce of technological products, etc...",
    languagePageStage1: "Language of your platform",
    placeholderLanguagePageStage1: "Select a language",
    languageEsPageStage1: "🇪🇸 Spanish",
    languageEnPageStage1: "🇺🇲 English",
    languagePtPageStage1: "🇵🇹 Portuguese",
    languageFrPageStage1: "🇫🇷 French",
    proofQuestionStage1: "Why create your ecommerce with us?",
    proofItem1Stage1: "Quick and easy setup",
    proofItem2Stage1: "Professional and customizable design",
    proofItem3Stage1: "Low and transparent costs",
    proofItem4Stage1: "Mobile-optimized, SEO and performance-focused",
    beginStage1: "Start your project",
    titleStage2: "Customization of Titles and Paragraphs",
    subtitleStage2:"Choose the best color options for your e-commerce",
    previewTitleStage2: "Preview Project Title",
    previewParagraphStage2: "This is an example of how paragraphs will look in your store with the selected color. Choosing the right colors enhances the user experience and reinforces your brand identity.",
    colorTitleStage2: "Color for Titles",
    colorParagraphStage2: "Color for Paragraphs",
    proofQuestionStage2: "Tips for Choosing Colors",
    proofItem1Stage2: "Use colors that reflect your brand's personality",
    proofItem2Stage2: "Ensure there is enough contrast for readability",
    proofItem3Stage2: "Consider accessibility for all users",
    backButtonStage2: "Back",
    nextButtonStage2: "Next Customization",
    titleStage3: "Customization of Titles and Paragraphs",
    subtitleStage3: "Choose the Best Color Options for Your E-commerce",
    buttonExampleStage3: "Example button",
    titleBgButtonStage3: "Background color",
    subtitleBgButtonStage3: "The hover will be automatic",
    titleRoundedButtonStage3: "Corner rounding",
    titleShadowStage3: "Shadow",
    subtitleShadowStage3: "Hover will increase the shadow to",
    titleBorderStage3: "Border",
  },
  "/es/": {
    titleWellcome: "Bienvenido a tu",
    subtitleWellcome: "Comercio electrónico del Futuro",
    editProject: "Editar proyecto",
    previewProject: "Previsualizar proyecto",
    titleStage1: "Bienvenido a la creación personalizada del ecommerce",
    subtitleStage1: "Comienza tu viaje hacia el éxito digital en minutos",
    nameEcommerceStage1: "Nombre de su comercio electrónico o proyecto",
    placeholderNameEcommerceStage1: "Mi comercio",
    activityEcommerceStage1: "Descripción de su actividad económica",
    placeholderActivityEcommerceStage1: "Somos una empresa dedicada al comercio electrónico de productos tecnológicos, etc...",
    languagePageStage1: "Idioma de su plataforma",
    placeholderLanguagePageStage1: "Seleccione un idioma",
    languageEsPageStage1: "🇪🇸 Español",
    languageEnPageStage1: "🇺🇲 Inglés",
    languagePtPageStage1: "🇵🇹 Portugués",
    languageFrPageStage1: "🇫🇷 Francés",
    proofQuestionStage1: "¿Por qué crear su ecommerce con nosotros?",
    proofItem1Stage1: "Configuración rápida y sencilla",
    proofItem2Stage1: "Diseño profesional y personalizable",
    proofItem3Stage1: "Costos bajos y transparentes",
    proofItem4Stage1: "Optimizado para dispositivos móviles, enfocado en SEO y performance",
    beginStage1: "Empezar su proyecto",
    titleStage2: "Personalización de títulos y párrafos",
    subtitleStage2: "Escoge la mejor opción de colores para su comercio electrónico",
    titlePrevieStage2: "Previsualización de títulos y párrafos",
    previewTitleStage2: "Vista previa de título",
    previewParagraphStage2: "Este es un ejemplo de cómo se verán los párrafos en su tienda con el color seleccionado. La elección de colores adecuados mejora la experiencia de usuario y refuerza su identidad de marca.",
    colorTitleStage2: "Color para títulos",
    colorParagraphStage2: "Color para párrafos",
    proofQuestionStage2:"Consejos para elegir colores",
    proofItem1Stage2: "Use colores que reflejen la personalidad de su marca",
    proofItem2Stage2: "Asegúrese de que haya suficiente contraste para la legibilidad",
    proofItem3Stage2: "Considere la accesibilidad para todos los usuarios",
    backButtonStage2: "Atrás",
    nextButtonStage2: "Siguiente personalización",
    titleStage3: "Personalización de títulos y párrafos",
    subtitleStage3: "Escoge la mejor opción de colores para su comercio electrónico",
    buttonExampleStage3: "Botón de ejemplo",
    titleBgButtonStage3: "Color de fondo",
    subtitleBgButtonStage3: "El hover será automáticamente",
    titleRoundedButtonStage3: "Redondeo de esquinas",
    titleShadowStage3: "Sombra",
    subtitleShadowStage3: "El hover aumentará la sombra a",
    titleBorderStage3: "Borde",
  },
  "/pt/": {
    titleWellcome: "Bem-vindo ao seu",
    subtitleWellcome: "Comércio eletrônico do Futuro",
    editProject: "Editar projeto",
    previewProject: "Pré-visualizar projeto",
    titleStage1: "Bem-vindo à criação personalizada do e-commerce",
    subtitleStage1: "Comece sua jornada para o sucesso digital em minutos",
    nameEcommerceStage1: "Nome da sua loja virtual ou projeto",
    placeholderNameEcommerceStage1: "Minha loja",
    activityEcommerceStage1: "Descrição da sua atividade econômica",
    placeholderActivityEcommerceStage1: "Somos uma empresa dedicada ao comércio eletrônico de produtos tecnológicos, etc...",
    languagePageStage1: "Idioma da sua plataforma",
    placeholderLanguagePageStage1: "Selecione um idioma",
    languageEsPageStage1: "🇪🇸 Espanhol",
    languageEnPageStage1: "🇺🇲 Inglês",
    languagePtPageStage1: "🇵🇹 Português",
    languageFrPageStage1: "🇫🇷 Francês",
    proofQuestionStage1: "Por que criar seu e-commerce conosco?",
    proofItem1Stage1: "Configuração rápida e fácil",
    proofItem2Stage1: "Design profissional e personalizável",
    proofItem3Stage1: "Custos baixos e transparentes",
    proofItem4Stage1: "Otimizado para dispositivos móveis, focado em SEO e desempenho",
    beginStage1: "Iniciar seu projeto",
    titleStage2: "Personalização de títulos e parágrafos",
    subtitleStage2: "Escolha as melhores opções de cores para o seu comércio eletrônico",
    previewTitleStage2: "Pré-visualização do Título do Projeto",
    previewParagraphStage2: "Este é um exemplo de como os parágrafos aparecerão em sua loja com a cor selecionada. A escolha das cores certas melhora a experiência do usuário e reforça a identidade da sua marca.",
    colorTitleStage2: "Cor para Títulos",
    colorParagraphStage2: "Cor para Parágrafos",
    proofQuestionStage2: "Dicas para Escolher Cores",
    proofItem1Stage2: "Use cores que reflitam a personalidade da sua marca",
    proofItem2Stage2: "Garanta contraste suficiente para a legibilidade",
    proofItem3Stage2: "Considere a acessibilidade para todos os usuários",
    backButtonStage2: "Voltar",
    nextButtonStage2: "Próxima Personalização",
    titleStage3: "Personalização de Títulos e Parágrafos",
    subtitleStage3: "Escolha as Melhores Opções de Cores para o seu E-commerce",
    buttonExampleStage3: "Botão de exemplo",
    titleBgButtonStage3: "Cor de fundo",
    subtitleBgButtonStage3: "O hover será automático",
    titleRoundedButtonStage3: "Arredondamento de cantos",
    titleShadowStage3: "Sombra",
    subtitleShadowStage3: "O hover aumentará a sombra para",
    titleBorderStage3: "Borda",
  },
  "/fr/": {
    titleWellcome: "Bienvenue à votre",
    subtitleWellcome: "Commerce électronique du Futur",
    editProject: "Modifier le projet",
    previewProject: "Aperçu du projet",
    titleStage1: "Bienvenue dans la création personnalisée de votre e-commerce",
    subtitleStage1: "Commencez votre voyage vers le succès numérique en quelques minutes",
    nameEcommerceStage1: "Nom de votre boutique en ligne ou projet",
    placeholderNameEcommerceStage1: "Ma boutique",
    activityEcommerceStage1: "Description de votre activité économique",
    placeholderActivityEcommerceStage1: "Nous sommes une entreprise dédiée au commerce électronique de produits technologiques, etc...",
    languagePageStage1: "Langue de votre plateforme",
    placeholderLanguagePageStage1: "Choisissez une langue",
    languageEsPageStage1: "🇪🇸 Espagnol",
    languageEnPageStage1: "🇺🇲 Anglais",
    languagePtPageStage1: "🇵🇹 Portugais",
    languageFrPageStage1: "🇫🇷 Français",
    proofQuestionStage1: "Pourquoi créer votre e-commerce avec nous ?",
    proofItem1Stage1: "Configuration rapide et facile",
    proofItem2Stage1: "Design professionnel et personnalisable",
    proofItem3Stage1: "Coûts bas et transparents",
    proofItem4Stage1: "Optimisé pour les appareils mobiles, axé sur le SEO et la performance",
    beginStage1: "Commencer votre projet",
    titleStage2: "Personnalisation des titres et paragraphes",
    subtitleStage2: "Choisissez les meilleures options de couleurs pour votre commerce électronique",
    previewTitleStage2: "Aperçu du Titre du Projet",
    previewParagraphStage2: "Ceci est un exemple de l'apparence des paragraphes dans votre boutique avec la couleur sélectionnée. Le choix des bonnes couleurs améliore l'expérience utilisateur et renforce l'identité de votre marque.",
    colorTitleStage2: "Couleur pour les Titres",
    colorParagraphStage2: "Couleur pour les Paragraphes",
    proofQuestionStage2: "Conseils pour Choisir les Couleurs",
    proofItem1Stage2: "Utilisez des couleurs qui reflètent la personnalité de votre marque",
    proofItem2Stage2: "Assurez-vous qu'il y ait suffisamment de contraste pour la lisibilité",
    proofItem3Stage2: "Tenez compte de l'accessibilité pour tous les utilisateurs",
    backButtonStage2: "Retour",
    nextButtonStage2: "Personnalisation Suivante",
    titleStage3: "Personnalisation des Titres et Paragraphes",
    subtitleStage3: "Choisissez les Meilleures Options de Couleurs pour Votre E-commerce",
    buttonExampleStage3: "Bouton d'exemple",
    titleBgButtonStage3: "Couleur de fond",
    subtitleBgButtonStage3: "Le hover sera automatique",
    titleRoundedButtonStage3: "Arrondi des coins",
    titleShadowStage3: "Ombre",
    subtitleShadowStage3: "Le hover augmentera l'ombre à",
    titleBorderStage3: "Bordure",
  }
}

export  const getTranslationCreateProject = (languajeChoose: string, key: string): string => {
  const currentLanguage = getCurrentLanguage(languajeChoose)
  return translationCreateProject[currentLanguage][key] || key
}
            
export const generalConfig = {
  idioma: "/es/",
  name: company.name,
  principalColorTitles:company.principalColorTitles,
  principalColorParrafos:company.principalColorParrafos,
  NavBar: {
    nameCompany: company.name,
    logoCompany: ImagenCompany,
    linksPages: [
      { href: "/descargar", id:"downloadApp", text: getTranslation("/es/","downloadApp"), 
        icon: "bi-box-arrow-in-down",  active: false,
        path1:pathsIconos.path1downloadApp,
        path2:pathsIconos.path2downloadApp
      },
      { href: "/", id: "home", text: getTranslation("/es/","home"), 
        icon: "bi-house-door-fill", active: true,
        path1:pathsIconos.path1home,
        path2:pathsIconos.path2home
      },
      { href: "/productos", id: "products", text: getTranslation("/es/","products"), 
        icon: "bi-box-seam", active: true,
        path1:pathsIconos.path1products,
        path2:pathsIconos.path2products
      },
      { href: "/servicios", id: "services", text: getTranslation("/es/","services"), 
        icon: "bi-tools", active: false,
        path1:pathsIconos.path1services,
        path2:pathsIconos.path2services
      },
      { href: "/fotos", id: "photos", text: getTranslation("/es/","photos"), 
        icon: "bi-tools", active: true,
        path1:pathsIconos.path1photos,
        path2:pathsIconos.path2photos
      },
      { href: "/publicaciones", id: "publications", text: getTranslation("/es/","photos"), 
        icon: "bi-journal-text", active: false,
        path1:pathsIconos.path1publications,
        path2:pathsIconos.path2publications
      },
      { href: "/eventos", id: "events", text: getTranslation("/es/","events"), 
        icon: "bi-calendar-event", active: false,
        path1:pathsIconos.path1events,
        path2:pathsIconos.path2events
      },
      { href: "/citas", id: "quotes", text: getTranslation("/es/","quotes"), 
        icon: "bi-calendar-event", active: false,
        path1:pathsIconos.path1quotes,
        path2:pathsIconos.path2quotes
      },
      { href: "/reservas", id: "reservations", text: getTranslation("/es/","reservations"), 
        icon: "bi-calendar-event", active: false,
        path1:pathsIconos.path1reservations,
        path2:pathsIconos.path2reservations
      },
      { href: "/nosotros",id: "us", text: getTranslation("/es/","us"), 
        icon: "bi-buildings-fill", active: false,
        path1:pathsIconos.path1us,
        path2:pathsIconos.path2us
      },
      { href: "/ubicacion", id:"location", text: getTranslation("/es/","location"), 
        icon: "bi-geo-fill", active: true,
        path1:pathsIconos.path1location,
        path2:pathsIconos.path2location
      },
      { href: "/contacto", id:"contact", text: getTranslation("/es/","contact"), 
        icon: "bi-chat-fill", active: false,
        path1:pathsIconos.path1contact,
        path2:pathsIconos.path2contact
      }
      ],
    },
  TagBar: {
    linksPages: [
      { href: "/descargar", id:"downloadApp", text: getTranslation("/es/","downloadApp"), 
        icon: "bi-box-arrow-in-down",  active: false,
        path1:pathsIconos.path1downloadApp,
        path2:pathsIconos.path2downloadApp
      },
      { href: "/", id: "home", text: getTranslation("/es/","home"), 
        icon: "bi-house-door-fill", active: true,
        path1:pathsIconos.path1home,
        path2:pathsIconos.path2home
      },
      { href: "/productos", id: "products", text: getTranslation("/es/","products"), 
        icon: "bi-box-seam", active: true,
        path1:pathsIconos.path1products,
        path2:pathsIconos.path2products
      },
      { href: "/servicios", id: "services", text: getTranslation("/es/","services"), 
        icon: "bi-tools", active: false,
        path1:pathsIconos.path1services,
        path2:pathsIconos.path2services
      },
      { href: "/fotos", id: "photos", text: getTranslation("/es/","photos"), 
        icon: "bi-tools", active: true,
        path1:pathsIconos.path1photos,
        path2:pathsIconos.path2photos
      },
      { href: "/publicaciones", id: "publications", text: getTranslation("/es/","photos"), 
        icon: "bi-journal-text", active: false,
        path1:pathsIconos.path1publications,
        path2:pathsIconos.path2publications
      },
      { href: "/eventos", id: "events", text: getTranslation("/es/","events"), 
        icon: "bi-calendar-event", active: false,
        path1:pathsIconos.path1events,
        path2:pathsIconos.path2events
      },
      { href: "/citas", id: "quotes", text: getTranslation("/es/","quotes"), 
        icon: "bi-calendar-event", active: false,
        path1:pathsIconos.path1quotes,
        path2:pathsIconos.path2quotes
      },
      { href: "/reservas", id: "reservations", text: getTranslation("/es/","reservations"), 
        icon: "bi-calendar-event", active: false,
        path1:pathsIconos.path1reservations,
        path2:pathsIconos.path2reservations
      },
      { href: "/nosotros",id: "us", text: getTranslation("/es/","us"), 
        icon: "bi-buildings-fill", active: false,
        path1:pathsIconos.path1us,
        path2:pathsIconos.path2us
      },
      { href: "/ubicacion", id:"location", text: getTranslation("/es/","location"), 
        icon: "bi-geo-fill", active: true,
        path1:pathsIconos.path1location,
        path2:pathsIconos.path2location
      },
      { href: "/contacto", id:"contact", text: getTranslation("/es/","contact"), 
        icon: "bi-chat-fill", active: false,
        path1:pathsIconos.path1contact,
        path2:pathsIconos.path2contact
      },
      { href: "/crear", id:"crear", text: getTranslation("/es/","crear"), 
        icon: "bi-pencil-square", active: false,
        path1:pathsIconos.path1crear,
        path2:pathsIconos.path2crear
      }
      ],
  },
  GeneralMenu: {
    linksPages: [
      { href: "/descargar", id:"downloadApp", text: getTranslation("/es/","downloadApp"), 
        icon: "bi-box-arrow-in-down",  active: true,
        path1:pathsIconos.path1downloadApp,
        path2:pathsIconos.path2downloadApp
      },
      { href: "/lenguaje", id:"language", text: getTranslation("/es/","language"), 
        icon: "bi-box-arrow-in-down",  active: true,
        path1:pathsIconos.path1Language,
        path2:pathsIconos.path2Language
      },
      { href: "/", id: "home", text: getTranslation("/es/","home"), 
        icon: "bi-house-door-fill", active: true,
        path1:pathsIconos.path1home,
        path2:pathsIconos.path2home
      },
      { href: "/productos", id: "products", text: getTranslation("/es/","products"), 
        icon: "bi-box-seam", active: true,
        path1:pathsIconos.path1products,
        path2:pathsIconos.path2products
      },
      { href: "/servicios", id: "services", text: getTranslation("/es/","services"), 
        icon: "bi-tools", active: true,
        path1:pathsIconos.path1services,
        path2:pathsIconos.path2services
      },
      { href: "/fotos", id: "photos", text: getTranslation("/es/","photos"), 
        icon: "bi-tools", active: true,
        path1:pathsIconos.path1photos,
        path2:pathsIconos.path2photos
      },
      // { href: "/publicaciones", id: "publications", text: getTranslation("publications"), 
      //   icon: "bi-journal-text", active: true,
      //   path1:pathsIconos.path1publications,
      //   path2:pathsIconos.path2publications
      // },
      { href: "/eventos", id: "events", text: getTranslation("/es/","events"), 
        icon: "bi-calendar-event", active: true,
        path1:pathsIconos.path1events,
        path2:pathsIconos.path2events
      },
      { href: "/citas", id: "quotes", text: getTranslation("/es/","quotes"), 
        icon: "bi-calendar-event", active: true,
        path1:pathsIconos.path1quotes,
        path2:pathsIconos.path2quotes
      },
      { href: "/reservas", id: "reservations", text: getTranslation("/es/","reservations"), 
        icon: "bi-calendar-event", active: true,
        path1:pathsIconos.path1reservations,
        path2:pathsIconos.path2reservations
      },
      { href: "/nosotros",id: "us", text: getTranslation("/es/","us"), 
        icon: "bi-buildings-fill", active: true,
        path1:pathsIconos.path1us,
        path2:pathsIconos.path2us
      },
      { href: "/ubicacion", id:"location", text: getTranslation("/es/","location"), 
        icon: "bi-geo-fill", active: true,
        path1:pathsIconos.path1location,
        path2:pathsIconos.path2location
      },
      { href: "/contacto", id:"contact", text: getTranslation("/es/","contact"), 
        icon: "bi-chat-fill", active: true,
        path1:pathsIconos.path1contact,
        path2:pathsIconos.path2contact
      },
      { href: "/crear", id:"crear", text: getTranslation("/es/","crear"), 
        icon: "bi-pencil-square", active: true,
        path1:pathsIconos.path1crear,
        path2:pathsIconos.path2crear
      }
      ],

  },  
  Home:{
    Wellcome:{
      WellcomeActive: true, // Bienvenida activa o inactiva true o false
      colorBgSesion: "blue", // Color de fondo de la bienvenida red, blue, orange, yellow, lime, green, etc...
      urlImgBgSesion: "/bgSesion1.svg",// /bgSesion1.svg, /bgSesion2.svg, /bgSesion3.svg etc... quedan en public
      WellcomeTypePosition: "vertical", // estilo "vertical", "horizontal"
      Wellcome: getTranslationHomeWelcome("/es/","Wellcome"), // Bienvenido traducido en todos los idiomas
      Company:company.name, // Nombre de la empresa
      DescriptionWellcome:getTranslationHomeWelcome("/es/","DescriptionWellcome"), // Descripción de la empresa traducida
      ImagenGrandeAvif:  ImagenGrandeAvif, // Imagen grande de la empresa de Bienvenida
      ImagenGrandeWebp: ImagenGrandeWebp,  // 16:9 grande -> 1024 × 576 px -> 600 × 338 px 
      ImagenGrandeJpg: ImagenGrandeJpg,
      ImagenMedianaAvif: ImagenMedianaAvif,
      ImagenMedianaWebp: ImagenMedianaWebp,
      ImagenMedianaJpg: ImagenMedianaJpg
    },
    homeProducts:{
      homeProductsActive: true, // Inicio productos activa o inactiva true o false
    },
    homeServices:{
      title:getTranslationHomeServices("/es/","title"),
    }
  },
  Create: {
    wellcome:{
      es: {
        titleWellcome: getTranslationCreateProject("/es/","titleWellcome"),
        subtitleWellcome: getTranslationCreateProject("/es/","subtitleWellcome"),
      },
      en: {
        titleWellcome: getTranslationCreateProject("/en/","titleWellcome"),
        subtitleWellcome: getTranslationCreateProject("/en/","subtitleWellcome"),
      },
      pt: {
        titleWellcome: getTranslationCreateProject("/pt/","titleWellcome"),
        subtitleWellcome: getTranslationCreateProject("/pt/","subtitleWellcome"),
      },
      fr: {
        titleWellcome: getTranslationCreateProject("/fr/","titleWellcome"),
        subtitleWellcome: getTranslationCreateProject("/fr/","subtitleWellcome"),
      },
    },
    previewProject:{
      es:{
        editProject: getTranslationCreateProject("/es/","editProject"),
        previewProject: getTranslationCreateProject("/es/","previewProject")
      },
      en:{
        editProject: getTranslationCreateProject("/en/","editProject"),
        previewProject: getTranslationCreateProject("/en/","previewProject")
      },
      pt:{
        editProject: getTranslationCreateProject("/pt/","editProject"),
        previewProject: getTranslationCreateProject("/pt/","previewProject")
      },
      fr:{
        editProject: getTranslationCreateProject("/fr/","editProject"),
        previewProject: getTranslationCreateProject("/fr/","previewProject")
      },      
    },
    stage:"Etapa",
    stage1: {
      es: {
        titleStage1: getTranslationCreateProject("/es/", "titleStage1"),
        subtitleStage1: getTranslationCreateProject("/es/", "subtitleStage1"),
        nameEcommerceStage1: getTranslationCreateProject("/es/", "nameEcommerceStage1"),
        placeholderNameEcommerceStage1: getTranslationCreateProject("/es/", "placeholderNameEcommerceStage1"),
        activityEcommerceStage1: getTranslationCreateProject("/es/", "activityEcommerceStage1"),
        placeholderActivityEcommerceStage1: getTranslationCreateProject("/es/", "placeholderActivityEcommerceStage1"),
        languagePageStage1: getTranslationCreateProject("/es/", "languagePageStage1"),
        placeholderLanguagePageStage1: getTranslationCreateProject("/es/", "placeholderLanguagePageStage1"),
        languageEsPageStage1: getTranslationCreateProject("/es/", "languageEsPageStage1"),
        languageEnPageStage1: getTranslationCreateProject("/es/", "languageEnPageStage1"),
        languagePtPageStage1: getTranslationCreateProject("/es/", "languagePtPageStage1"),
        languageFrPageStage1: getTranslationCreateProject("/es/", "languageFrPageStage1"),
        proofQuestionStage1: getTranslationCreateProject("/es/", "proofQuestionStage1"),
        proofItem1Stage1: getTranslationCreateProject("/es/", "proofItem1Stage1"),
        proofItem2Stage1: getTranslationCreateProject("/es/", "proofItem2Stage1"),
        proofItem3Stage1: getTranslationCreateProject("/es/", "proofItem3Stage1"),
        proofItem4Stage1: getTranslationCreateProject("/es/", "proofItem4Stage1"),
        beginStage1: getTranslationCreateProject("/es/", "beginStage1"),
      },
      en: {
        titleStage1: getTranslationCreateProject("/en/", "titleStage1"),
        subtitleStage1: getTranslationCreateProject("/en/", "subtitleStage1"),
        nameEcommerceStage1: getTranslationCreateProject("/en/", "nameEcommerceStage1"),
        placeholderNameEcommerceStage1: getTranslationCreateProject("/en/", "placeholderNameEcommerceStage1"),
        activityEcommerceStage1: getTranslationCreateProject("/en/", "activityEcommerceStage1"),
        placeholderActivityEcommerceStage1: getTranslationCreateProject("/en/", "placeholderActivityEcommerceStage1"),
        languagePageStage1: getTranslationCreateProject("/en/", "languagePageStage1"),
        placeholderLanguagePageStage1: getTranslationCreateProject("/en/", "placeholderLanguagePageStage1"),
        languageEsPageStage1: getTranslationCreateProject("/en/", "languageEsPageStage1"),
        languageEnPageStage1: getTranslationCreateProject("/en/", "languageEnPageStage1"),
        languagePtPageStage1: getTranslationCreateProject("/en/", "languagePtPageStage1"),
        languageFrPageStage1: getTranslationCreateProject("/en/", "languageFrPageStage1"),
        proofQuestionStage1: getTranslationCreateProject("/en/", "proofQuestionStage1"),
        proofItem1Stage1: getTranslationCreateProject("/en/", "proofItem1Stage1"),
        proofItem2Stage1: getTranslationCreateProject("/en/", "proofItem2Stage1"),
        proofItem3Stage1: getTranslationCreateProject("/en/", "proofItem3Stage1"),
        proofItem4Stage1: getTranslationCreateProject("/en/", "proofItem4Stage1"),
        beginStage1: getTranslationCreateProject("/en/", "beginStage1"),
      },
      pt: {
        titleStage1: getTranslationCreateProject("/pt/", "titleStage1"),
        subtitleStage1: getTranslationCreateProject("/pt/", "subtitleStage1"),
        nameEcommerceStage1: getTranslationCreateProject("/pt/", "nameEcommerceStage1"),
        placeholderNameEcommerceStage1: getTranslationCreateProject("/pt/", "placeholderNameEcommerceStage1"),
        activityEcommerceStage1: getTranslationCreateProject("/pt/", "activityEcommerceStage1"),
        placeholderActivityEcommerceStage1: getTranslationCreateProject("/pt/", "placeholderActivityEcommerceStage1"),
        languagePageStage1: getTranslationCreateProject("/pt/", "languagePageStage1"),
        placeholderLanguagePageStage1: getTranslationCreateProject("/pt/", "placeholderLanguagePageStage1"),
        languageEsPageStage1: getTranslationCreateProject("/pt/", "languageEsPageStage1"),
        languageEnPageStage1: getTranslationCreateProject("/pt/", "languageEnPageStage1"),
        languagePtPageStage1: getTranslationCreateProject("/pt/", "languagePtPageStage1"),
        languageFrPageStage1: getTranslationCreateProject("/pt/", "languageFrPageStage1"),
        proofQuestionStage1: getTranslationCreateProject("/pt/", "proofQuestionStage1"),
        proofItem1Stage1: getTranslationCreateProject("/pt/", "proofItem1Stage1"),
        proofItem2Stage1: getTranslationCreateProject("/pt/", "proofItem2Stage1"),
        proofItem3Stage1: getTranslationCreateProject("/pt/", "proofItem3Stage1"),
        proofItem4Stage1: getTranslationCreateProject("/pt/", "proofItem4Stage1"),
        beginStage1: getTranslationCreateProject("/pt/", "beginStage1"),
      },
      fr: {
        titleStage1: getTranslationCreateProject("/fr/", "titleStage1"),
        subtitleStage1: getTranslationCreateProject("/fr/", "subtitleStage1"),
        nameEcommerceStage1: getTranslationCreateProject("/fr/", "nameEcommerceStage1"),
        placeholderNameEcommerceStage1: getTranslationCreateProject("/fr/", "placeholderNameEcommerceStage1"),
        activityEcommerceStage1: getTranslationCreateProject("/fr/", "activityEcommerceStage1"),
        placeholderActivityEcommerceStage1: getTranslationCreateProject("/fr/", "placeholderActivityEcommerceStage1"),
        languagePageStage1: getTranslationCreateProject("/fr/", "languagePageStage1"),
        placeholderLanguagePageStage1: getTranslationCreateProject("/fr/", "placeholderLanguagePageStage1"),
        languageEsPageStage1: getTranslationCreateProject("/fr/", "languageEsPageStage1"),
        languageEnPageStage1: getTranslationCreateProject("/fr/", "languageEnPageStage1"),
        languagePtPageStage1: getTranslationCreateProject("/fr/", "languagePtPageStage1"),
        languageFrPageStage1: getTranslationCreateProject("/fr/", "languageFrPageStage1"),
        proofQuestionStage1: getTranslationCreateProject("/fr/", "proofQuestionStage1"),
        proofItem1Stage1: getTranslationCreateProject("/fr/", "proofItem1Stage1"),
        proofItem2Stage1: getTranslationCreateProject("/fr/", "proofItem2Stage1"),
        proofItem3Stage1: getTranslationCreateProject("/fr/", "proofItem3Stage1"),
        proofItem4Stage1: getTranslationCreateProject("/fr/", "proofItem4Stage1"),
        beginStage1: getTranslationCreateProject("/fr/", "beginStage1"),
      }
    },
    stage2: {
      es: {
        titleStage2: getTranslationCreateProject("/es/", "titleStage2"),
        subtitleStage2: getTranslationCreateProject("/es/", "subtitleStage2"),
        previewTitleStage2: getTranslationCreateProject("/es/", "previewTitleStage2"),
        previewParagraphStage2: getTranslationCreateProject("/es/", "previewParagraphStage2"),
        colorTitleStage2: getTranslationCreateProject("/es/", "colorTitleStage2"),
        colorParagraphStage2: getTranslationCreateProject("/es/", "colorParagraphStage2"),  
        proofQuestionStage2: getTranslationCreateProject("/es/", "proofQuestionStage2"),
        proofItem1Stage2: getTranslationCreateProject("/es/", "proofItem1Stage2"),
        proofItem2Stage2: getTranslationCreateProject("/es/", "proofItem2Stage2"),
        proofItem3Stage2: getTranslationCreateProject("/es/", "proofItem3Stage2"), 
        backButtonStage2: getTranslationCreateProject("/es/", "backButtonStage2"),
        nextButtonStage2: getTranslationCreateProject("/es/", "nextButtonStage2"),     
      },
      en: {
        titleStage2: getTranslationCreateProject("/en/", "titleStage2"),
        subtitleStage2: getTranslationCreateProject("/en/", "subtitleStage2"),
        previewTitleStage2: getTranslationCreateProject("/en/", "previewTitleStage2"),
        previewParagraphStage2: getTranslationCreateProject("/en/", "previewParagraphStage2"),
        colorTitleStage2: getTranslationCreateProject("/en/", "colorTitleStage2"),
        colorParagraphStage2: getTranslationCreateProject("/en/", "colorParagraphStage2"), 
        proofQuestionStage2: getTranslationCreateProject("/en/", "proofQuestionStage2"),
        proofItem1Stage2: getTranslationCreateProject("/en/", "proofItem1Stage2"),
        proofItem2Stage2: getTranslationCreateProject("/en/", "proofItem2Stage2"),
        proofItem3Stage2: getTranslationCreateProject("/en/", "proofItem3Stage2"),
        backButtonStage2: getTranslationCreateProject("/en/", "backButtonStage2"),
        nextButtonStage2: getTranslationCreateProject("/en/", "nextButtonStage2"),
      },
      pt: {
        titleStage2: getTranslationCreateProject("/pt/", "titleStage2"),
        subtitleStage2: getTranslationCreateProject("/pt/", "subtitleStage2"),
        previewTitleStage2: getTranslationCreateProject("/pt/", "previewTitleStage2"),
        previewParagraphStage2: getTranslationCreateProject("/pt/", "previewParagraphStage2"),
        colorTitleStage2: getTranslationCreateProject("/pt/", "colorTitleStage2"),
        colorParagraphStage2: getTranslationCreateProject("/pt/", "colorParagraphStage2"), 
        proofQuestionStage2: getTranslationCreateProject("/pt/", "proofQuestionStage2"),
        proofItem1Stage2: getTranslationCreateProject("/pt/", "proofItem1Stage2"),
        proofItem2Stage2: getTranslationCreateProject("/pt/", "proofItem2Stage2"),
        proofItem3Stage2: getTranslationCreateProject("/pt/", "proofItem3Stage2"),
        backButtonStage2: getTranslationCreateProject("/pt/", "backButtonStage2"),
        nextButtonStage2: getTranslationCreateProject("/pt/", "nextButtonStage2"),
      },
      fr: {
        titleStage2: getTranslationCreateProject("/fr/", "titleStage2"),
        subtitleStage2: getTranslationCreateProject("/fr/", "subtitleStage2"),
        previewTitleStage2: getTranslationCreateProject("/fr/", "previewTitleStage2"),
        previewParagraphStage2: getTranslationCreateProject("/fr/", "previewParagraphStage2"),
        colorTitleStage2: getTranslationCreateProject("/fr/", "colorTitleStage2"),
        colorParagraphStage2: getTranslationCreateProject("/fr/", "colorParagraphStage2"), 
        proofQuestionStage2: getTranslationCreateProject("/fr/", "proofQuestionStage2"),
        proofItem1Stage2: getTranslationCreateProject("/fr/", "proofItem1Stage2"),
        proofItem2Stage2: getTranslationCreateProject("/fr/", "proofItem2Stage2"),
        proofItem3Stage2: getTranslationCreateProject("/fr/", "proofItem3Stage2"),
        backButtonStage2: getTranslationCreateProject("/fr/", "backButtonStage2"),
        nextButtonStage2: getTranslationCreateProject("/fr/", "nextButtonStage2"),
      }
    },  
    stage3: {
      es: {
        titleStage3: getTranslationCreateProject("/es/", "titleStage3"),
        subtitleStage3: getTranslationCreateProject("/es/", "subtitleStage3"),
        buttonExampleStage3: getTranslationCreateProject("/es/", "buttonExampleStage3"),
        titleBgButtonStage3: getTranslationCreateProject("/es/", "titleBgButtonStage3"),
        subtitleBgButtonStage3: getTranslationCreateProject("/es/", "subtitleBgButtonStage3"),
        titleRoundedButtonStage3: getTranslationCreateProject("/es/", "titleRoundedButtonStage3"),
        titleShadowStage3: getTranslationCreateProject("/es/", "titleShadowStage3"),
        subtitleShadowStage3: getTranslationCreateProject("/es/", "subtitleShadowStage3"),
        titleBorderStage3: getTranslationCreateProject("/es/", "titleBorderStage3"),
      },
      en: {
        titleStage3: getTranslationCreateProject("/en/", "titleStage3"),
        subtitleStage3: getTranslationCreateProject("/en/", "subtitleStage3"),
        buttonExampleStage3: getTranslationCreateProject("/en/", "buttonExampleStage3"),
        titleBgButtonStage3: getTranslationCreateProject("/en/", "titleBgButtonStage3"),
        subtitleBgButtonStage3: getTranslationCreateProject("/en/", "subtitleBgButtonStage3"),
        titleRoundedButtonStage3: getTranslationCreateProject("/en/", "titleRoundedButtonStage3"),
        titleShadowStage3: getTranslationCreateProject("/en/", "titleShadowStage3"),
        subtitleShadowStage3: getTranslationCreateProject("/en/", "subtitleShadowStage3"),
        titleBorderStage3: getTranslationCreateProject("/en/", "titleBorderStage3"),
      },
      pt: {
        titleStage3: getTranslationCreateProject("/pt/", "titleStage3"),
        subtitleStage3: getTranslationCreateProject("/pt/", "subtitleStage3"),
        buttonExampleStage3: getTranslationCreateProject("/pt/", "buttonExampleStage3"),
        titleBgButtonStage3: getTranslationCreateProject("/pt/", "titleBgButtonStage3"),
        subtitleBgButtonStage3: getTranslationCreateProject("/pt/", "subtitleBgButtonStage3"),
        titleRoundedButtonStage3: getTranslationCreateProject("/pt/", "titleRoundedButtonStage3"),
        titleShadowStage3: getTranslationCreateProject("/pt/", "titleShadowStage3"),
        subtitleShadowStage3: getTranslationCreateProject("/pt/", "subtitleShadowStage3"),
        titleBorderStage3: getTranslationCreateProject("/pt/", "titleBorderStage3"),
      },
      fr: {
        titleStage3: getTranslationCreateProject("/fr/", "titleStage3"),
        subtitleStage3: getTranslationCreateProject("/fr/", "subtitleStage3"),
        buttonExampleStage3: getTranslationCreateProject("/fr/", "buttonExampleStage3"),
        titleBgButtonStage3: getTranslationCreateProject("/fr/", "titleBgButtonStage3"),
        subtitleBgButtonStage3: getTranslationCreateProject("/fr/", "subtitleBgButtonStage3"),
        titleRoundedButtonStage3: getTranslationCreateProject("/fr/", "titleRoundedButtonStage3"),
        titleShadowStage3: getTranslationCreateProject("/fr/", "titleShadowStage3"),
        subtitleShadowStage3: getTranslationCreateProject("/fr/", "subtitleShadowStage3"),
        titleBorderStage3: getTranslationCreateProject("/fr/", "titleBorderStage3"),
      }
    }     
  },
  Language: {
    es:{
            selectLanguage: getTranslationLanguage("/es/","titleSelectLanguage"),
            currentLanguage: getTranslationLanguage("/es/","currentLanguage"),
            spanish: getTranslationLanguage("/es/","spanish"),
            english: getTranslationLanguage("/es/","english"),
            portuguese: getTranslationLanguage("/es/","portuguese"),
            french: getTranslationLanguage("/es/","french"),
            requiredSelect: getTranslationLanguage("/es/","requiredSelect"),
            changeSelect: getTranslationLanguage("/es/","changeSelect"),
        },
    en: {
            selectLanguage: getTranslationLanguage("/en/","titleSelectLanguage"),
            currentLanguage: getTranslationLanguage("/en/","currentLanguage"),
            spanish: getTranslationLanguage("/en/","spanish"),
            english: getTranslationLanguage("/en/","english"),
            portuguese: getTranslationLanguage("/en/","portuguese"),
            french: getTranslationLanguage("/en/","french"),
            requiredSelect: getTranslationLanguage("/en/","requiredSelect"),
            changeSelect: getTranslationLanguage("/en/","changeSelect"),
        },
    pt: {
            selectLanguage: getTranslationLanguage("/pt/","titleSelectLanguage"),
            currentLanguage: getTranslationLanguage("/pt/","currentLanguage"),
            spanish: getTranslationLanguage("/pt/","spanish"),
            english: getTranslationLanguage("/pt/","english"),
            portuguese: getTranslationLanguage("/pt/","portuguese"),
            french: getTranslationLanguage("/pt/","french"),
            requiredSelect: getTranslationLanguage("/pt/","requiredSelect"),
            changeSelect: getTranslationLanguage("/pt/","changeSelect"),
        },
    fr: {
            selectLanguage: getTranslationLanguage("/fr/","titleSelectLanguage"),
            currentLanguage: getTranslationLanguage("/fr/","currentLanguage"),
            spanish: getTranslationLanguage("/fr/","spanish"),
            english: getTranslationLanguage("/fr/","english"),
            portuguese: getTranslationLanguage("/fr/","portuguese"),
            french: getTranslationLanguage("/fr/","french"),
            requiredSelect: getTranslationLanguage("/fr/","requiredSelect"),
            changeSelect: getTranslationLanguage("/fr/","changeSelect"),
        },
  },
  GeneralWords:{
      es: {
          loading: getTranslationGeneralWords("/es/","loading"),
          error: getTranslationGeneralWords("/es/","error"),
          select: getTranslationGeneralWords("/es/","select"),
      },
      en: {
          loading: getTranslationGeneralWords("/en/","loading"),
          error: getTranslationGeneralWords("/en/","error"),
          select: getTranslationGeneralWords("/en/","select"),
      },
      pt: {
          loading: getTranslationGeneralWords("/pt/","loading"),
          error: getTranslationGeneralWords("/pt/","error"),
          select: getTranslationGeneralWords("/pt/","select"),
      },
      fr: {
          loading: getTranslationGeneralWords("/fr/","loading"),
          error: getTranslationGeneralWords("/fr/","error"),
          select: getTranslationGeneralWords("/fr/","select"),
      },
  },
  GeneralSettings: {
      ButtonGeneralClass:"bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
      TitleGeneralClass:"text-2xl font-bold mb-4",
      ParagrathGeneralClass:"text-lg mb-2",
  },  
  GoogleAuth: {
    clientId: '389059903936-crh2qopn8c163qlk9ucfspglb6uep88o.apps.googleusercontent.com'
  },
}

