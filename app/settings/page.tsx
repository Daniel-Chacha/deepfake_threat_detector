'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { AIAssistant } from '@/components/ai-assistant';
import { AppProvider, useApp } from '@/lib/context';
import Link from 'next/link';
import { ArrowLeft, Bell, Lock, Eye, Volume2, Type } from 'lucide-react';

function SettingsContent() {
  const { user, fontSize, setFontSize, theme, toggleTheme } = useApp();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    securityAlerts: true,
    marketingEmails: false,
    twoFactor: false,
    privateProfile: false,
    showActivity: true,
  });

  const handleToggle = (key: string) => {
    setSettings({ ...settings, [key]: !settings[key as keyof typeof settings] });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Please sign in to access settings</h1>
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground mb-12">Manage your preferences and security settings</p>

        {/* Settings Grid */}
        <div className="space-y-6">
          {/* Appearance Settings */}
          <div className="glass-effect border border-border p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">Appearance</h2>

            {/* Theme */}
            <div className="mb-6 pb-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold mb-1">Theme</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred color scheme
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth"
                >
                  {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['dark', 'light', 'auto'].map((t) => (
                  <button
                    key={t}
                    className={`p-4 rounded-lg border-2 transition-smooth ${
                      theme === t
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {t === 'dark' && '🌙 Dark'}
                    {t === 'light' && '☀️ Light'}
                    {t === 'auto' && '🔄 Auto'}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Type className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Font Size</h3>
              </div>
              <div className="flex items-center gap-4">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 transition-smooth ${
                      fontSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {size === 'small' && 'A'}
                    {size === 'medium' && 'A'}
                    {size === 'large' && 'A'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="glass-effect border border-border p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Bell className="w-6 h-6" />
              Notifications
            </h2>

            <div className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'Email Notifications', desc: 'Get notified via email' },
                { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications' },
                { key: 'securityAlerts', label: 'Security Alerts', desc: 'Important security updates' },
                { key: 'marketingEmails', label: 'Marketing Emails', desc: 'News and promotions' },
              ].map((setting) => (
                <div
                  key={setting.key}
                  className="flex items-center justify-between p-4 hover:bg-secondary rounded-lg transition-smooth"
                >
                  <div>
                    <p className="font-medium">{setting.label}</p>
                    <p className="text-sm text-muted-foreground">{setting.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings[setting.key as keyof typeof settings]}
                    onChange={() => handleToggle(setting.key)}
                    className="w-5 h-5 rounded cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="glass-effect border border-border p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Eye className="w-6 h-6" />
              Privacy
            </h2>

            <div className="space-y-4">
              {[
                { key: 'privateProfile', label: 'Private Profile', desc: 'Make your profile private' },
                { key: 'showActivity', label: 'Show Activity', desc: 'Show your activity to others' },
              ].map((setting) => (
                <div
                  key={setting.key}
                  className="flex items-center justify-between p-4 hover:bg-secondary rounded-lg transition-smooth"
                >
                  <div>
                    <p className="font-medium">{setting.label}</p>
                    <p className="text-sm text-muted-foreground">{setting.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings[setting.key as keyof typeof settings]}
                    onChange={() => handleToggle(setting.key)}
                    className="w-5 h-5 rounded cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Security Settings */}
          <div className="glass-effect border border-border p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Lock className="w-6 h-6" />
              Security
            </h2>

            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 hover:bg-secondary rounded transition-smooth font-medium">
                🔐 Change Password
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-secondary rounded transition-smooth font-medium">
                <div className="flex items-center justify-between">
                  <span>🔑 Two-Factor Authentication</span>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded ${
                      settings.twoFactor
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {settings.twoFactor ? 'ENABLED' : 'DISABLED'}
                  </span>
                </div>
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-secondary rounded transition-smooth font-medium">
                📱 Manage Devices
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-secondary rounded transition-smooth font-medium">
                🔏 View Login History
              </button>
            </div>
          </div>

          {/* Data & Privacy */}
          <div className="glass-effect border border-border p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">Data & Privacy</h2>

            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 hover:bg-secondary rounded transition-smooth font-medium">
                📥 Download Your Data
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-secondary rounded transition-smooth font-medium">
                🗑️ Delete All Detections
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-secondary rounded transition-smooth font-medium">
                📋 Data Retention Policy
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="glass-effect border-2 border-destructive/30 p-6 rounded-xl bg-destructive/5">
            <h2 className="text-2xl font-bold mb-6 text-destructive">Danger Zone</h2>

            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 hover:bg-destructive/10 rounded transition-smooth font-medium text-destructive">
                🚨 Logout All Sessions
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-destructive/10 rounded transition-smooth font-medium text-destructive">
                ❌ Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <AIAssistant />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <AppProvider>
      <SettingsContent />
    </AppProvider>
  );
}
