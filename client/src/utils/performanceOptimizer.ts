// Performance optimization utilities for reducing TBT and improving LCP

export class PerformanceOptimizer {
  private static observer: IntersectionObserver | null = null;
  private static loadedImages = new Set<string>();

  // Break long tasks into smaller chunks to reduce TBT
  static async scheduleWork<T>(
    tasks: (() => T | Promise<T>)[],
    timeSlice: number = 5
  ): Promise<T[]> {
    const results: T[] = [];
    
    for (let i = 0; i < tasks.length; i++) {
      const startTime = performance.now();
      
      try {
        const result = await tasks[i]();
        results.push(result);
      } catch (error) {
        console.error('Task failed:', error);
        throw error;
      }
      
      // Yield control if we've used our time slice
      if (performance.now() - startTime > timeSlice) {
        await this.yieldToMain();
      }
    }
    
    return results;
  }

  // Yield control back to the main thread
  static yieldToMain(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, 0);
    });
  }

  // Lazy load images with intersection observer
  static initLazyLoading(): void {
    if (!('IntersectionObserver' in window) || this.observer) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            this.loadImage(img);
            this.observer?.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px 0px', // Start loading 50px before image enters viewport
        threshold: 0.01
      }
    );

    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach((img) => {
      this.observer?.observe(img);
    });
  }

  // Load image with proper error handling
  private static async loadImage(img: HTMLImageElement): Promise<void> {
    const src = img.dataset.src;
    if (!src || this.loadedImages.has(src)) return;

    return new Promise((resolve, reject) => {
      const newImg = new Image();
      
      newImg.onload = () => {
        img.src = src;
        img.classList.add('loaded');
        this.loadedImages.add(src);
        resolve();
      };
      
      newImg.onerror = () => {
        img.classList.add('error');
        reject(new Error(`Failed to load image: ${src}`));
      };
      
      newImg.src = src;
    });
  }

  // Preload critical resources
  static preloadCriticalResources(resources: Array<{
    href: string;
    as: 'image' | 'script' | 'style' | 'font';
    type?: string;
    crossorigin?: string;
  }>): void {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      
      if (resource.type) link.type = resource.type;
      if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
      
      document.head.appendChild(link);
    });
  }

  // Load scripts asynchronously to avoid blocking
  static async loadScriptAsync(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      
      document.head.appendChild(script);
    });
  }

  // Defer non-critical scripts until page is interactive
  static deferNonCriticalScripts(): void {
    const deferredScripts = [
      'https://www.googletagmanager.com/gtag/js',
      'https://connect.facebook.net/en_US/fbevents.js',
      'https://sdk.dfktv2.com/uchatWidget.js'
    ];

    // Wait for page to be fully interactive
    if (document.readyState === 'complete') {
      this.loadDeferredScripts(deferredScripts);
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => this.loadDeferredScripts(deferredScripts), 1000);
      });
    }
  }

  private static async loadDeferredScripts(scripts: string[]): Promise<void> {
    // Load scripts one by one to avoid overwhelming the main thread
    for (const script of scripts) {
      try {
        await this.loadScriptAsync(script);
        await this.yieldToMain(); // Give the main thread a break
      } catch (error) {
        console.warn('Failed to load deferred script:', script, error);
      }
    }
  }

  // Optimize images by setting proper dimensions
  static fixImageDimensions(): void {
    const images = document.querySelectorAll('img:not([width]):not([height])');
    
    images.forEach((img: Element) => {
      const imgElement = img as HTMLImageElement;
      
      if (imgElement.complete && imgElement.naturalWidth > 0) {
        this.setImageDimensions(imgElement);
      } else {
        imgElement.addEventListener('load', () => this.setImageDimensions(imgElement));
      }
    });
  }

  private static setImageDimensions(img: HTMLImageElement): void {
    // Set dimensions based on natural size or container
    const containerWidth = img.parentElement?.offsetWidth || 300;
    const aspectRatio = img.naturalHeight / img.naturalWidth;
    
    if (!img.hasAttribute('width')) {
      img.width = Math.min(img.naturalWidth, containerWidth);
    }
    
    if (!img.hasAttribute('height')) {
      img.height = Math.round(img.width * aspectRatio);
    }
    
    // Set CSS aspect ratio for layout stability
    img.style.aspectRatio = `${img.width} / ${img.height}`;
  }

  // Initialize all performance optimizations
  static initialize(): void {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.runOptimizations());
    } else {
      this.runOptimizations();
    }
  }

  private static runOptimizations(): void {
    this.initLazyLoading();
    this.fixImageDimensions();
    this.deferNonCriticalScripts();
    
    // Preload critical LCP image
    const lcpImage = '/images/horizontal_4.png';
    this.preloadCriticalResources([
      { href: lcpImage, as: 'image' }
    ]);
    
    console.log('🚀 Performance optimizations initialized');
  }

  // Monitor Core Web Vitals
  static monitorWebVitals(): void {
    // LCP (Largest Contentful Paint)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID (First Input Delay) / INP (Interaction to Next Paint)
    new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach((entry) => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });

    // CLS (Cumulative Layout Shift)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      console.log('CLS:', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }
}