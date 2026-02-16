import { useState, useEffect, useCallback } from "react";

interface UseFetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

interface UseFetchOptions {
  enabled?: boolean;
  retryOnError?: boolean;
  maxRetries?: number;
}

export function useFetch<T>(
  url: string,
  options: UseFetchOptions = {},
): UseFetchState<T> & { refetch: () => void } {
  const { enabled = true, retryOnError = false, maxRetries = 3 } = options;
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      let data: T;

      if (contentType?.includes("application/json")) {
        data = await response.json();
      } else {
        data = (await response.text()) as unknown as T;
      }

      setState({ data, isLoading: false, error: null });
      setRetryCount(0);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      console.error("Fetch error:", errorMessage);
      setState({ data: null, isLoading: false, error: errorMessage });

      if (retryOnError && retryCount < maxRetries) {
        setRetryCount((prev) => prev + 1);
        setTimeout(fetchData, 1000 * (retryCount + 1));
      }
    }
  }, [url, enabled, retryOnError, maxRetries, retryCount]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    setRetryCount(0);
    fetchData();
  }, [fetchData]);

  return { ...state, refetch };
}
