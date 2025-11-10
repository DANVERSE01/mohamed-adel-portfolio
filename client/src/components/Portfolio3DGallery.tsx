import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { OrbitControls, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface ImageCardProps {
  position: [number, number, number];
  imageUrl: string;
  title: string;
  onClick: () => void;
}

function ImageCard({ position, imageUrl, title, onClick }: ImageCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += hovered ? 0.01 : 0.005;
      meshRef.current.scale.lerp(
        new THREE.Vector3(hovered ? 1.1 : 1, hovered ? 1.1 : 1, 1),
        0.1
      );
    }
  });

  try {
    const texture = useTexture(imageUrl);
    
    return (
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <planeGeometry args={[2, 2.5]} />
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={hovered ? 1 : 0.9}
        />
        {hovered && (
          <Html position={[0, -1.5, 0]} center>
            <div className="bg-black/80 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap">
              {title}
            </div>
          </Html>
        )}
      </mesh>
    );
  } catch (error) {
    // Fallback for missing textures
    return (
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <planeGeometry args={[2, 2.5]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
    );
  }
}

interface Portfolio3DGalleryProps {
  items: Array<{
    id: string;
    title: string;
    file: string;
  }>;
  onItemClick: (id: string) => void;
}

export default function Portfolio3DGallery({ items, onItemClick }: Portfolio3DGalleryProps) {
  const displayItems = items.slice(0, 9); // Display first 9 items in 3x3 grid

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, 0, -5]} intensity={0.5} color="#8b5cf6" />

        {displayItems.map((item, index) => {
          const row = Math.floor(index / 3);
          const col = index % 3;
          const x = (col - 1) * 2.5;
          const y = (1 - row) * 3;
          
          return (
            <ImageCard
              key={item.id}
              position={[x, y, 0]}
              imageUrl={item.file}
              title={item.title}
              onClick={() => onItemClick(item.id)}
            />
          );
        })}

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          minDistance={5}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}
