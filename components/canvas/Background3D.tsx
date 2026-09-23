'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Galaxy = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  const parameters = useMemo(() => ({
    count: 25000,
    size: 0.02,
    radius: 12,
    branches: 5,
    spin: 1.5,
    randomness: 0.6,
    randomnessPower: 3,
    insideColor: '#ccffee',
    outsideColor: '#004422'
  }), []);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);

    const colorInside = new THREE.Color(parameters.insideColor);
    const colorOutside = new THREE.Color(parameters.outsideColor);

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;
      
      const radius = Math.random() * parameters.radius;
      const spinAngle = radius * parameters.spin;
      const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
      const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
      const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / parameters.radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return { positions, colors };
  }, [parameters]);

  useFrame((state) => {
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, state.pointer.x, 0.05);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, state.pointer.y, 0.05);
    
    // Smooth scroll tracking
    const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const targetScroll = currentScrollY * 0.001; 
    scroll.current = THREE.MathUtils.lerp(scroll.current, targetScroll, 0.05);

    if (pointsRef.current) {
      // Base rotation over time
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      
      // Interactive rotation (mouse + scroll)
      pointsRef.current.rotation.y += mouse.current.x * 0.2 + scroll.current * 1.5;
      pointsRef.current.rotation.x = -mouse.current.y * 0.2 + 0.6 + scroll.current * 0.8;
      
      // Adaptable scroll parallax
      pointsRef.current.position.y = scroll.current * 4;
      // Zoom out slightly when scrolling down
      pointsRef.current.position.z = -scroll.current * 2;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={parameters.size}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
      />
    </points>
  );
};

const Starfield = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const scroll = useRef(0);
  
  const particlesCount = 4000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 40; 
    }
    return pos;
  }, []);

  useFrame((state) => {
    const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const targetScroll = currentScrollY * 0.001; 
    scroll.current = THREE.MathUtils.lerp(scroll.current, targetScroll, 0.05);

    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01 + scroll.current * 0.2;
      pointsRef.current.position.y = scroll.current * 8; 
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        color="#00ff99"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#0a0a0a] pointer-events-none">
      <Canvas camera={{ position: [0, 2, 12], fov: 60 }}>
        <fog attach="fog" args={['#0a0a0a', 5, 25]} />
        <ambientLight intensity={0.5} />
        <Galaxy />
        <Starfield />
      </Canvas>
      {/* Heavy noise overlay to blend 3D with the 2D UI seamlessly */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      {/* Gradient vignette to darken edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0a0a0a_100%)]" />
    </div>
  );
}
