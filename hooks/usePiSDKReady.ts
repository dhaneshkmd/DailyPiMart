
import { useEffect, useState } from 'react';

// This is a browser-only hook.
declare global {
    interface Window {
        Pi?: any;
    }
}

export function usePiSDKReady() {
  const [ready, setReady] = useState(false);
  
  useEffect(() => {
    // This effect runs only on the client.
    const tick = () => {
      const isPiReady = !!(window.Pi?.authenticate && window.Pi?.createPayment);
      if (isPiReady) {
        setReady(true);
      }
    };
    
    tick(); // Check immediately
    const intervalId = setInterval(tick, 500);
    
    // Stop checking after 10 seconds to avoid unnecessary polling
    const timeoutId = setTimeout(() => {
        clearInterval(intervalId);
    }, 10000);
    
    // Cleanup function to clear interval and timeout
    return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
    };
  }, []);
  
  return ready;
}
