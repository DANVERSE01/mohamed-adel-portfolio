/**
 * Enterprise AI Orchestration System
 * 
 * Features:
 * - Multi-provider support (Gemini, Replicate, Fal.ai)
 * - Automatic fallback
 * - Rate limiting
 * - Response caching
 * - Error recovery
 * - Cost optimization
 * 
 * @module AIOrchestrator
 * @version 1.0.0
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

interface AIProvider {
  name: string;
  endpoint: string;
  apiKey: string;
  priority: number;
  rateLimit: number; // requests per minute
  costPerRequest: number; // in USD
}

interface GenerationRequest {
  prompt: string;
  model?: string;
  options?: Record<string, any>;
}

interface GenerationResponse {
  content: string | Blob;
  provider: string;
  latency: number;
  cached: boolean;
  cost: number;
}

interface CacheEntry {
  content: string | Blob;
  timestamp: number;
  hits: number;
  provider: string;
}

class AIOrchestrator {
  private static instance: AIOrchestrator;
  private providers: Map<string, AIProvider> = new Map();
  private cache: Map<string, CacheEntry> = new Map();
  private rateLimiters: Map<string, number[]> = new Map();
  private geminiClient: GoogleGenerativeAI | null = null;
  
  private readonly CACHE_TTL = 3600000; // 1 hour
  private readonly MAX_CACHE_SIZE = 100;
  
  private constructor() {
    this.initializeProviders();
  }
  
  public static getInstance(): AIOrchestrator {
    if (!AIOrchestrator.instance) {
      AIOrchestrator.instance = new AIOrchestrator();
    }
    return AIOrchestrator.instance;
  }
  
  /**
   * Initialize AI providers with fallback order
   */
  private initializeProviders(): void {
    // Google Gemini (Free, highest priority)
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (geminiKey) {
      this.providers.set('gemini', {
        name: 'Google Gemini',
        endpoint: 'https://generativelanguage.googleapis.com/v1',
        apiKey: geminiKey,
        priority: 1,
        rateLimit: 60,
        costPerRequest: 0,
      });
      
      this.geminiClient = new GoogleGenerativeAI(geminiKey);
    }
    
    // Replicate (Free tier)
    const replicateKey = import.meta.env.VITE_REPLICATE_API_KEY;
    if (replicateKey) {
      this.providers.set('replicate', {
        name: 'Replicate',
        endpoint: 'https://api.replicate.com/v1',
        apiKey: replicateKey,
        priority: 2,
        rateLimit: 10,
        costPerRequest: 0.001,
      });
    }
    
    // Fal.ai (via Cloudflare Worker)
    const cloudflareProxy = import.meta.env.VITE_CLOUDFLARE_WORKER_URL;
    if (cloudflareProxy) {
      this.providers.set('fal', {
        name: 'Fal.ai',
        endpoint: cloudflareProxy,
        apiKey: '', // Handled by worker
        priority: 3,
        rateLimit: 5,
        costPerRequest: 0.01,
      });
    }
    
    console.log(
      `%c[AI Orchestrator] Initialized ${this.providers.size} providers`,
      'color: #4a9eff; font-weight: bold;'
    );
  }
  
  /**
   * Generate content with automatic provider selection and fallback
   */
  public async generate(request: GenerationRequest): Promise<GenerationResponse> {
    const startTime = performance.now();
    const cacheKey = this.getCacheKey(request);
    
    // Check cache first
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      console.log('%c[AI] Cache hit!', 'color: #0cce6b;');
      return {
        content: cached.content,
        provider: cached.provider,
        latency: performance.now() - startTime,
        cached: true,
        cost: 0,
      };
    }
    
    // Get available providers sorted by priority
    const availableProviders = Array.from(this.providers.values())
      .filter(p => this.checkRateLimit(p.name))
      .sort((a, b) => a.priority - b.priority);
    
    if (availableProviders.length === 0) {
      throw new Error('No AI providers available. Rate limits exceeded.');
    }
    
    // Try providers in order with fallback
    let lastError: Error | null = null;
    
    for (const provider of availableProviders) {
      try {
        console.log(`%c[AI] Trying ${provider.name}...`, 'color: #4a9eff;');
        
        const content = await this.generateWithProvider(provider, request);
        const latency = performance.now() - startTime;
        
        // Cache the result
        this.addToCache(cacheKey, content, provider.name);
        
        // Track rate limit
        this.trackRequest(provider.name);
        
        console.log(
          `%c[AI] Success with ${provider.name} (${latency.toFixed(0)}ms)`,
          'color: #0cce6b; font-weight: bold;'
        );
        
        return {
          content,
          provider: provider.name,
          latency,
          cached: false,
          cost: provider.costPerRequest,
        };
      } catch (error) {
        lastError = error as Error;
        console.warn(
          `%c[AI] ${provider.name} failed: ${lastError.message}`,
          'color: #ffa500;'
        );
        
        // Continue to next provider
        continue;
      }
    }
    
    // All providers failed
    throw new Error(
      `All AI providers failed. Last error: ${lastError?.message || 'Unknown'}`
    );
  }
  
  /**
   * Generate content using specific provider
   */
  private async generateWithProvider(
    provider: AIProvider,
    request: GenerationRequest
  ): Promise<string | Blob> {
    switch (provider.name) {
      case 'Google Gemini':
        return this.generateWithGemini(request);
      
      case 'Replicate':
        return this.generateWithReplicate(provider, request);
      
      case 'Fal.ai':
        return this.generateWithFal(provider, request);
      
      default:
        throw new Error(`Unknown provider: ${provider.name}`);
    }
  }
  
  /**
   * Generate with Google Gemini (Free)
   */
  private async generateWithGemini(request: GenerationRequest): Promise<string> {
    if (!this.geminiClient) {
      throw new Error('Gemini client not initialized');
    }
    
    const model = this.geminiClient.getGenerativeModel({
      model: request.model || 'gemini-1.5-flash',
    });
    
    const result = await model.generateContent(request.prompt);
    const response = await result.response;
    return response.text();
  }
  
  /**
   * Generate with Replicate
   */
  private async generateWithReplicate(
    provider: AIProvider,
    request: GenerationRequest
  ): Promise<string> {
    const response = await fetch(`${provider.endpoint}/predictions`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${provider.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: request.model || 'stability-ai/sdxl',
        input: {
          prompt: request.prompt,
          ...request.options,
        },
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Replicate API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Poll for result
    return this.pollReplicatePrediction(provider, data.id);
  }
  
  /**
   * Poll Replicate prediction until complete
   */
  private async pollReplicatePrediction(
    provider: AIProvider,
    predictionId: string
  ): Promise<string> {
    const maxAttempts = 30;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const response = await fetch(
        `${provider.endpoint}/predictions/${predictionId}`,
        {
          headers: {
            'Authorization': `Token ${provider.apiKey}`,
          },
        }
      );
      
      const data = await response.json();
      
      if (data.status === 'succeeded') {
        return data.output;
      }
      
      if (data.status === 'failed') {
        throw new Error(`Prediction failed: ${data.error}`);
      }
      
      // Wait before next poll
      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;
    }
    
    throw new Error('Prediction timeout');
  }
  
  /**
   * Generate with Fal.ai via Cloudflare Worker
   */
  private async generateWithFal(
    provider: AIProvider,
    request: GenerationRequest
  ): Promise<Blob> {
    const response = await fetch(provider.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: request.prompt,
        ...request.options,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Fal.ai error: ${response.statusText}`);
    }
    
    return response.blob();
  }
  
  /**
   * Check if provider is within rate limit
   */
  private checkRateLimit(providerName: string): boolean {
    const provider = Array.from(this.providers.values())
      .find(p => p.name === providerName);
    
    if (!provider) return false;
    
    const requests = this.rateLimiters.get(providerName) || [];
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    
    // Remove old requests
    const recentRequests = requests.filter(time => time > oneMinuteAgo);
    
    return recentRequests.length < provider.rateLimit;
  }
  
  /**
   * Track a request for rate limiting
   */
  private trackRequest(providerName: string): void {
    const requests = this.rateLimiters.get(providerName) || [];
    requests.push(Date.now());
    this.rateLimiters.set(providerName, requests);
  }
  
  /**
   * Generate cache key from request
   */
  private getCacheKey(request: GenerationRequest): string {
    const str = JSON.stringify({
      prompt: request.prompt,
      model: request.model,
      options: request.options,
    });
    
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    
    return `ai_${hash}`;
  }
  
  /**
   * Get content from cache
   */
  private getFromCache(key: string): CacheEntry | null {
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    // Check if expired
    if (Date.now() - entry.timestamp > this.CACHE_TTL) {
      this.cache.delete(key);
      return null;
    }
    
    // Increment hit count
    entry.hits++;
    
    return entry;
  }
  
  /**
   * Add content to cache
   */
  private addToCache(
    key: string,
    content: string | Blob,
    provider: string
  ): void {
    // Enforce max cache size
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      // Remove oldest entry
      const oldest = Array.from(this.cache.entries())
        .sort((a, b) => a[1].timestamp - b[1].timestamp)[0];
      
      if (oldest) {
        this.cache.delete(oldest[0]);
      }
    }
    
    this.cache.set(key, {
      content,
      timestamp: Date.now(),
      hits: 0,
      provider,
    });
  }
  
  /**
   * Get cache statistics
   */
  public getCacheStats() {
    const entries = Array.from(this.cache.values());
    return {
      size: this.cache.size,
      totalHits: entries.reduce((sum, e) => sum + e.hits, 0),
      avgAge: entries.reduce((sum, e) => sum + (Date.now() - e.timestamp), 0) / entries.length,
    };
  }
  
  /**
   * Clear cache
   */
  public clearCache(): void {
    this.cache.clear();
  }
}

export default AIOrchestrator;
export { type GenerationRequest, type GenerationResponse };