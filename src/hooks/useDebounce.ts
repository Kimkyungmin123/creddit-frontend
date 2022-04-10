import { useEffect } from 'react';

function useDebounce() {
  let timeoutID: NodeJS.Timeout | null = null;

  const debounce = (callback: any, timeout: number) => {
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      callback();
    }, timeout);
  };

  useEffect(() => {
    return () => {
      if (timeoutID) clearTimeout(timeoutID);
    };
  }, [timeoutID]);

  return debounce;
}

export default useDebounce;
