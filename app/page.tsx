'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { AIAssistant } from '@/components/ai-assistant';
import { GlobalDeepfakeMap } from '@/components/global-deepfake-map';
import { AppProvider } from '@/lib/context';
import InteractiveGlobe from '@/components/interactive-globe'; // Import InteractiveGlobe component
import {
  Play,
  ImageIcon,
  Zap,
  Check,
  ArrowRight,
  Shield,
  Cpu,
  BarChart3,
} from 'lucide-react';
import Link from 'next/link';

function LandingPageContent() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Play className="w-8 h-8" />,
      title: 'Video Detection',
      description: 'Analyze videos for facial inconsistencies, lip-sync issues, and deepfake artifacts',
    },
    {
      icon: <ImageIcon className="w-8 h-8" />,
      title: 'Image Analysis',
      description: 'Detect AI-generated or manipulated images with advanced pixel analysis',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Audio Recognition',
      description: 'Identify voice cloning, synthetic speech, and audio manipulation',
    },
  ];

  const benefits = [
    'Real-time detection results',
    'Multi-format support',
    'Confidence scoring',
    '99% accuracy rate',
    'Detailed analysis reports',
    'Batch processing available',
    'API integration ready',
    'Global region tracking',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-slide-in-left">
              <div className="mb-6 inline-block">
                <span className="px-4 py-2 rounded-full bg-primary/20 text-primary font-semibold text-sm">
                  🔐 Advanced AI Security
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Detect
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Deepfakes
                </span>
                in Real Time
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Protect yourself and your organization from misinformation. Our AI-powered platform
                detects deepfake videos, manipulated images, and synthetic audio with unmatched
                accuracy.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/signup"
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-smooth flex items-center justify-center gap-2 group"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-smooth" />
                </Link>
                <Link
                  href="#features"
                  className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-smooth"
                >
                  Learn More
                </Link>
              </div>

              <div className="space-y-3">
                {['No credit card required', 'Free tier available', 'Enterprise ready'].map(
                  (item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-accent" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative h-96 lg:h-full animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-2xl" />
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 glass-effect h-full flex flex-col items-center justify-center">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-center font-semibold mb-4">AI Detection Engine</p>
                <div className="text-center text-sm text-muted-foreground">
                  <p>Powered by state-of-the-art machine learning</p>
                  <p>Video • Image • Audio Analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Deepfake Map Section */}
      <GlobalDeepfakeMap />

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Detection Tools</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced AI algorithms to detect deepfakes across all media formats
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, i) => (
              <div
                key={i}
                onClick={() => setActiveFeature(i)}
                className={`group p-8 rounded-xl border-2 transition-smooth cursor-pointer cards-grid transform hover:scale-105 ${
                  activeFeature === i
                    ? 'glass-effect border-primary bg-primary/10'
                    : 'border-border hover:border-primary'
                }`}
              >
                <div className="text-gradient text-primary mb-4 group-hover:scale-110 transition-smooth">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Benefits Grid */}
          <div className="glass-effect p-8 rounded-xl border border-primary">
            <h3 className="text-2xl font-bold mb-8 text-center">What You Get</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-smooth">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary/20 via-background to-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '1M+', label: 'Files Analyzed' },
              { value: '99%', label: 'Accuracy Rate' },
              { value: '150+', label: 'Countries' },
              { value: '24/7', label: 'Support' },
            ].map((stat, i) => (
              <div key={i} className="p-6">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Enterprise-Grade Security</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Your data is protected with military-grade encryption and complies with GDPR, CCPA,
                and international privacy standards.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <Shield className="w-6 h-6" />, text: 'End-to-end encryption' },
                  { icon: <Cpu className="w-6 h-6" />, text: 'On-premise deployment available' },
                  { icon: <BarChart3 className="w-6 h-6" />, text: 'Compliance certifications' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="text-primary">{item.icon}</div>
                    <span className="text-foreground font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-effect p-8 rounded-xl border border-primary h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🔒</div>
                <p className="font-semibold mb-2">ISO 27001 Certified</p>
                <p className="text-sm text-muted-foreground">Secure & Compliant</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary border-y border-border relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users protecting against deepfakes and misinformation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-smooth"
            >
              Start Free Trial
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-bold hover:bg-primary/10 transition-smooth"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Security'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers'] },
              { title: 'Resources', links: ['Docs', 'API', 'Support'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Contact'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 DeepfakeSense. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
}

export default function LandingPage() {
  return (
    <AppProvider>
      <LandingPageContent />
    </AppProvider>
  );
}
