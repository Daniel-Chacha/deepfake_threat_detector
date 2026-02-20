'use client';

import React from 'react';

interface MetallicPricingCardProps {
  label: string;
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  onButtonClick?: () => void;
  highlighted?: boolean;
}

export function MetallicPricingCard({
  label,
  title,
  price,
  period = '/month',
  description,
  features,
  buttonText,
  onButtonClick,
  highlighted = false,
}: MetallicPricingCardProps) {
  return (
    <>
      <svg className="svg-container">
        <defs>
          <filter id="turbulent-displace" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />

            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>

      <div className={`card-container ${highlighted ? 'ring-2 ring-yellow-400' : ''}`} style={{ width: '280px', height: '420px' }}>
        <div className="inner-container">
          <div className="border-outer">
            <div className="main-card"></div>
          </div>
          <div className="glow-layer-1"></div>
          <div className="glow-layer-2"></div>
        </div>

        <div className="overlay-1"></div>
        <div className="overlay-2"></div>
        <div className="background-glow"></div>

        <div className="content-container">
          <div className="content-top">
            <div className="scrollbar-glass">{label}</div>
            <p className="electric-title mt-4">{title}</p>
            <div className="mt-3">
              <span className="text-4xl font-bold text-white">{price}</span>
              {period && <span className="text-sm text-white/60">{period}</span>}
            </div>
            <p className="electric-description mt-2">{description}</p>
          </div>

          <hr className="electric-divider my-4" />

          <div className="content-bottom">
            <ul className="space-y-2 text-sm text-white/80 mb-6">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-silver-medium mt-1">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={onButtonClick}
              className="w-full px-4 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
