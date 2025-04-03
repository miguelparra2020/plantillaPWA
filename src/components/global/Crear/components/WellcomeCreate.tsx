import React, { useEffect, useState } from 'react';
import { Rocket, ShoppingCart } from 'lucide-react';
import './WellcomeCreate.css';
import { useStore } from '@nanostores/react';
import { languajePage } from 'src/stores/languajePage';
import { generalConfig } from "@util/generalConfig"
const Particle = ({ delay, startY }: { delay: number; startY: number }) => {
  const [translateY, setTranslateY] = useState(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const animate = () => {
        setTimeout(() => {
          setTranslateY(-200);
          setOpacity(1);
          setTimeout(() => {
            setOpacity(0);
          }, 400);
        }, delay);
      };
      animate();
    }
  }, [delay]);

  return (
    <div
      className="particle"
      style={{
        transform: `translateY(${translateY}px)`,
        opacity: opacity,
        left: `${Math.random() * 80}%`,
        top: `${startY}px`,
      }}
    />
  );
};

export default function WelcomeAnimation() {
  const [rocketPosition, setRocketPosition] = useState(0);
  const [cartScale, setCartScale] = useState(0);
  const [titleOpacity, setTitleOpacity] = useState(0);
  const { data: dataLanguaje} = useStore(languajePage)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        setRocketPosition(window.innerHeight * 0.3);
        setCartScale(1);
        setTitleOpacity(1);
      }, 2000);
    }
  }, []);

  return (
    <div className="container">
      {typeof window !== 'undefined' &&
        [...Array(20)].map((_, i) => (
          <Particle
            key={i}
            delay={i * 100}
            startY={window.innerHeight * 0.6 + Math.random() * 100}
          />
        ))}
      
      <div
        className="rocketContainer"
        style={{
          transform: `translateY(${rocketPosition}px)`,
        }}
      >
        <Rocket size={84} color="#FF4B4B" />
      </div>

      <div
        className="cartContainer"
        style={{
          transform: `scale(${cartScale})`,
        }}
      >
        <ShoppingCart size={58} color="#2563EB" />
      </div>

      <div className="titleContainer" style={{ opacity: titleOpacity }}>
        <h1 className="title">!
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.wellcome.es.titleWellcome:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.wellcome.en.titleWellcome:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.wellcome.pt.titleWellcome:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.wellcome.fr.titleWellcome:""}</h1>
        <h2 className="subtitle">
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.wellcome.es.subtitleWellcome:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.wellcome.en.subtitleWellcome:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.wellcome.pt.subtitleWellcome:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.wellcome.fr.subtitleWellcome:""}!</h2>
      </div>
    </div>
  );
}