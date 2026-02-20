'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { AIAssistant } from '@/components/ai-assistant';
import { AppProvider, useApp } from '@/lib/context';
import {
  Upload,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Download,
  Share2,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

interface DetectionResult {
  id: string;
  filename: string;
  type: 'video' | 'image' | 'audio';
  result: 'real' | 'deepfake' | 'uncertain';
  confidence: number;
  timestamp: Date;
  details: string;
}

function DetectContent() {
  const { user, isAuthenticated } = useApp();
  const [uploadedFile, setUploadedFile] = useState<DetectionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Please sign in to use detection</h1>
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileType = file.type.startsWith('video') ? 'video' : file.type.startsWith('image') ? 'image' : 'audio';

    setIsAnalyzing(true);
    setShowResults(false);

    // Simulate analysis delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock detection result
    const result: DetectionResult = {
      id: Math.random().toString(36).substr(2, 9),
      filename: file.name,
      type: fileType,
      result: Math.random() > 0.5 ? 'deepfake' : 'real',
      confidence: Math.floor(Math.random() * (99 - 65 + 1)) + 65,
      timestamp: new Date(),
      details:
        Math.random() > 0.5
          ? 'Detected facial inconsistencies and lighting anomalies typical of deepfake generation'
          : 'No significant anomalies detected. Content appears authentic.',
    };

    setUploadedFile(result);
    setIsAnalyzing(false);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Deepfake Detection Engine</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your video, image, or audio file and let our AI analyze it for signs of deepfake manipulation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            {/* Upload Box */}
            <div className="glass-effect border-2 border-dashed border-primary p-12 rounded-2xl text-center mb-8 hover:border-accent transition-smooth cursor-pointer group animate-slide-in-left">
              <label className="cursor-pointer block">
                <Upload className="w-16 h-16 mx-auto mb-4 text-primary group-hover:text-accent transition-smooth group-hover:scale-110" />
                <h3 className="text-2xl font-bold mb-2">Upload File to Analyze</h3>
                <p className="text-muted-foreground mb-4">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mb-6">
                  Supported formats: MP4, WebM, MOV (video) • JPG, PNG, WebP (image) • MP3, WAV, M4A (audio)
                </p>
                <span className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-smooth inline-block">
                  Select File
                </span>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept="video/*,image/*,audio/*"
                  className="hidden"
                />
              </label>
            </div>

            {/* Analyzing State */}
            {isAnalyzing && (
              <div className="glass-effect border border-primary p-8 rounded-xl text-center animate-pulse">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full border-4 border-primary border-t-accent animate-spin" />
                </div>
                <h3 className="text-xl font-bold mb-2">Analyzing Your File...</h3>
                <p className="text-muted-foreground">
                  Our AI is processing your content. This may take a moment.
                </p>
                <div className="mt-4 w-full bg-secondary rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full animate-pulse" />
                </div>
              </div>
            )}

            {/* Results Display */}
            {showResults && uploadedFile && (
              <div className="glass-effect border-2 border-accent p-8 rounded-2xl animate-slide-in-bottom">
                {/* Result Header */}
                <div className="mb-6 pb-6 border-b border-border">
                  <div className="flex items-center gap-4 mb-4">
                    {uploadedFile.result === 'deepfake' ? (
                      <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-accent" />
                      </div>
                    ) : uploadedFile.result === 'real' ? (
                      <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <HelpCircle className="w-8 h-8 text-yellow-500" />
                      </div>
                    )}

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-1">{uploadedFile.filename}</h3>
                      <p className="text-muted-foreground">
                        {uploadedFile.type.charAt(0).toUpperCase() + uploadedFile.type.slice(1)} • Analyzed at{' '}
                        {uploadedFile.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  {/* Main Result */}
                  <div
                    className={`p-4 rounded-lg mb-4 ${
                      uploadedFile.result === 'deepfake'
                        ? 'bg-accent/10 border border-accent'
                        : uploadedFile.result === 'real'
                          ? 'bg-green-500/10 border border-green-500'
                          : 'bg-yellow-500/10 border border-yellow-500'
                    }`}
                  >
                    <p
                      className={`text-lg font-bold mb-2 ${
                        uploadedFile.result === 'deepfake'
                          ? 'text-accent'
                          : uploadedFile.result === 'real'
                            ? 'text-green-500'
                            : 'text-yellow-500'
                      }`}
                    >
                      Verdict: {uploadedFile.result.toUpperCase()}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-secondary rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            uploadedFile.result === 'deepfake'
                              ? 'bg-accent'
                              : uploadedFile.result === 'real'
                                ? 'bg-green-500'
                                : 'bg-yellow-500'
                          }`}
                          style={{ width: `${uploadedFile.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold min-w-fit">
                        {uploadedFile.confidence}% Confidence
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-bold mb-2">Analysis Details</h4>
                    <p className="text-muted-foreground">{uploadedFile.details}</p>
                  </div>

                  <div>
                    <h4 className="font-bold mb-3">Technical Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Facial Analysis', value: '92%' },
                        { label: 'Audio Sync', value: '88%' },
                        { label: 'Lighting', value: '85%' },
                        { label: 'Artifacts', value: '79%' },
                      ].map((metric, i) => (
                        <div key={i} className="p-3 bg-secondary rounded">
                          <p className="text-sm text-muted-foreground">{metric.label}</p>
                          <p className="text-lg font-bold text-primary">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-smooth">
                    <Download className="w-4 h-4" />
                    Download Report
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-smooth">
                    <Share2 className="w-4 h-4" />
                    Share Result
                  </button>
                  <button
                    onClick={() => setShowResults(false)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-border rounded-lg font-semibold hover:bg-secondary transition-smooth"
                  >
                    <Upload className="w-4 h-4" />
                    Analyze Another
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tips */}
            <div className="glass-effect border border-border p-6 rounded-xl animate-slide-in-right">
              <h3 className="font-bold text-lg mb-4">📚 How It Works</h3>
              <ol className="space-y-3 text-sm">
                {[
                  { num: '1', text: 'Upload your media file' },
                  { num: '2', text: 'AI analyzes content' },
                  { num: '3', text: 'Get instant results' },
                  { num: '4', text: 'Download full report' },
                ].map((step) => (
                  <li key={step.num} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                      {step.num}
                    </span>
                    <span className="pt-0.5">{step.text}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* File Limits */}
            <div className="glass-effect border border-border p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                Your Quota
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Detections this month</span>
                    <span className="font-bold">{user?.detectionsMade || 0}/500</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min((((user?.detectionsMade || 0) / 500) * 100), 100)}%` }}
                    />
                  </div>
                </div>
              </div>
              <Link
                href="/pricing"
                className="block mt-4 text-center px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-smooth text-sm font-medium"
              >
                Upgrade Plan
              </Link>
            </div>

            {/* Recent Files */}
            {uploadedFile && (
              <div className="glass-effect border border-border p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-4">Recent Analysis</h3>
                <div className="p-3 bg-secondary rounded-lg border border-border">
                  <p className="text-sm font-medium truncate">{uploadedFile.filename}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded ${
                        uploadedFile.result === 'deepfake'
                          ? 'bg-accent/20 text-accent'
                          : 'bg-green-500/20 text-green-500'
                      }`}
                    >
                      {uploadedFile.result.toUpperCase()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {uploadedFile.confidence}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AIAssistant />
    </div>
  );
}

export default function DetectPage() {
  return (
    <AppProvider>
      <DetectContent />
    </AppProvider>
  );
}
