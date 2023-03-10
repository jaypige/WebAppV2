import { useEffect } from 'react';
import { useSocket } from './setUpSocket.js';

export const useSocketEffect = () => {
  const cleanup = useSocket();

  useEffect(() => {
    return cleanup;
  }, []);
}
