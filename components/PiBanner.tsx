
import React, { useState, useEffect } from 'react';
import { usePiSDKReady } from '../hooks/usePiSDKReady';

export const PiBanner: React.FC = () => {
  const sdkReady = usePiSDKReady();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sdkReady) {
        setShowBanner(true);
      }
    }, 3000); // Show banner after 3 seconds if SDK is still not ready

    return () => clearTimeout(timer);
  }, [sdkReady]);

  if (sdkReady || !showBanner) {
    return null;
  }

  return (
    <div className="bg-yellow-400 text-center p-2 text-sm text-black font-semibold">
      For the best experience and to enable payments, please open this site in the Pi Browser.
    </div>
  );
};
