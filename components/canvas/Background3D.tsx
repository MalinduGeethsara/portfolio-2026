'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const particlesCount = 3000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 30; // Spread across 30 units
    }
    return pos;
  }, []);

  useFrame((state) => {
    // Smoothly track mouse coordinates
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, state.pointer.x, 0.05);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, state.pointer.y, 0.05);

    if (pointsRef.current) {
      // Rotate based on mouse and time
      pointsRef.current.rotation.y = mouse.current.x * 0.2 + state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = -mouse.current.y * 0.2 + state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00ff99"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#0a0a0a] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <ParticleField />
      </Canvas>
      {/* Heavy noise overlay to blend 3D with the 2D UI seamlessly */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      {/* Gradient vignette to darken edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0a0a0a_100%)]" />
    </div>
  );
}
