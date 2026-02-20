'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { AIAssistant } from '@/components/ai-assistant';
import { AppProvider, useApp } from '@/lib/context';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Upload,
  History,
  Settings,
  Download,
} from 'lucide-react';
import Link from 'next/link';

function DashboardContent() {
  const router = useRouter();
  const { user, isAuthenticated } = useApp();
  const [detections, setDetections] = useState([
    {
      id: '1',
      type: 'video',
      name: 'sample_video.mp4',
      result: 'deepfake',
      confidence: 92,
      date: '2024-01-18',
    },
    {
      id: '2',
      type: 'image',
      name: 'image_001.jpg',
      result: 'real',
      confidence: 88,
      date: '2024-01-17',
    },
    {
      id: '3',
      type: 'audio',
      name: 'voice_sample.mp3',
      result: 'uncertain',
      confidence: 65,
      date: '2024-01-16',
    },
  ]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Please sign in to access the dashboard</h1>
          <Link
            href="/login"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-smooth"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Detections',
      value: user?.detectionsMade || 0,
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'text-primary',
    },
    {
      label: 'Deepfakes Found',
      value: Math.floor((user?.detectionsMade || 0) * 0.35),
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'text-accent',
    },
    {
      label: 'Success Rate',
      value: '94%',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'text-green-500',
    },
    {
      label: 'Plan Status',
      value: (user?.subscription || 'free').toUpperCase(),
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12 animate-slide-in-bottom">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">Here's your deepfake detection overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-effect border border-border p-6 rounded-xl hover:border-primary transition-smooth animate-slide-in-bottom"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
                <div className={stat.color}>{stat.icon}</div>
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <div className="glass-effect border-2 border-dashed border-primary p-12 rounded-xl text-center mb-8 hover:border-accent transition-smooth cursor-pointer group animate-slide-in-left">
              <Upload className="w-12 h-12 mx-auto mb-4 text-primary group-hover:text-accent transition-smooth" />
              <h3 className="text-xl font-bold mb-2">Upload File to Analyze</h3>
              <p className="text-muted-foreground mb-6">
                Drag and drop or click to upload video, image, or audio files
              </p>
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-smooth">
                Select File
              </button>
              <p className="text-xs text-muted-foreground mt-4">
                Max file size: 500MB • Supported: MP4, AVI, JPG, PNG, MP3, WAV
              </p>
            </div>

            {/* Recent Detections */}
            <div className="glass-effect border border-border p-6 rounded-xl animate-slide-in-left">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <History className="w-6 h-6" />
                  Recent Analysis
                </h2>
                <Link href="#" className="text-primary hover:underline text-sm">
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {detections.map((detection) => (
                  <div
                    key={detection.id}
                    className="p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-smooth border border-border hover:border-primary"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {detection.type === 'video'
                            ? '🎬'
                            : detection.type === 'image'
                              ? '🖼️'
                              : '🎵'}
                        </span>
                        <div>
                          <p className="font-semibold">{detection.name}</p>
                          <p className="text-xs text-muted-foreground">{detection.date}</p>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-muted-foreground hover:text-primary" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            detection.result === 'deepfake'
                              ? 'bg-accent/20 text-accent'
                              : detection.result === 'real'
                                ? 'bg-green-500/20 text-green-500'
                                : 'bg-yellow-500/20 text-yellow-500'
                          }`}
                        >
                          {detection.result.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm font-medium">{detection.confidence}% confidence</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6 animate-slide-in-right">
            {/* Subscription Card */}
            <div className="glass-effect border border-accent p-6 rounded-xl bg-gradient-to-br from-accent/10 to-transparent">
              <h3 className="font-bold text-lg mb-2">Current Plan</h3>
              <p className="text-3xl font-bold text-accent mb-4">
                {(user?.subscription || 'Free').toUpperCase()}
              </p>
              <div className="mb-4 space-y-2">
                <p className="text-sm flex justify-between">
                  <span className="text-muted-foreground">Detections this month:</span>
                  <span className="font-semibold">
                    {user?.detectionsMade || 0} / Unlimited
                  </span>
                </p>
              </div>
              <Link
                href="/pricing"
                className="block w-full text-center py-2 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-smooth"
              >
                Upgrade Plan
              </Link>
            </div>

            {/* Quick Links */}
            <div className="glass-effect border border-border p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { label: 'Profile Settings', href: '/profile', icon: '⚙️' },
                  { label: 'API Documentation', href: '#', icon: '📚' },
                  { label: 'Download Report', href: '#', icon: '📊' },
                  { label: 'Support', href: '#', icon: '💬' },
                ].map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-smooth"
                  >
                    <span>{link.icon}</span>
                    <span className="text-sm font-medium">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Storage */}
            <div className="glass-effect border border-border p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-4">Storage Used</h3>
              <div className="w-full bg-secondary rounded-full h-3 mb-3">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-3 rounded-full"
                  style={{ width: '65%' }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                6.5 GB / 10 GB used
              </p>
            </div>
          </div>
        </div>
      </div>

      <AIAssistant />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}
