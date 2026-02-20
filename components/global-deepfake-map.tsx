'use client';

import React, { useState } from 'react';
import { GlobeToMapTransform } from './globe-to-map-transform';

interface RegionStats {
  id: string;
  name: string;
  color: string;
  deepfakes: number;
  analyzed: number;
  percentage: number;
}

export function GlobalDeepfakeMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regions: RegionStats[] = [
    {
      id: 'north-america',
      name: 'North America',
      color: 'from-red-500',
      deepfakes: 245,
      analyzed: 1200,
      percentage: 20.4,
    },
    {
      id: 'europe',
      name: 'Europe',
      color: 'from-cyan-500',
      deepfakes: 189,
      analyzed: 950,
      percentage: 19.9,
    },
    {
      id: 'asia-pacific',
      name: 'Asia Pacific',
      color: 'from-yellow-500',
      deepfakes: 412,
      analyzed: 2100,
      percentage: 19.6,
    },
    {
      id: 'south-america',
      name: 'South America',
      color: 'from-emerald-500',
      deepfakes: 98,
      analyzed: 520,
      percentage: 18.8,
    },
    {
      id: 'africa',
      name: 'Africa',
      color: 'from-pink-500',
      deepfakes: 156,
      analyzed: 780,
      percentage: 20.0,
    },
    {
      id: 'middle-east',
      name: 'Middle East',
      color: 'from-purple-500',
      deepfakes: 203,
      analyzed: 1050,
      percentage: 19.3,
    },
  ];

  const selectedRegionData = selectedRegion ? regions.find(r => r.id === selectedRegion) : null;

  return (
    <section className="py-20 bg-gradient-to-b from-background via-secondary/5 to-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
              Global Deepfake
            </span>
            <span className="block bg-gradient-to-r from-accent to-pink-500 bg-clip-text text-transparent">
              Map
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Click a region to view AI-generated content detected in that area
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Globe Component - Left Side */}
          <div className="lg:col-span-2 rounded-2xl border border-primary/30 overflow-hidden glass-effect p-6 h-96">
            <GlobeToMapTransform />
          </div>

          {/* Region Stats - Right Side */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {regions.map((region) => (
              <div
                key={region.id}
                onClick={() => setSelectedRegion(selectedRegion === region.id ? null : region.id)}
                className={`group p-4 rounded-xl border-2 transition-all cursor-pointer transform hover:scale-105 ${
                  selectedRegion === region.id
                    ? 'glass-effect border-primary bg-primary/20'
                    : 'border-border hover:border-primary/50 bg-transparent'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${region.color} to-transparent`} />
                    <h3 className="font-bold text-foreground">{region.name}</h3>
                  </div>
                </div>
                <div className="space-y-1 ml-6">
                  <p className="text-sm">
                    <span className="text-accent font-bold">{region.deepfakes}</span>
                    <span className="text-muted-foreground"> deepfakes detected</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {region.percentage}% of {region.analyzed} analyzed
                  </p>
                  <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${region.color} to-transparent transition-all`}
                      style={{ width: `${region.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Content Showcase */}
        {selectedRegionData && (
          <div className="mt-16 glass-effect border border-primary/30 rounded-2xl p-8 animate-slide-in-bottom">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${selectedRegionData.color} to-transparent`} />
              <h3 className="text-2xl font-bold">{selectedRegionData.name} - Recent Detections</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-lg border border-primary/20 overflow-hidden bg-secondary/20 hover:border-primary/50 transition-all transform hover:scale-105 group cursor-pointer"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center group-hover:from-primary/40 group-hover:to-accent/40 transition-all">
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {i % 2 === 0 ? '🎥' : i % 3 === 0 ? '🖼️' : '🎙️'}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {i % 2 === 0 ? 'Deepfake Video' : i % 3 === 0 ? 'AI Image' : 'Synthetic Audio'}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-sm mb-2">Detection #{i}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-accent font-bold">98.2% Match</span>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-smooth group flex items-center gap-2">
                View All Detections
                <span className="group-hover:translate-x-1 transition-smooth">→</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
