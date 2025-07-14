import { useEffect } from 'react';

export const usePerformanceMonitor = (componentName) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const startTime = performance.now();
      
      return () => {
        const endTime = performance.now();
        console.log(`${componentName} render time: ${endTime - startTime}ms`);
      };
    }
  });

  const measureFunction = (fn, label) => {
    if (process.env.NODE_ENV === 'development') {
      const start = performance.now();
      const result = fn();
      const end = performance.now();
      console.log(`${label} execution time: ${end - start}ms`);
      return result;
    }
    return fn();
  };

  return { measureFunction };
};