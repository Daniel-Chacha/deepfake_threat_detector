'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { AIAssistant } from '@/components/ai-assistant';
import { AppProvider, useApp } from '@/lib/context';
import { User, SubscriptionPlan } from '@/lib/types';
import Link from 'next/link';
import { ArrowRight, Mail, Lock, AlertCircle } from 'lucide-react';

// Demo accounts
const DEMO_ACCOUNTS = [
  { email: 'user@demo.com', password: 'demo1234', name: 'Demo User', role: 'user' },
  { email: 'admin@demo.com', password: 'admin1234', name: 'Admin User', role: 'admin' },
];

function LoginContent() {
  const router = useRouter();
  const { setUser } = useApp();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!formData.email || !formData.password) {
      setErrors({ general: 'Email and password are required' });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check demo accounts
    const demoAccount = DEMO_ACCOUNTS.find(
      (acc) => acc.email === formData.email && acc.password === formData.password
    );

    if (demoAccount) {
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: demoAccount.email,
        name: demoAccount.name,
        role: demoAccount.role as any,
        subscription: 'pro' as SubscriptionPlan,
        fontSize: 'medium',
        theme: 'dark',
        detectionsMade: Math.floor(Math.random() * 100),
        createdAt: new Date(),
      };

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      setIsLoading(false);
      router.push('/dashboard');
    } else {
      setErrors({ general: 'Invalid email or password' });
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoAccount: (typeof DEMO_ACCOUNTS)[0]) => {
    setFormData({ email: demoAccount.email, password: demoAccount.password });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Background Decoration */}
          <div className="absolute top-20 right-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl -z-10" />

          <div className="glass-effect border border-primary p-8 rounded-xl animate-slide-in-bottom">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-white font-bold">DS</span>
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  DeepfakeSense
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to your account</p>
            </div>

            {/* Demo Info */}
            {!showDemo && (
              <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <p className="text-sm text-primary font-medium mb-2">Try Demo Accounts:</p>
                <div className="space-y-2">
                  {DEMO_ACCOUNTS.map((account, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleDemoLogin(account)}
                      className="w-full text-left px-3 py-2 text-xs bg-secondary hover:bg-secondary/80 rounded transition-smooth"
                    >
                      {account.name} ({account.role})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Error Message */}
            {errors.general && (
              <div className="mb-6 p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-destructive" />
                <p className="text-sm text-destructive">{errors.general}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">Password</label>
                  <a href="#" className="text-xs text-primary hover:underline">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="rounded" defaultChecked />
                <label htmlFor="remember" className="text-sm text-muted-foreground">
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-smooth disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground">OR</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {['Google', 'GitHub', 'Microsoft'].map((provider) => (
                <button
                  key={provider}
                  type="button"
                  className="py-2 px-3 border border-border rounded-lg hover:bg-secondary transition-smooth text-sm font-medium"
                >
                  {provider === 'Google' && '🔵'}
                  {provider === 'GitHub' && '⚫'}
                  {provider === 'Microsoft' && '📘'}
                </button>
              ))}
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-muted-foreground text-sm">
                Don't have an account?{' '}
                <Link href="/signup" className="text-primary hover:underline font-semibold">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>

          {/* Two Factor Notice */}
          <div className="mt-8 p-4 glass-effect border border-border rounded-lg text-center">
            <p className="text-xs text-muted-foreground mb-2">🔐 Two-Factor Authentication</p>
            <p className="text-xs text-foreground">
              Your account is protected with optional 2FA for enhanced security
            </p>
          </div>
        </div>
      </div>

      <AIAssistant />
    </div>
  );
}

export default function LoginPage() {
  return (
    <AppProvider>
      <LoginContent />
    </AppProvider>
  );
}
