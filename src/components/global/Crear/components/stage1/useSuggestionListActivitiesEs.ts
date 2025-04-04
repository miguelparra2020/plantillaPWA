import { useMemo } from 'react'

// Lista de sectores
const sectors = [
  "Agrícola", "Ganadero", "Pesquero", "Minería", "Forestal",
  "Textil", "Construcción", "Manufactura", "Tecnología", "Comercio",
  "Servicios", "Educación", "Salud", "Belleza", "Transporte",
  "Logística", "Turismo", "Hostelería", "Entretenimiento", "Finanzas",
  "Consultoría", "Publicidad", "Inmobiliaria", "Restauración", "Automotriz",
  "Energía", "Medio Ambiente", "Deportes", "Cultura", "Artesanal", "Digital",
  "Banca", "Barbería", "Ciberseguridad", "Telecomunicaciones", "Robótica",
  "Moda", "Joyería", "Farmacéutica", "Biotecnología", "Electrónica",
  "Agronegocios", "Automatización", "Sostenibilidad", "E-commerce",
  "Gastronomía", "Arquitectura", "Ingeniería", "Aeroespacial", "Impresión 3D",
  "Nanotecnología", "Logística Inversa", "Medios Digitales", "Marketing",
  "Reciclaje", "Desarrollo Sostenible", "Deportes Electrónicos",
  "Realidad Virtual", "Desarrollo de Videojuegos", "Bienes Raíces",
  "Turismo de Aventura", "Servicios Personales", "Artes Escénicas", "Consultoría Ambiental", "Barbería", "Ciberseguridad", "Telecomunicaciones", "Robótica", "Desarrollo de Software", "Desarrollo de Aplicaciones", "Cosmetología"
]

// Adjetivos globales
const adjectives = [
  "excepcional", "extraordinaria", "vanguardista", "sostenible", "innovadora",
  "líder en el mercado", "revolucionaria", "moderna", "dinámica", "integral",
  "fiable", "destacada", "visionaria", "eficiente", "comprometida", "pionera",
  "transformadora", "disruptiva", "estratégica", "ambiciosa", "flexible",
  "resiliente", "responsable", "inspiradora", "creativa", "optimizada",
  "efectiva", "profesional", "competitiva", "vigorosa", "audaz", "sólida",
  "robusta", "consistente", "meticulosa", "precisa", "eficaz", "apasionada",
  "relevante", "orientada a resultados", "potente", "impactante", "proactiva",
  "vibrante", "exclusiva", "refinada", "sofisticada"
]

// Acciones globales
const actions = [
  "transforma paradigmas", "impulsa la innovación", "redefine estándares", 
  "fomenta el crecimiento", "optimiza procesos", "genera sinergias", 
  "promueve el desarrollo sostenible", "crea alianzas estratégicas", 
  "impulsa la competitividad", "eleva la calidad del servicio", 
  "consolida el liderazgo del mercado", "facilita la transformación digital", 
  "potencia el rendimiento", "maximiza la eficiencia", "establece nuevos horizontes",
  "revitaliza operaciones", "dinamiza recursos", "optimiza la cadena de valor",
  "renueva estrategias", "evoluciona el modelo de negocio", 
  "transforma la experiencia del cliente", "refuerza la presencia digital", 
  "moderniza infraestructuras", "fomenta la cultura de innovación", 
  "impulsa la competitividad global", "intensifica la inversión en I+D", 
  "promueve la eficiencia operativa", "fortalece la red de distribución", 
  "reconfigura procesos internos", "cultiva un ambiente colaborativo", 
  "facilita la integración tecnológica", "impulsa la adopción de nuevas tecnologías",
  "expande la oferta de servicios", "crea soluciones a medida", "genera valor agregado",
  "estimula la creatividad empresarial", "maximiza la rentabilidad", "conecta mercados emergentes",
  "fortalece la competitividad sectorial", "optimiza la gestión de recursos", 
  "construye un futuro innovador", "estimula el desarrollo regional", 
  "fomenta el empoderamiento digital", "impulsa la transformación cultural",
  "promueve la integración de sistemas", "refuerza la seguridad empresarial",
  "dinamiza la experiencia del usuario", "moderniza la estructura organizativa",
  "impulsa la eficiencia energética", "evoluciona hacia nuevos mercados",
  "transforma desafíos en oportunidades", "potencia la competitividad digital",
  "maximiza la innovación colaborativa", "impulsa la agilidad empresarial",
  "fomenta la excelencia operativa", "crea estrategias de vanguardia",
  "impulsa la transformación empresarial", "genera un impacto social positivo",
  "moderniza el ecosistema empresarial", "fortalece la sinergia entre equipos"
]

