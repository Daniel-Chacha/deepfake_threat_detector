'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { AIAssistant } from '@/components/ai-assistant';
import { AppProvider, useApp } from '@/lib/context';
import { MetallicPricingCard } from '@/components/metallic-pricing-card';
import Link from 'next/link';
import { Check, X, CreditCard, Smartphone, Zap } from 'lucide-react';

function PricingContent() {
  const { user } = useApp();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        { name: 'Up to 10 detections/month', included: true },
        { name: 'Video detection', included: true },
        { name: 'Image detection', included: true },
        { name: 'Audio detection', included: false },
        { name: 'Detailed reports', included: false },
        { name: 'Batch processing', included: false },
        { name: 'API access', included: false },
        { name: 'Priority support', included: false },
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: billingPeriod === 'monthly' ? 29 : 290,
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: 'For professionals and teams',
      features: [
        { name: 'Up to 500 detections/month', included: true },
        { name: 'Video detection', included: true },
        { name: 'Image detection', included: true },
        { name: 'Audio detection', included: true },
        { name: 'Detailed reports', included: true },
        { name: 'Batch processing', included: true },
        { name: 'API access', included: false },
        { name: 'Priority support', included: true },
      ],
      cta: 'Start Pro Trial',
      highlighted: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: billingPeriod === 'monthly' ? 99 : 990,
      period: billingPeriod === 'monthly' ? '/month' : '/year',
      description: 'For large organizations',
      features: [
        { name: 'Unlimited detections', included: true },
        { name: 'Video detection', included: true },
        { name: 'Image detection', included: true },
        { name: 'Audio detection', included: true },
        { name: 'Detailed reports', included: true },
        { name: 'Batch processing', included: true },
        { name: 'API access', included: true },
        { name: 'Priority support', included: true },
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Choose the perfect plan for your deepfake detection needs
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-secondary rounded-full p-1 mb-12">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-full font-semibold transition-smooth ${
                billingPeriod === 'monthly'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-full font-semibold transition-smooth relative ${
                billingPeriod === 'yearly'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              Yearly
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-accent text-accent-foreground px-2 py-1 rounded whitespace-nowrap">
                Save 17%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-12 mb-16">
            {plans.map((plan) => {
              if (plan.highlighted) {
                // Use metallic card for highlighted plan
                return (
                  <MetallicPricingCard
                    key={plan.id}
                    label="MOST POPULAR"
                    title={plan.name}
                    price={`$${plan.price}`}
                    period={plan.period}
                    description={plan.description}
                    features={plan.features.map((f) => f.name)}
                    buttonText={plan.cta}
                    highlighted={true}
                    onButtonClick={() => {
                      // Navigate to payment
                    }}
                  />
                );
              }

              // Use regular card for non-highlighted plans
              return (
                <div
                  key={plan.id}
                  className="relative rounded-2xl transition-smooth transform hover:scale-105 w-80 glass-effect border border-border p-8 hover:border-primary"
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                    <div className="mb-4">
                      <span className="text-5xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground ml-2">{plan.period}</span>
                    </div>
                  </div>

                  <button className="w-full py-3 px-4 rounded-lg font-semibold transition-smooth mb-8 border-2 border-primary text-primary hover:bg-primary/10">
                    {plan.cta}
                  </button>

                  <div className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-accent flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Payment Methods */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Flexible Payment Methods</h2>
              <p className="text-muted-foreground">We accept multiple payment options for your convenience</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <CreditCard className="w-12 h-12" />,
                  title: 'Stripe',
                  description: 'Credit cards, Apple Pay, Google Pay',
                },
                {
                  icon: <Smartphone className="w-12 h-12" />,
                  title: 'M-Pesa',
                  description: 'Mobile money payment for Africa',
                },
                {
                  icon: <Zap className="w-12 h-12" />,
                  title: 'PayPal',
                  description: 'Fast and secure PayPal payments',
                },
              ].map((method, i) => (
                <div key={i} className="text-center p-6 rounded-xl bg-secondary/50 hover:bg-secondary transition-smooth">
                  <div className="text-accent mb-4 flex justify-center">{method.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{method.title}</h3>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                q: 'Can I upgrade or downgrade my plan anytime?',
                a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.',
              },
              {
                q: 'Is there a free trial for Pro and Enterprise plans?',
                a: 'Yes, all paid plans include a 14-day free trial with full access to all features.',
              },
              {
                q: 'What happens if I exceed my detection limit?',
                a: 'You\'ll be notified when approaching your limit. You can upgrade anytime or purchase additional detections.',
              },
              {
                q: 'Do you offer discounts for annual billing?',
                a: 'Yes! Annual plans offer 17% savings compared to monthly billing.',
              },
              {
                q: 'Is there customer support?',
                a: 'All plans include email support. Pro and Enterprise plans include priority support.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Absolutely! You can cancel your subscription at any time with no questions asked.',
              },
            ].map((faq, i) => (
              <div key={i} className="p-6 glass-effect border border-border rounded-lg hover:border-primary transition-smooth">
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start?</h2>
          <p className="text-lg text-white/90 mb-8">
            Join thousands of users protecting against deepfakes today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 bg-white text-primary rounded-lg font-bold hover:bg-white/90 transition-smooth"
            >
              Get Started Free
            </Link>
            {user?.role === 'admin' && (
              <Link
                href="/admin"
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-smooth"
              >
                Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      <AIAssistant />
    </div>
  );
}

export default function PricingPage() {
  return (
    <AppProvider>
      <PricingContent />
    </AppProvider>
  );
}
