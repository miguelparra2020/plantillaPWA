import ImagenCompany from '@img/user.png';
import ImagenGrandeAvif from '@img/inicio/imagen-grande-bienvenida.avif'
import ImagenGrandeWebp from '@img/inicio/imagen-grande-bienvenida.webp'
import ImagenGrandeJpg from '@img/inicio/imagen-grande-bienvenida.jpg'
import ImagenMedianaAvif from '@img/inicio/imagen-mediana-bienvenida.avif'
import ImagenMedianaWebp from '@img/inicio/imagen-mediana-bienvenida.webp'
import ImagenMedianaJpg from '@img/inicio/imagen-mediana-bienvenida.jpg'


 // Colores principales
  // red       50 100 200 300 400 500 600 700 800 900 950
  // orange    50 100 200 300 400 500 600 700 800 900 950
  // amber     50 100 200 300 400 500 600 700 800 900 950
  // yellow    50 100 200 300 400 500 600 700 800 900 950
  // lime      50 100 200 300 400 500 600 700 800 900 950
  // green     50 100 200 300 400 500 600 700 800 900 950
  // emerald   50 100 200 300 400 500 600 700 800 900 950
  // teal      50 100 200 300 400 500 600 700 800 900 950
  // cyan      50 100 200 300 400 500 600 700 800 900 950
  // sky       50 100 200 300 400 500 600 700 800 900 950
  // blue      50 100 200 300 400 500 600 700 800 900 950
  // indigo    50 100 200 300 400 500 600 700 800 900 950
  // violet    50 100 200 300 400 500 600 700 800 900 950
  // purple    50 100 200 300 400 500 600 700 800 900 950
  // fuchsia   50 100 200 300 400 500 600 700 800 900 950
  // pink      50 100 200 300 400 500 600 700 800 900 950
  // rose      50 100 200 300 400 500 600 700 800 900 950
  // slate     50 100 200 300 400 500 600 700 800 900 950
  // gray      50 100 200 300 400 500 600 700 800 900 950
  // zinc      50 100 200 300 400 500 600 700 800 900 950
  // neutral   50 100 200 300 400 500 600 700 800 900 950
  // stone     50 100 200 300 400 500 600 700 800 900 950


// Configuraciones del comercio electrónico

