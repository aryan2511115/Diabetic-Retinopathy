import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, OrbitControls, Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

const EyeBody = () => {
  const meshRef = useRef();
  
  // Create a procedural eye texture / look
  const eyeShader = useMemo(() => {
    return {
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color("#0ea5e9") }, // Cyan
        color2: { value: new THREE.Color("#8b5cf6") }, // Purple
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        void main() {
          // Inner pupil radius
          float dist = distance(vUv, vec2(0.5, 0.5));
          
          // Iris pattern
          float pattern = 0.5 + 0.5 * sin(vUv.x * 20.0 + time + vUv.y * 30.0);
          vec3 irisColor = mix(color1, color2, pattern);
          
          // Pupil and outer white
          float pupil = smoothstep(0.12, 0.1, dist);
          float iris = smoothstep(0.4, 0.15, dist);
          
          vec3 finalColor = mix(vec3(0.05), irisColor, iris);
          finalColor = mix(finalColor, vec3(0.0), pupil);
          
          // Ambient glow
          finalColor += 0.1 * vec3(0.5, 0.8, 1.0) * (1.0 - dist);
          
          float alpha = smoothstep(0.48, 0.45, dist);
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    eyeShader.uniforms.time.value = time;
    if (meshRef.current) {
       meshRef.current.rotation.y = Math.sin(time / 2) * 0.3;
       meshRef.current.rotation.x = Math.cos(time / 2) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <shaderMaterial attach="material" {...eyeShader} />
    </mesh>
  );
};

const GlowLines = () => {
    const linesRef = useRef();
    useFrame((state) => {
      if (linesRef.current) {
        linesRef.current.rotation.z += 0.005;
      }
    });

    return (
        <group ref={linesRef}>
            {[...Array(3)].map((_, i) => (
                <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
                    <torusGeometry args={[3 + (i * 0.5), 0.02, 16, 100]} />
                    <meshBasicMaterial color="#0ea5e9" transparent opacity={0.3} />
                </mesh>
            ))}
        </group>
    )
}

const ScanGrid = () => {
  const meshRef = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(time) * 3;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[7, 7, 32, 32]} />
      <meshBasicMaterial color="#0ea5e9" wireframe transparent opacity={0.15} />
    </mesh>
  );
};

export default function Eye3D() {
  return (
    <div className="w-full h-[450px] relative pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#0ea5e9" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <EyeBody />
          <GlowLines />
        </Float>
        
        <ScanGrid />
        
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-medical-bg via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
