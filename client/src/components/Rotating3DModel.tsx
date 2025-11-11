import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

interface AnimatedBoxProps {
  color: string;
}

function AnimatedBox({ color }: AnimatedBoxProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
}

interface Rotating3DModelProps {
  color?: string;
  autoRotate?: boolean;
}

export default function Rotating3DModel({ 
  color = '#D2D64A', 
  autoRotate = true 
}: Rotating3DModelProps) {
  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden bg-gradient-to-br from-card/50 to-background">
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[5, 3, 5]} />
          
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#D2D64A" />
          
          <AnimatedBox color={color} />
          
          <Environment preset="city" />
          
          <OrbitControls
            enableZoom={false}
            autoRotate={autoRotate}
            autoRotateSpeed={2}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
          
          {/* Ground plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
            <planeGeometry args={[10, 10]} />
            <shadowMaterial opacity={0.3} />
          </mesh>
        </Suspense>
      </Canvas>
      
      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}
