import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, Points, PointMaterial } from '@react-three/drei';

const Nodes = () => {
  const count = 50;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.1;
      pointsRef.current.rotation.x = time * 0.05;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = time * 0.1;
      linesRef.current.rotation.x = time * 0.05;
    }
  });

  // Create lines connecting points that are close to each other
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (dist < 3) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    return geometry;
  }, [positions]);

  return (
    <group>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ff0000"
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#ff0000" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
};

const ConnectingNodesAnimation = () => {
  return (
    <div className="w-full h-full absolute inset-0 -z-10 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <Nodes />
        </Float>
      </Canvas>
    </div>
  );
};

export default ConnectingNodesAnimation;