// Calificadores globales
const qualifiers = [
  "con una visión futurista", "con un compromiso inquebrantable", 
  "basado en la excelencia operativa", "orientado a resultados", 
  "respaldado por la más alta calidad", "con el mejor equipo humano", 
  "con tecnología de punta", "con estrategias innovadoras", 
  "con enfoque en la sostenibilidad", "con dedicación total", 
  "basado en la investigación y el desarrollo", "impulsado por la creatividad", 
  "con un espíritu emprendedor", "con la pasión de marcar la diferencia", 
  "comprometido con el progreso social", "con visión global", 
  "guiado por principios éticos", "con integridad y transparencia", 
  "fomentando la innovación constante", "con excelencia y profesionalismo", 
  "apoyado en el talento humano", "con responsabilidad ambiental", 
  "enfocado en la transformación digital", "con un enfoque centrado en el cliente", 
  "orientado hacia el futuro", "impulsado por la excelencia", 
  "comprometido con la innovación", "con una estructura ágil y flexible", 
  "respaldado por experiencia y conocimiento", "con un alto estándar de calidad", 
  "impulsado por la eficiencia operativa", "con una mentalidad disruptiva", 
  "con visión estratégica", "orientado a la mejora continua", 
  "con una cultura organizacional sólida", "en constante búsqueda de la excelencia", 
  "impulsado por la pasión y el talento", "con una filosofía de innovación abierta", 
  "enfocado en el desarrollo integral", "con altos estándares éticos", 
  "comprometido con la calidad y la excelencia", "con visión de futuro y crecimiento", 
  "apoyado por la tecnología avanzada", "orientado a la transformación cultural", 
  "con un enfoque en el valor agregado", "respaldado por una sólida red de colaboradores", 
  "impulsado por el dinamismo y la creatividad", "con un fuerte compromiso social", 
  "guiado por la innovación y la integridad", "con un enfoque en la eficiencia y la productividad", 
  "en búsqueda constante de nuevas oportunidades", "comprometido con el desarrollo sostenible", 
  "con un compromiso hacia la comunidad"
]



// Utilidad para seleccionar un elemento aleatorio
const randomChoice = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

// Función para generar frases de actividad basadas en un sector
const generateActivityPhrase = (sector: string) => {
  // Seleccionar componentes aleatorios
  const adjective = randomChoice(adjectives)
  const action = randomChoice(actions)
  const qualifier = randomChoice(qualifiers)

  // Definir plantillas de frases
  const templates = [
    `Somos una empresa ${adjective} del sector ${sector}, que ${action} ${qualifier}.`,
    `Especializados en el sector ${sector}, nuestra empresa ${adjective} ${action} ${qualifier}.`,
    `Como empresa ${adjective} en el sector ${sector}, nos dedicamos a ${action} ${qualifier}.`,
    `Nuestra actividad en el sector ${sector} se enfoca en ${action}, destacando por ser ${adjective} ${qualifier}.`,
    `Dentro del sector ${sector}, somos una opción ${adjective} que ${action} ${qualifier}.`
  ]

  // Seleccionar una plantilla al azar
  return randomChoice(templates)
}

// Hook para obtener sugerencias según la búsqueda
const useSuggestionListActivitiesEs = (query: string) => {
  return useMemo(() => {
    if (!query || query.length < 2) return []

    // Filtrar sectores que contienen la palabra clave
    const matchingSectors = sectors.filter((sector) =>
      sector.toLowerCase().includes(query.toLowerCase())
    )

    // Generar frases basadas en los sectores filtrados
    const suggestions = matchingSectors.map((sector) =>
      generateActivityPhrase(sector)
    )

    return suggestions.slice(0, 10) // Limitar a 10 sugerencias
  }, [query])
}

export default useSuggestionListActivitiesEs
