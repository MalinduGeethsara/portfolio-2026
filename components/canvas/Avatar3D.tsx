'use client';

import { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const EmojiAvatar = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useRef(0);
  
  useFrame((state) => {
    // Smooth scroll tracking
    const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const targetScroll = currentScrollY * 0.002;
    scroll.current = THREE.MathUtils.lerp(scroll.current, targetScroll, 0.1);

    if (groupRef.current) {
      // Calculate target rotation based on mouse pointer AND scroll
      const targetX = state.pointer.x * 0.5 + scroll.current * Math.PI; // Spin as you scroll
      const targetY = state.pointer.y * 0.5; 

      // Lerp current rotation to target rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.1);
      
      // Add parallax translation based on scroll
      groupRef.current.position.y = -scroll.current * 1.5;
      groupRef.current.position.z = scroll.current * 1.5; // Move back slightly as you scroll
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Head */}
        <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#FFD700" roughness={0.4} metalness={0.1} />
        </Sphere>
        
        {/* Left Eye */}
        <Sphere args={[0.18, 32, 32]} position={[-0.5, 0.3, 1.38]}>
          <meshStandardMaterial color="#222" roughness={0.5} />
        </Sphere>
        
        {/* Right Eye */}
        <Sphere args={[0.18, 32, 32]} position={[0.5, 0.3, 1.38]}>
          <meshStandardMaterial color="#222" roughness={0.5} />
        </Sphere>

        {/* Left Cheek */}
        <Sphere args={[0.25, 32, 32]} position={[-0.8, -0.1, 1.25]}>
          <meshStandardMaterial color="#FF8C00" roughness={0.8} />
        </Sphere>

        {/* Right Cheek */}
        <Sphere args={[0.25, 32, 32]} position={[0.8, -0.1, 1.25]}>
          <meshStandardMaterial color="#FF8C00" roughness={0.8} />
        </Sphere>

        {/* Smile */}
        <mesh position={[0, -0.15, 1.45]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.5, 0.08, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#222" roughness={0.5} />
        </mesh>
      </Float>
    </group>
  );
};

// --------------------------------------------------------
// CUSTOM 3D AVATAR (e.g. from Ready Player Me)
// 1. Create your avatar at https://readyplayer.me/
// 2. Download the .glb file and save it as public/avatar.glb
// 3. Uncomment this component and use it in Avatar3D instead of EmojiAvatar
// --------------------------------------------------------
const PersonalAvatar = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useRef(0);
  // Using the uploaded white_mesh.glb
  const { scene } = useGLTF('/white_mesh.glb');
  
  useFrame((state) => {
    const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const targetScroll = currentScrollY * 0.002;
    scroll.current = THREE.MathUtils.lerp(scroll.current, targetScroll, 0.1);

    if (groupRef.current) {
      const targetX = state.pointer.x * 0.5 + scroll.current * Math.PI;
      const targetY = state.pointer.y * 0.5;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.1);
      
      groupRef.current.position.y = -scroll.current * 1.5;
      groupRef.current.position.z = scroll.current * 1.5;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Scaled up even more and adjusted position to fill the circle fully */}
        <primitive object={scene} position={[0, -2.8, 0]} scale={4.5} />
      </Float>
    </group>
  );
};

export default function Avatar3D() {
  useEffect(() => {
    // Force a resize event shortly after mount to ensure the Canvas 
    // calculates its bounds correctly and centers the 3D object.
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
    const timer2 = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1500);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-10 pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
        
        <Suspense fallback={<EmojiAvatar />}>
          <PersonalAvatar />
        </Suspense>
      </Canvas>
    </div>
  );
}
