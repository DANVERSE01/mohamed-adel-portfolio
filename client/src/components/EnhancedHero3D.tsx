import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotate based on time
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      // Scale based on scroll
      const scale = 1 + Math.sin(scrollY * 0.001) * 0.2;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1.5, 100, 100]} scale={1}>
        <MeshDistortMaterial
          color="#D2D64A"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function Particles() {
  const count = 1000;
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#D2D64A"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function EnhancedHero3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#D2D64A" />
        
        <AnimatedSphere />
        <Particles />
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
    </div>
  );
}
