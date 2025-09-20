import React from 'react';
import { usePiSDKReady } from '../hooks/usePiSDKReady';

interface PiGuardProps {
  // Fix: By typing `children` to be a React.ReactElement that accepts `disabled` and `style` props,
  // we resolve the overload error for `React.cloneElement` below. This makes the component's
  // contract clearer: it expects a child that can be disabled.
  children: React.ReactElement<{ disabled?: boolean; style?: React.CSSProperties }>;
}

const PiGuard: React.FC<PiGuardProps> = ({ children }) => {
  const sdkReady = usePiSDKReady();

  if (sdkReady) {
    return children;
  }

  // If SDK is not ready, wrap the child to disable it and add a tooltip.
  return (
    <div className="relative group">
      {React.cloneElement(children, {
        ...children.props,
        disabled: true,
        style: { ...(children.props.style || {}), pointerEvents: 'none' },
      })}
      <div className="absolute bottom-full mb-2 w-max px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Open in Pi Browser to enable
      </div>
    </div>
  );
};

export default PiGuard;