// Idioma del proyecto
type Idioma = "/en/" | "/es/" | "/pt/" | "/fr/";
export const idioma: Idioma = "/es/"; //Idomas disponibles "/en/" (Inglés) , "/es/" (Español), "/pt/" (Português), "/fr/" (Frances)

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
  },
}
export const getTranslation = (key: string): string => {
  return translationsLinksPages[idioma][key] || key;
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
export  const getTranslationHomeWelcome = (key: string): string => {
  return translationHomeWellcome[idioma][key] || key;
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
export  const getTranslationHomeServices = (key: string): string => {
  return translationHomeServices[idioma][key] || key;
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

}
            

export const generalConfig = {
  idioma: idioma,
  name: company.name,
  principalColorTitles:company.principalColorTitles,
  principalColorParrafos:company.principalColorParrafos,
  NavBar: {
    nameCompany: company.name,
    logoCompany: ImagenCompany,
    linksPages: [
      { href: "/descargar", id:"downloadApp", text: getTranslation("downloadApp"), 
        icon: "bi-box-arrow-in-down",  active: false,
        path1:pathsIconos.path1downloadApp,
        path2:pathsIconos.path2downloadApp
      },
      { href: "/", id: "home", text: getTranslation("home"), 
        icon: "bi-house-door-fill", active: true,
        path1:pathsIconos.path1home,
        path2:pathsIconos.path2home
      },
      { href: "/productos", id: "products", text: getTranslation("products"), 
        icon: "bi-box-seam", active: true,
        path1:pathsIconos.path1products,
        path2:pathsIconos.path2products
      },
      { href: "/servicios", id: "services", text: getTranslation("services"), 
        icon: "bi-tools", active: false,
        path1:pathsIconos.path1services,
        path2:pathsIconos.path2services
      },
      { href: "/fotos", id: "photos", text: getTranslation("photos"), 
        icon: "bi-tools", active: true,
        path1:pathsIconos.path1photos,
        path2:pathsIconos.path2photos
      },
      { href: "/publicaciones", id: "publications", text: getTranslation("photos"), 
        icon: "bi-journal-text", active: false,
        path1:pathsIconos.path1publications,
        path2:pathsIconos.path2publications
      },
      { href: "/eventos", id: "events", text: getTranslation("events"), 
        icon: "bi-calendar-event", active: false,
        path1:pathsIconos.path1events,
        path2:pathsIconos.path2events
      },
      { href: "/citas", id: "quotes", text: getTranslation("quotes"), 
        icon: "bi-calendar-event", active: false,
        path1:pathsIconos.path1quotes,
        path2:pathsIconos.path2quotes
      },
      { href: "/reservas", id: "reservations", text: getTranslation("reservations"), 
        icon: "bi-calendar-event", active: false,
        path1:pathsIconos.path1reservations,
        path2:pathsIconos.path2reservations
      },
      { href: "/nosotros",id: "us", text: getTranslation("us"), 
        icon: "bi-buildings-fill", active: false,
        path1:pathsIconos.path1us,
        path2:pathsIconos.path2us
      },
      { href: "/ubicacion", id:"location", text: getTranslation("location"), 
        icon: "bi-geo-fill", active: true,
        path1:pathsIconos.path1location,
        path2:pathsIconos.path2location
      },
      { href: "/contacto", id:"contact", text: getTranslation("contact"), 
        icon: "bi-chat-fill", active: false,
        path1:pathsIconos.path1contact,
        path2:pathsIconos.path2contact
      }
      ],
    },
  TagBar: {
    linksPages: [
      { href: "/descargar", id:"downloadApp", text: getTranslation("downloadApp"), 
        icon: "bi-box-arrow-in-down",  active: false,
        path1:pathsIconos.path1downloadApp,
        path2:pathsIconos.path2downloadApp
      },
      { href: "/", id: "home", text: getTranslation("home"), 
        icon: "bi-house-door-fill", active: true,
        path1:pathsIconos.path1home,
        path2:pathsIconos.path2home
      },
      { href: "/productos", id: "products", text: getTranslation("products"), 
        icon: "bi-box-seam", active: true,
        path1:pathsIconos.path1products,
        path2:pathsIconos.path2products
      },
      { href: "/servicios", id: "services", text: getTranslation("services"), 
        icon: "bi-tools", active: false,
        path1:pathsIconos.path1services,
        path2:pathsIconos.path2services
      },
      { href: "/fotos", id: "photos", text: getTranslation("photos"), 
        icon: "bi-tools", active: true,
        path1:pathsIconos.path1photos,
        path2:pathsIconos.path2photos
      },
      { href: "/publicaciones", id: "publications", text: getTranslation("photos"), 
        icon: "bi-journal-text", active: false,
        path1:pathsIconos.path1publications,
        path2:pathsIconos.path2publications
      },
      { href: "/eventos", id: "events", text: getTranslation("events"), 
        icon: "bi-calendar-event", active: false,
        path1:pathsIconos.path1events,
        path2:pathsIconos.path2events
      },
      { href: "/citas", id: "quotes", text: getTranslation("quotes"), 
        icon: "bi-calendar-event", active: false,
        path1:pathsIconos.path1quotes,
        path2:pathsIconos.path2quotes
      },
      { href: "/reservas", id: "reservations", text: getTranslation("reservations"), 
        icon: "bi-calendar-event", active: false,
        path1:pathsIconos.path1reservations,
        path2:pathsIconos.path2reservations
      },
      { href: "/nosotros",id: "us", text: getTranslation("us"), 
        icon: "bi-buildings-fill", active: false,
        path1:pathsIconos.path1us,
        path2:pathsIconos.path2us
      },
      { href: "/ubicacion", id:"location", text: getTranslation("location"), 
        icon: "bi-geo-fill", active: true,
        path1:pathsIconos.path1location,
        path2:pathsIconos.path2location
      },
      { href: "/contacto", id:"contact", text: getTranslation("contact"), 
        icon: "bi-chat-fill", active: false,
        path1:pathsIconos.path1contact,
        path2:pathsIconos.path2contact
      },
      { href: "/crear", id:"crear", text: getTranslation("crear"), 
        icon: "bi-pencil-square", active: false,
        path1:pathsIconos.path1crear,
        path2:pathsIconos.path2crear
      }
      ],
  },
  GeneralMenu: {
    linksPages: [
      { href: "/descargar", id:"downloadApp", text: getTranslation("downloadApp"), 
        icon: "bi-box-arrow-in-down",  active: true,
        path1:pathsIconos.path1downloadApp,
        path2:pathsIconos.path2downloadApp
      },
      { href: "/", id: "home", text: getTranslation("home"), 
        icon: "bi-house-door-fill", active: true,
        path1:pathsIconos.path1home,
        path2:pathsIconos.path2home
      },
      { href: "/productos", id: "products", text: getTranslation("products"), 
        icon: "bi-box-seam", active: true,
        path1:pathsIconos.path1products,
        path2:pathsIconos.path2products
      },
      { href: "/servicios", id: "services", text: getTranslation("services"), 
        icon: "bi-tools", active: true,
        path1:pathsIconos.path1services,
        path2:pathsIconos.path2services
      },
      { href: "/fotos", id: "photos", text: getTranslation("photos"), 
        icon: "bi-tools", active: true,
        path1:pathsIconos.path1photos,
        path2:pathsIconos.path2photos
      },
      // { href: "/publicaciones", id: "publications", text: getTranslation("publications"), 
      //   icon: "bi-journal-text", active: true,
      //   path1:pathsIconos.path1publications,
      //   path2:pathsIconos.path2publications
      // },
      { href: "/eventos", id: "events", text: getTranslation("events"), 
        icon: "bi-calendar-event", active: true,
        path1:pathsIconos.path1events,
        path2:pathsIconos.path2events
      },
      { href: "/citas", id: "quotes", text: getTranslation("quotes"), 
        icon: "bi-calendar-event", active: true,
        path1:pathsIconos.path1quotes,
        path2:pathsIconos.path2quotes
      },
      { href: "/reservas", id: "reservations", text: getTranslation("reservations"), 
        icon: "bi-calendar-event", active: true,
        path1:pathsIconos.path1reservations,
        path2:pathsIconos.path2reservations
      },
      { href: "/nosotros",id: "us", text: getTranslation("us"), 
        icon: "bi-buildings-fill", active: true,
        path1:pathsIconos.path1us,
        path2:pathsIconos.path2us
      },
      { href: "/ubicacion", id:"location", text: getTranslation("location"), 
        icon: "bi-geo-fill", active: true,
        path1:pathsIconos.path1location,
        path2:pathsIconos.path2location
      },
      { href: "/contacto", id:"contact", text: getTranslation("contact"), 
        icon: "bi-chat-fill", active: true,
        path1:pathsIconos.path1contact,
        path2:pathsIconos.path2contact
      },
      { href: "/crear", id:"crear", text: getTranslation("crear"), 
        icon: "bi-pencil-square", active: true,
        path1:pathsIconos.path1crear,
        path2:pathsIconos.path2crear
      }
      ],

  },  
  // Configuración del Inicio
  Home:{
    Wellcome:{
      WellcomeActive: true, // Bienvenida activa o inactiva true o false
      colorBgSesion: "blue", // Color de fondo de la bienvenida red, blue, orange, yellow, lime, green, etc...
      urlImgBgSesion: "/bgSesion1.svg",// /bgSesion1.svg, /bgSesion2.svg, /bgSesion3.svg etc... quedan en public
      WellcomeTypePosition: "vertical", // estilo "vertical", "horizontal"
      Wellcome: getTranslationHomeWelcome("Wellcome"), // Bienvenido traducido en todos los idiomas
      Company:company.name, // Nombre de la empresa
      DescriptionWellcome:getTranslationHomeWelcome("DescriptionWellcome"), // Descripción de la empresa traducida
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
      title:getTranslationHomeServices("title"),
    }
  },
  Crear: {

  },
  GoogleAuth: {
    clientId: '389059903936-crh2qopn8c163qlk9ucfspglb6uep88o.apps.googleusercontent.com'
  },
}

