import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface PerformanceMetrics {
  lcp: number | null;
  cls: number | null;
  fid: number | null;
  tbt: number | null;
  pageSize: number | null;
  loadTime: number | null;
}

export default function PerformanceMonitor() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    cls: null,
    fid: null,
    tbt: null,
    pageSize: null,
    loadTime: null
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show when user is authenticated as admin
    const showMonitor = user && user.isAuthenticated;
    setIsVisible(!!showMonitor);

    if (!showMonitor) return;

    let clsValue = 0;
    let tbtValue = 0;

    // Measure Largest Contentful Paint (LCP)
    const measureLCP = () => {
      if ('PerformanceObserver' in window) {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          setMetrics(prev => ({ ...prev, lcp: Math.round(lastEntry.startTime) }));
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      }
    };

    // Measure Cumulative Layout Shift (CLS)
    const measureCLS = () => {
      if ('PerformanceObserver' in window) {
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          setMetrics(prev => ({ ...prev, cls: Math.round(clsValue * 1000) / 1000 }));
        }).observe({ entryTypes: ['layout-shift'] });
      }
    };

    // Measure First Input Delay (FID) and Total Blocking Time (TBT)
    const measureInteractivity = () => {
      if ('PerformanceObserver' in window) {
        // FID
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry) => {
            setMetrics(prev => ({ ...prev, fid: Math.round(entry.processingStart - entry.startTime) }));
          });
        }).observe({ entryTypes: ['first-input'] });

        // TBT (approximation using long tasks)
        new PerformanceObserver((entryList) => {
          entryList.getEntries().forEach((entry) => {
            if (entry.duration > 50) {
              tbtValue += entry.duration - 50;
            }
          });
          setMetrics(prev => ({ ...prev, tbt: Math.round(tbtValue) }));
        }).observe({ entryTypes: ['longtask'] });
      }
    };

    // Measure page size and load time
    const measurePageMetrics = () => {
      // Page load time
      const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationTiming) {
        const loadTime = navigationTiming.loadEventEnd - navigationTiming.fetchStart;
        setMetrics(prev => ({ ...prev, loadTime: Math.round(loadTime) }));
      }

      // Approximate page size by measuring resource sizes
      const resources = performance.getEntriesByType('resource');
      let totalSize = 0;
      
      resources.forEach((resource: any) => {
        if (resource.transferSize) {
          totalSize += resource.transferSize;
        }
      });

      setMetrics(prev => ({ ...prev, pageSize: Math.round(totalSize / 1024) })); // KB
    };

    // Initialize measurements
    measureLCP();
    measureCLS();
    measureInteractivity();
    
    // Measure page metrics after load
    if (document.readyState === 'complete') {
      measurePageMetrics();
    } else {
      window.addEventListener('load', measurePageMetrics);
    }

    // Cleanup
    return () => {
      window.removeEventListener('load', measurePageMetrics);
    };
  }, [user]);

  // Helper function to get performance rating
  const getPerformanceRating = (metric: string, value: number | null): 'good' | 'needs-improvement' | 'poor' | 'unknown' => {
    if (value === null) return 'unknown';

    switch (metric) {
      case 'lcp':
        return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
      case 'cls':
        return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
      case 'fid':
        return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
      case 'tbt':
        return value <= 200 ? 'good' : value <= 600 ? 'needs-improvement' : 'poor';
      default:
        return 'unknown';
    }
  };

  const getRatingColor = (rating: string): string => {
    switch (rating) {
      case 'good': return 'text-green-600';
      case 'needs-improvement': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-500';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-lg rounded-lg shadow-lg p-4 text-xs font-mono max-w-xs z-50">
      <h3 className="font-bold text-sm mb-2 text-gray-800">Performance Monitor</h3>
      
      <div className="space-y-1">
        {/* Core Web Vitals */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-gray-600">LCP:</span>
            <span className={`ml-1 font-bold ${getRatingColor(getPerformanceRating('lcp', metrics.lcp))}`}>
              {metrics.lcp ? `${metrics.lcp}ms` : '...'}
            </span>
          </div>
          
          <div>
            <span className="text-gray-600">CLS:</span>
            <span className={`ml-1 font-bold ${getRatingColor(getPerformanceRating('cls', metrics.cls))}`}>
              {metrics.cls !== null ? metrics.cls : '...'}
            </span>
          </div>
          
          <div>
            <span className="text-gray-600">FID:</span>
            <span className={`ml-1 font-bold ${getRatingColor(getPerformanceRating('fid', metrics.fid))}`}>
              {metrics.fid ? `${metrics.fid}ms` : '...'}
            </span>
          </div>
          
          <div>
            <span className="text-gray-600">TBT:</span>
            <span className={`ml-1 font-bold ${getRatingColor(getPerformanceRating('tbt', metrics.tbt))}`}>
              {metrics.tbt ? `${metrics.tbt}ms` : '...'}
            </span>
          </div>
        </div>

        {/* Additional metrics */}
        <div className="border-t pt-2 mt-2">
          <div>
            <span className="text-gray-600">Load Time:</span>
            <span className="ml-1 font-bold text-blue-600">
              {metrics.loadTime ? `${(metrics.loadTime / 1000).toFixed(1)}s` : '...'}
            </span>
          </div>
          
          <div>
            <span className="text-gray-600">Page Size:</span>
            <span className="ml-1 font-bold text-purple-600">
              {metrics.pageSize ? `${(metrics.pageSize / 1024).toFixed(1)}MB` : '...'}
            </span>
          </div>
        </div>

        {/* Performance score indicator */}
        <div className="border-t pt-2 mt-2">
          <div className="text-xs text-gray-500">
            Performance Score: 
            <span className="ml-1 font-bold">
              {(() => {
                const scores = [
                  getPerformanceRating('lcp', metrics.lcp),
                  getPerformanceRating('cls', metrics.cls),
                  getPerformanceRating('fid', metrics.fid)
                ];
                const goodCount = scores.filter(s => s === 'good').length;
                const score = Math.round((goodCount / 3) * 100);
                return `${score}%`;
              })()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}