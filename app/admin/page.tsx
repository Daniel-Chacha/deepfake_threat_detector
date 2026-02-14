'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { AIAssistant } from '@/components/ai-assistant';
import { AppProvider, useApp } from '@/lib/context';
import {
  Users,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  BarChart3,
  Settings,
  Search,
  MoreVertical,
} from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import Loading from './loading';

function AdminContent() {
  const { user, isAuthenticated } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'payments' | 'reports'>('overview');

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-8">Only administrators can access this page.</p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-smooth"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const adminStats = [
    { label: 'Total Users', value: '3,284', change: '+12%', icon: <Users className="w-6 h-6" />, color: 'text-primary' },
    { label: 'Total Revenue', value: '$124,500', change: '+8%', icon: <DollarSign className="w-6 h-6" />, color: 'text-accent' },
    { label: 'Deepfakes Detected', value: '42,891', change: '+24%', icon: <AlertTriangle className="w-6 h-6" />, color: 'text-orange-500' },
    { label: 'API Calls', value: '1.2M', change: '+18%', icon: <TrendingUp className="w-6 h-6" />, color: 'text-green-500' },
  ];

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', plan: 'Pro', status: 'Active', joined: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', plan: 'Free', status: 'Active', joined: '2024-01-14' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', plan: 'Enterprise', status: 'Active', joined: '2024-01-13' },
    { id: 4, name: 'Alice Johnson', email: 'alice@example.com', plan: 'Pro', status: 'Inactive', joined: '2024-01-12' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', plan: 'Free', status: 'Active', joined: '2024-01-11' },
  ];

  const payments = [
    { id: 'TXN001', user: 'John Doe', amount: '$29', method: 'Stripe', date: '2024-01-18', status: 'Completed' },
    { id: 'TXN002', user: 'Jane Smith', amount: '$99', method: 'PayPal', date: '2024-01-17', status: 'Completed' },
    { id: 'TXN003', user: 'Bob Wilson', amount: '$1500', method: 'Stripe', date: '2024-01-16', status: 'Completed' },
    { id: 'TXN004', user: 'Alice Johnson', amount: '$29', method: 'M-Pesa', date: '2024-01-15', status: 'Pending' },
    { id: 'TXN005', user: 'Charlie Brown', amount: '$49', method: 'Stripe', date: '2024-01-14', status: 'Failed' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {adminStats.map((stat, i) => (
            <div key={i} className="glass-effect border border-border p-6 rounded-xl hover:border-primary transition-smooth">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
                <div className={stat.color}>{stat.icon}</div>
              </div>
              <p className="text-3xl font-bold mb-2">{stat.value}</p>
              <p className="text-sm text-accent">{stat.change} vs last month</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border pb-4 overflow-x-auto">
          {(['overview', 'users', 'payments', 'reports'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-semibold transition-smooth whitespace-nowrap ${
                activeTab === tab
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="glass-effect border border-border p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Add User', icon: '👤' },
                  { label: 'View Reports', icon: '📊' },
                  { label: 'Manage Plans', icon: '💳' },
                  { label: 'System Settings', icon: '⚙️' },
                ].map((action, i) => (
                  <button
                    key={i}
                    className="p-4 rounded-lg border border-border hover:border-primary hover:bg-secondary transition-smooth text-center"
                  >
                    <div className="text-3xl mb-2">{action.icon}</div>
                    <p className="text-sm font-medium">{action.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* System Health */}
            <div className="glass-effect border border-border p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-4">System Health</h2>
              <div className="space-y-3">
                {[
                  { service: 'API Server', status: 'Healthy', uptime: '99.9%' },
                  { service: 'Database', status: 'Healthy', uptime: '99.95%' },
                  { service: 'AI Engine', status: 'Healthy', uptime: '99.8%' },
                  { service: 'Payment Gateway', status: 'Healthy', uptime: '99.99%' },
                ].map((service, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-secondary/50 rounded">
                    <span className="font-medium">{service.service}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-green-500 font-semibold">✓ {service.status}</span>
                      <span className="text-sm text-muted-foreground">{service.uptime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="glass-effect border border-border rounded-xl overflow-hidden">
            {/* Search Bar */}
            <div className="p-6 border-b border-border flex items-center gap-2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search users..."
                className="flex-1 bg-transparent outline-none placeholder-muted-foreground"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-secondary/50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Email</th>
                    <th className="px-6 py-4 text-left font-semibold">Plan</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Joined</th>
                    <th className="px-6 py-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border hover:bg-secondary/50 transition-smooth">
                      <td className="px-6 py-4 font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                          {user.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.status === 'Active'
                              ? 'bg-green-500/20 text-green-500'
                              : 'bg-gray-500/20 text-gray-500'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-sm">{user.joined}</td>
                      <td className="px-6 py-4">
                        <button className="p-2 hover:bg-secondary rounded transition-smooth">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="glass-effect border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-secondary/50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Transaction ID</th>
                    <th className="px-6 py-4 text-left font-semibold">User</th>
                    <th className="px-6 py-4 text-left font-semibold">Amount</th>
                    <th className="px-6 py-4 text-left font-semibold">Method</th>
                    <th className="px-6 py-4 text-left font-semibold">Date</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-border hover:bg-secondary/50 transition-smooth">
                      <td className="px-6 py-4 font-mono text-sm">{payment.id}</td>
                      <td className="px-6 py-4">{payment.user}</td>
                      <td className="px-6 py-4 font-bold">{payment.amount}</td>
                      <td className="px-6 py-4 text-sm">{payment.method}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{payment.date}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            payment.status === 'Completed'
                              ? 'bg-green-500/20 text-green-500'
                              : payment.status === 'Pending'
                                ? 'bg-yellow-500/20 text-yellow-500'
                                : 'bg-red-500/20 text-red-500'
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            {[
              {
                title: 'Weekly Report',
                date: 'Jan 15-21, 2024',
                stats: [
                  { label: 'New Users', value: '234' },
                  { label: 'Detections', value: '5,234' },
                  { label: 'Revenue', value: '$8,234' },
                ],
              },
              {
                title: 'Monthly Report',
                date: 'January 2024',
                stats: [
                  { label: 'Total Users', value: '3,284' },
                  { label: 'Total Detections', value: '42,891' },
                  { label: 'Total Revenue', value: '$42,500' },
                ],
              },
            ].map((report, i) => (
              <div key={i} className="glass-effect border border-border p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{report.title}</h3>
                    <p className="text-sm text-muted-foreground">{report.date}</p>
                  </div>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth">
                    Download
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {report.stats.map((stat, j) => (
                    <div key={j} className="p-4 bg-secondary rounded">
                      <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AIAssistant />
    </div>
  );
}

export default function AdminPage() {
  return (
    <AppProvider>
      <Suspense fallback={<Loading />}>
        <AdminContent />
      </Suspense>
    </AppProvider>
  );
}
