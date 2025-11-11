import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useScroll, ScrollControls, Image, useTexture } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface ScrollingImagesProps {
  images: string[];
}

function ScrollingImages({ images }: ScrollingImagesProps) {
  const { width, height } = useThree((state) => state.viewport);
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (group.current) {
      group.current.children.forEach((child, i) => {
        const y = scroll.offset * 4 + (i - images.length / 2) * 1.5;
        child.position.y = y;
        
        // Fade effect based on distance from center
        const distance = Math.abs(y);
        const opacity = Math.max(0, 1 - distance / 3);
        (child as any).material.opacity = opacity;
        
        // Scale effect
        const scale = Math.max(0.5, 1 - distance / 5);
        child.scale.setScalar(scale);
      });
    }
  });

  return (
    <group ref={group}>
      {images.map((url, i) => (
        <Image
          key={i}
          url={url}
          scale={[width * 0.6, height * 0.4]}
          position={[0, (i - images.length / 2) * 1.5, 0]}
          transparent
          opacity={1}
        />
      ))}
    </group>
  );
}

interface Advanced3DGalleryProps {
  images: string[];
}

export default function Advanced3DGallery({ images }: Advanced3DGalleryProps) {
  return (
    <div className="w-full h-screen relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ScrollControls pages={4} damping={0.2}>
            <ScrollingImages images={images} />
          </ScrollControls>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
        </Suspense>
      </Canvas>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <p className="text-sm text-muted-foreground">Scroll to explore</p>
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full mt-2 mx-auto">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-primary rounded-full mx-auto mt-2"
          />
        </div>
      </motion.div>
    </div>
  );
}
