import { useEffect, useRef } from 'react';

function useDebounce() {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const debounce = (callback: any, timeout: number) => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      callback();
    }, timeout);
  };

  useEffect(() => {
    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [timeoutId]);

  return debounce;
}

export default useDebounce;
