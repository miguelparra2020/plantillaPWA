import React, { useEffect, useState } from 'react';
import { Rocket, ShoppingCart } from 'lucide-react';
import './WellcomeCreate.css';

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
        <h1 className="title">¡Bienvenido a tu</h1>
        <h2 className="subtitle">E-commerce del Futuro!</h2>
      </div>
    </div>
  );
}