import React from "react"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Volume2, VolumeX } from "lucide-react"
import { createPortal } from "react-dom"
import { INTRO_CONFIG } from "../../../../utils/generalConfig"

function IntroCompany() {
  const [initialized, setInitialized] = useState(false)
  const [visible, setVisible] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const isNowBrowser = typeof window !== 'undefined'
  const loadingStartTimeRef = useRef<number>(0)
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationIdRef = useRef<number | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  useEffect(() => {
    if (!isNowBrowser) return    
    let shouldShow = true
    try {
      const lastShown = localStorage.getItem('intro_last_shown')    
      if (lastShown) {
        const lastShownTime = parseInt(lastShown, 10)
        const currentTime = Date.now()
        if (currentTime - lastShownTime < INTRO_CONFIG.LOADING.intervalMs) {
          shouldShow = false
        }
      }      
      if (shouldShow) {
        localStorage.setItem('intro_last_shown', Date.now().toString())
        loadingStartTimeRef.current = Date.now()
        const progressInterval = setInterval(() => {
          setLoadingProgress((prevProgress) => {
            const newProgress = prevProgress + 2            
            if (newProgress >= 100) {
              clearInterval(progressInterval)
              setTimeout(() => setIsLoaded(true), 500)
              setTimeout(() => setVisible(false), 1000)
              return 100
            }            
            return newProgress
          })
        }, 100)
      }
    } catch (error) {
      console.error('IntroCompany: Error con localStorage', error)
      shouldShow = false
    }    
    setVisible(shouldShow)
    setInitialized(true)
  }, [isNowBrowser])
  useEffect(() => {
    if (!visible || !mountRef.current) return;
    
    // Esperar un poco para no bloquear la UI inicial
    setTimeout(() => {
      // Inicializar escena
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Configurar cámara con valores más básicos
      const camera = new THREE.PerspectiveCamera(
        60, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
      );
      camera.position.z = 10;
      cameraRef.current = camera;

      // Configurar renderer optimizado
      const renderer = new THREE.WebGLRenderer({
        antialias: false, // Desactivar para mejorar rendimiento
        alpha: true,
        powerPreference: 'high-performance',
        precision: 'lowp',
      });
      
      // Limitar tamaño del canvas para mejor rendimiento
      const width = Math.min(800, window.innerWidth);
      const height = Math.min(600, window.innerHeight);
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio));
      rendererRef.current = renderer;
      
      // Añadir el canvas al DOM
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }

      // Configurar iluminación simplificada
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
      scene.add(ambientLight);

      const light = new THREE.PointLight(0xffffff, 1);
      light.position.set(0, 0, 10);
      scene.add(light);

      // Crear partículas
      const particles = createParticles();
      scene.add(particles);
      particlesRef.current = particles;

      // Iniciar animación
      const animate = () => {
        if (!visible) return;

        animateParticles(particles);
        
        renderer.render(scene, camera);
        animationIdRef.current = requestAnimationFrame(animate);
      };
      
      animate();

      // Limpiar recursos al desmontar
      return () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        
        // Liberar memoria
        if (particles) {
          if (particles.geometry) {
            particles.geometry.dispose();
          }
          if (particles.material instanceof THREE.Material) {
            particles.material.dispose();
          }
        }
        
        scene.clear();
      };
    }, 100); // Pequeño retraso para no bloquear la UI
  }, [visible])
  const createParticles = () => {
    const particleCount = INTRO_CONFIG.PARTICLES.count
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 20
      const y = (Math.random() - 0.5) * 20
      const z = (Math.random() - 0.5) * 20
      vertices.push(x, y, z)
    }
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    )
    const material = new THREE.PointsMaterial({
      size: 0.1,
      color: INTRO_CONFIG.ELEMENT_COLORS.particles,
      transparent: true,
      opacity: 0.7,
    })    
    return new THREE.Points(geometry, material)
  }
  const animateParticles = (particles: THREE.Points) => {
    if (!particles || !particles.geometry) return;
    
    const positions = particles.geometry.attributes.position;
    const { array } = positions;
    
    if (!array) return;
    
    for (let i = 0; i < array.length; i += 3) {
      // Movimiento simple
      array[i + 1] += 0.01;
      
      // Reiniciar partículas al salir de la vista
      if (array[i + 1] > 10) {
        array[i + 1] = -10;
      }
    }
    
    positions.needsUpdate = true;
  }
  if (!initialized || !visible) {
    return null
  }
  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(5px)',
        background: `linear-gradient(135deg, ${INTRO_CONFIG.BACKGROUND_COLORS.primary} 0%, ${INTRO_CONFIG.BACKGROUND_COLORS.secondary} 100%)`,
      }}
    >
      <div
        style={{
          textAlign: 'center',
          color: 'white',
          marginBottom: '2rem',
          marginTop: '2rem',
        }}
      >
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            margin: 0,
            color: INTRO_CONFIG.BACKGROUND_COLORS.accent,
          }}
        >
          {INTRO_CONFIG.BRAND.name}
        </h1>
        <p style={{ fontSize: '1.25rem', margin: '0.5rem 0' }}>
          {INTRO_CONFIG.BRAND.tagline}
        </p>
      </div>
      <div 
        ref={mountRef}
        style={{
          width: '100%',
          height: '60%',
          position: 'relative',
        }}
      />
      {!isLoaded && (
        <div
          style={{
            width: '80%',
            maxWidth: '400px',
            height: '4px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '2px',
            overflow: 'hidden',
            margin: '1rem 0',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: `${loadingProgress}%`,
              height: '100%',
              background: INTRO_CONFIG.BACKGROUND_COLORS.accent,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      )}
      <p style={{ color: 'white' }}>
        {!isLoaded ? `Cargando... ${loadingProgress}%` : 'Completado'}
      </p>
      <button
        onClick={() => setAudioEnabled(!audioEnabled)}
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: 'white',
        }}
      >
        {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
      <button
        onClick={() => setVisible(false)}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'transparent',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          padding: '0.5rem',
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        Omitir <span>&times;</span>
      </button>
    </div>,
    document.body
  )
}

export default IntroCompany
