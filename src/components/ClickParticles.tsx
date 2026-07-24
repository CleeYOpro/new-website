"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  id: number;
  opacity: number;
  size: number;
  color: string;
  createdAt: number;
}

interface ClickParticlesProps {
  particleCount?: number;
  particleColors?: string[];
  particleSizeRange?: [number, number];
  velocityMin?: number;
  velocityMax?: number;
  gravity?: number;
  fadeSpeed?: number;
  angleRange?: [number, number];
  lifetime?: number;
}

const ClickParticles = ({
  particleCount = 8,
  particleColors = ["#D5674F"],
  particleSizeRange = [1.5, 2.5],
  velocityMin = 0.5,
  velocityMax = 1.5,
  gravity = 0.05,
  fadeSpeed = 0.02,
  angleRange = [0, 360],
  lifetime = 1000,
}: ClickParticlesProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const particleId = useRef(0);

  const randomBetween = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      const newParticles = Array.from({ length: particleCount }, () => {
        const angleDeg = randomBetween(angleRange[0], angleRange[1]);
        const angleRad = (angleDeg * Math.PI) / 180;
        const speed = randomBetween(velocityMin, velocityMax);

        return {
          x,
          y,
          vx: Math.cos(angleRad) * speed,
          vy: Math.sin(angleRad) * speed,
          id: particleId.current++,
          opacity: 1,
          size: randomBetween(particleSizeRange[0], particleSizeRange[1]),
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          createdAt: performance.now(),
        };
      });

      particlesRef.current = [...particlesRef.current, ...newParticles];
      setParticles(particlesRef.current);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [particleCount, angleRange, velocityMin, velocityMax, particleColors, particleSizeRange]);

  useEffect(() => {
    let animationFrameId: number;

    const updateParticles = () => {
      const now = performance.now();
      particlesRef.current = particlesRef.current
        .map(p => {
          const age = now - p.createdAt;
          const lifeProgress = age / lifetime;
          return {
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + gravity,
            opacity: 1 - lifeProgress,
          };
        })
        .filter(p => now - p.createdAt < lifetime);

      setParticles([...particlesRef.current]);
      animationFrameId = requestAnimationFrame(updateParticles);
    };

    animationFrameId = requestAnimationFrame(updateParticles);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gravity, fadeSpeed, lifetime]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            backgroundColor: p.color,
            transform: `translate(${p.x}px, ${p.y}px)`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default ClickParticles;
