import { useState, useEffect } from 'react';

export interface UseApiOptions<T> {
  immediate?: boolean;
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiOptions<T> = {}
): UseApiReturn<T> {
  const { immediate = false, initialData = null, onSuccess, onError } = options;
  
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<Error | null>(null);

  const execute = async (...args: any[]): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiFunction(...args);
      setData(result);
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      
      if (onError) {
        onError(error);
      }
      
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(initialData);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []);

  return { data, loading, error, execute, reset };
}