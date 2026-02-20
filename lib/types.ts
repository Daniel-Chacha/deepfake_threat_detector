export type UserRole = 'user' | 'admin' | 'moderator';
export type SubscriptionPlan = 'free' | 'pro' | 'enterprise';
export type ContentType = 'video' | 'image' | 'audio';
export type DetectionResultType = 'real' | 'deepfake' | 'uncertain';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  subscription: SubscriptionPlan;
  subscriptionExpiry?: Date;
  fontSize: 'small' | 'medium' | 'large';
  theme: 'light' | 'dark' | 'auto';
  detectionsMade: number;
  createdAt: Date;
}

export interface Detection {
  id: string;
  userId: string;
  contentType: ContentType;
  contentUrl: string;
  result: DetectionResultType;
  confidence: number;
  details: string;
  region?: string;
  createdAt: Date;
}

export interface SubscriptionPlanInfo {
  id: SubscriptionPlan;
  name: string;
  price: number;
  currency: string;
  features: string[];
  detectionsPerMonth: number;
  storageGB: number;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  method: 'stripe' | 'paypal' | 'mpesa';
  status: 'pending' | 'completed' | 'failed';
  planId: SubscriptionPlan;
  createdAt: Date;
}

export interface AIAssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface RegionData {
  region: string;
  deepfakesDetected: number;
  totalAnalyzed: number;
  riskLevel: 'low' | 'medium' | 'high';
}
