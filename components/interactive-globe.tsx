'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';

function GlobeGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <>
      <PerspectiveCamera position={[0, 0, 2.5]} />
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={new THREE.TextureLoader().load('/assets/3d/texture_earth.jpg')}
          emissive={0x111111}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        <sphereGeometry args={[1.01, 32, 32]} />
        <meshBasicMaterial
          wireframe
          color={0x00ff88}
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Light */}
      <ambientLight intensity={1.2} />
      <pointLight position={[5, 3, 5]} intensity={1} />
    </>
  );
}

function InteractiveGlobeComponent() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regions = [
    { name: 'North America', color: '#ff6b6b', deepfakes: 245, total: 1200 },
    { name: 'Europe', color: '#4ecdc4', deepfakes: 189, total: 950 },
    { name: 'Asia Pacific', color: '#ffe66d', deepfakes: 412, total: 2100 },
    { name: 'South America', color: '#95e1d3', deepfakes: 67, total: 350 },
    { name: 'Africa', color: '#f38181', deepfakes: 54, total: 280 },
    { name: 'Middle East', color: '#aa96da', deepfakes: 98, total: 520 },
  ];

  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-b from-background via-background to-primary/10 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Globe Canvas */}
      <div className="w-full max-w-2xl h-96 mb-12">
        <Canvas>
          <GlobeGeometry />
        </Canvas>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Global Deepfake Map
        </h1>
        <p className="text-muted-foreground max-w-md">
          Click a region to view AI-generated content detected in that area
        </p>
      </div>

      {/* Regional Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {regions.map((region) => (
          <button
            key={region.name}
            onClick={() => setSelectedRegion(region.name)}
            className={`glass-effect p-4 rounded-lg border transition-smooth cursor-pointer transform hover:scale-105 ${
              selectedRegion === region.name
                ? 'border-accent bg-accent/20'
                : 'border-border hover:border-primary'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: region.color }}
              />
              <h3 className="font-semibold text-foreground">{region.name}</h3>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-accent">
                {region.deepfakes} deepfakes detected
              </p>
              <p className="text-muted-foreground">
                {((region.deepfakes / region.total) * 100).toFixed(1)}% of {region.total} analyzed
              </p>
              <div className="w-full bg-secondary rounded-full h-1 mt-2">
                <div
                  className="bg-accent h-1 rounded-full"
                  style={{ width: `${(region.deepfakes / region.total) * 100}%` }}
                />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Region Details */}
      {selectedRegion && (
        <div className="mt-12 w-full max-w-2xl glass-effect p-6 rounded-lg border border-primary animate-slide-in-bottom">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            {selectedRegion} Analysis
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/50 p-4 rounded">
              <p className="text-muted-foreground text-sm">Detection Rate</p>
              <p className="text-2xl font-bold text-accent">
                {regions
                  .find((r) => r.name === selectedRegion)
                  ?.deepfakes.toLocaleString()}{' '}
              </p>
            </div>
            <div className="bg-secondary/50 p-4 rounded">
              <p className="text-muted-foreground text-sm">Total Analyzed</p>
              <p className="text-2xl font-bold text-primary">
                {regions.find((r) => r.name === selectedRegion)?.total.toLocaleString()}
              </p>
            </div>
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth font-medium">
            View {selectedRegion} Content →
          </button>
        </div>
      )}
    </div>
  );
}

export function InteractiveGlobe() {
  return <InteractiveGlobeComponent />;
}

export default InteractiveGlobe;
