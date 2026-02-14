'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context';
import { Menu, X, ChevronDown, Moon, Sun, Type } from 'lucide-react';

export function Navbar() {
  const { user, setUser, theme, toggleTheme, fontSize, setFontSize } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setProfileMenuOpen(false);
  };

  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    setFontSize(size);
  };

  return (
    <nav className="glass-effect sticky top-0 z-50 w-full border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse-ring">
              <span className="text-white font-bold text-sm">DS</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              DeepfakeSense
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition-smooth">
              Home
            </Link>
            {user && (
              <>
                <Link href="/dashboard" className="text-foreground hover:text-primary transition-smooth">
                  Dashboard
                </Link>
                <Link href="/detect" className="text-foreground hover:text-primary transition-smooth">
                  Detect
                </Link>
              </>
            )}
            <Link href="/pricing" className="text-foreground hover:text-primary transition-smooth">
              Pricing
            </Link>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-secondary rounded-lg transition-smooth"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-accent" />
              ) : (
                <Moon className="w-5 h-5 text-primary" />
              )}
            </button>

            {/* Font Size */}
            <div className="hidden sm:flex items-center gap-1 bg-secondary rounded-lg p-1">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => handleFontSizeChange(size)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-smooth ${
                    fontSize === size
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {size === 'small' ? 'A' : size === 'medium' ? 'A' : 'A'}
                </button>
              ))}
            </div>

            {/* Profile or Auth */}
            {user ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2 p-2 hover:bg-secondary rounded-lg transition-smooth"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-foreground" />
                </button>

                {/* Profile Dropdown */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-effect rounded-lg shadow-lg animate-slide-in-bottom">
                    <div className="p-4 border-b border-border">
                      <p className="font-semibold text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-accent mt-1">
                        Plan: {user.subscription.toUpperCase()}
                      </p>
                    </div>

                    <div className="p-3 space-y-2">
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded transition-smooth"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <span>👤 Edit Profile</span>
                      </Link>

                      <Link
                        href="/settings"
                        className="flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded transition-smooth"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <span>⚙️ Settings</span>
                      </Link>

                      <button
                        onClick={toggleTheme}
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded transition-smooth text-left"
                      >
                        <span>🌙 Dark Mode</span>
                      </button>

                      {user.role === 'admin' && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded transition-smooth text-accent"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <span>👑 Admin Dashboard</span>
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-destructive/10 rounded transition-smooth text-destructive text-left"
                      >
                        <span>🚪 Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-smooth text-sm"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-smooth"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-slide-in-bottom">
            <Link
              href="/"
              className="block px-4 py-2 hover:bg-secondary rounded transition-smooth"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            {user && (
              <>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 hover:bg-secondary rounded transition-smooth"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/detect"
                  className="block px-4 py-2 hover:bg-secondary rounded transition-smooth"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Detect
                </Link>
              </>
            )}
            <Link
              href="/pricing"
              className="block px-4 py-2 hover:bg-secondary rounded transition-smooth"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
