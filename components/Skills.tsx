'use client';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const SpinningShape = ({ type }: { type: string }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  const getPlanet = () => {
    switch (type) {
      case "Programming": // Standard Wireframe Planet
        return (
          <mesh>
            <sphereGeometry args={[1.2, 12, 12]} />
            <meshStandardMaterial color="#00ff99" wireframe={true} transparent opacity={0.8} emissive="#00ff99" emissiveIntensity={0.2} />
          </mesh>
        );
      case "Frontend": // Ringed Planet (Saturn-like)
        return (
          <group>
            <mesh>
              <sphereGeometry args={[0.8, 10, 10]} />
              <meshStandardMaterial color="#00ff99" wireframe={true} transparent opacity={0.8} emissive="#00ff99" emissiveIntensity={0.2} />
            </mesh>
            <mesh rotation-x={Math.PI / 2.2}>
              <torusGeometry args={[1.4, 0.05, 8, 32]} />
              <meshStandardMaterial color="#00ff99" wireframe={true} transparent opacity={0.8} emissive="#00ff99" emissiveIntensity={0.4} />
            </mesh>
          </group>
        );
      case "Backend": // Digital Geodesic Planet
        return (
          <mesh>
            <icosahedronGeometry args={[1.2, 2]} />
            <meshStandardMaterial color="#00ff99" wireframe={true} transparent opacity={0.6} emissive="#00ff99" emissiveIntensity={0.2} />
          </mesh>
        );
      case "Tools": // Blocky Tech Planet
        return (
          <mesh>
            <dodecahedronGeometry args={[1.2, 0]} />
            <meshStandardMaterial color="#00ff99" wireframe={true} transparent opacity={0.8} emissive="#00ff99" emissiveIntensity={0.2} />
          </mesh>
        );
      default:
        return (
          <mesh>
            <sphereGeometry args={[1.2, 16, 16]} />
            <meshStandardMaterial color="#00ff99" wireframe={true} transparent opacity={0.8} />
          </mesh>
        );
    }
  };

  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
      <group ref={meshRef}>
        {getPlanet()}
      </group>
    </Float>
  );
};

const SkillIcon3D = ({ title }: { title: string }) => {
  return (
    <div className="w-14 h-14 relative z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#00ff99" intensity={2} />
        <SpinningShape type={title} />
      </Canvas>
    </div>
  );
};

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming",
      items: ["C", "C++", "Java", "JavaScript", "PHP"]
    },
    {
      title: "Frontend",
      items: ["HTML5", "Tailwind CSS", "React", "Next.js", "Figma"]
    },
    {
      title: "Backend",
      items: ["Node.js", "Express", "MySQL", "PHP"]
    },
    {
      title: "Tools",
      items: ["Git", "Jira", "Postman", "Linux"]
    }
  ];

  return (
    <section id="skills" className="py-16 md:py-24 px-6">
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Technical <span className="text-[#00ff99]">Skills</span>
        </h2>
        <div className="w-20 h-1.5 bg-[#00ff99] rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="p-6 bg-[#232329]/80 backdrop-blur-sm border border-white/5 rounded-2xl hover:border-[#00ff99]/30 transition-all group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-[#1c1c22] rounded-xl group-hover:shadow-[0_0_20px_rgba(0,255,153,0.3)] transition-all border border-white/5 group-hover:border-[#00ff99]/30">
                <SkillIcon3D title={cat.title} />
              </div>
              <h3 className="font-bold text-white text-lg">{cat.title}</h3>
            </div>

            <ul className="flex flex-wrap gap-2">
              {cat.items.map((skill, j) => (
                <li 
                  key={j} 
                  className="px-3 py-1 bg-[#1c1c22] border border-white/10 rounded-md text-xs text-white/70 hover:text-[#00ff99] hover:border-[#00ff99]/50 transition-colors"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}