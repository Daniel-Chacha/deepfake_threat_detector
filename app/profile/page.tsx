'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { AIAssistant } from '@/components/ai-assistant';
import { AppProvider, useApp } from '@/lib/context';
import Link from 'next/link';
import { ArrowLeft, Save, Camera, Mail, User as UserIcon, Globe } from 'lucide-react';

function ProfileContent() {
  const { user, setUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSave = () => {
    if (user) {
      const updatedUser = { ...user, name: formData.name };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsEditing(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Please sign in to view profile</h1>
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

        {/* Profile Header */}
        <div className="glass-effect border border-border p-8 rounded-xl mb-8 animate-slide-in-bottom">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-smooth">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <p className="text-muted-foreground flex items-center gap-2 mb-3">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold">
                  {user.subscription.toUpperCase()} Member
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary text-foreground text-sm font-semibold">
                  {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-smooth"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {/* Edit Form */}
          {isEditing && (
            <div className="pt-6 border-t border-border space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email (Read-only)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg opacity-50 cursor-not-allowed"
                  />
                </div>
              </div>

              <button
                onClick={handleSave}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-smooth flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Detections', value: user.detectionsMade, icon: '📊' },
            { label: 'Account Age', value: '3 months', icon: '📅' },
            { label: 'Last Active', value: 'Today', icon: '⏱️' },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-effect border border-border p-6 rounded-xl hover:border-primary transition-smooth"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Account Settings */}
          <div className="glass-effect border border-border p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
            <div className="space-y-4">
              {[
                { label: 'Email Notifications', status: true },
                { label: 'Security Alerts', status: true },
                { label: 'Marketing Emails', status: false },
                { label: 'Two-Factor Authentication', status: false },
              ].map((setting, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-secondary rounded transition-smooth">
                  <span className="font-medium">{setting.label}</span>
                  <input
                    type="checkbox"
                    defaultChecked={setting.status}
                    className="w-5 h-5 rounded cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="glass-effect border border-border p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">Privacy & Security</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 hover:bg-secondary rounded transition-smooth font-medium">
                📋 Change Password
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-secondary rounded transition-smooth font-medium">
                📱 Manage Devices
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-secondary rounded transition-smooth font-medium">
                🔐 Download Data
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-destructive/10 rounded transition-smooth font-medium text-destructive">
                ❌ Delete Account
              </button>
            </div>
          </div>

          {/* Connected Apps */}
          <div className="glass-effect border border-border p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">Connected Applications</h2>
            <div className="space-y-3">
              {[
                { name: 'GitHub', connected: true, lastUsed: '2 days ago' },
                { name: 'Google Drive', connected: true, lastUsed: '1 week ago' },
                { name: 'Slack', connected: false, lastUsed: 'Never' },
              ].map((app, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-secondary rounded transition-smooth">
                  <div>
                    <p className="font-medium">{app.name}</p>
                    <p className="text-xs text-muted-foreground">Last used: {app.lastUsed}</p>
                  </div>
                  <button
                    className={`px-3 py-1 rounded text-sm font-medium transition-smooth ${
                      app.connected
                        ? 'bg-destructive/20 text-destructive hover:bg-destructive/30'
                        : 'bg-primary/20 text-primary hover:bg-primary/30'
                    }`}
                  >
                    {app.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AIAssistant />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AppProvider>
      <ProfileContent />
    </AppProvider>
  );
}
