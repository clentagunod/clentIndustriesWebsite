import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/** Reveals `count` items one by one. Returns how many are visible. */
export function useSequence(count: number, intervalMs = 260): number {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (reduced) return;
    if (visible >= count) return;
    const t = window.setTimeout(() => setVisible((v) => v + 1), intervalMs);
    return () => window.clearTimeout(t);
  }, [visible, count, intervalMs, reduced]);

  return reduced ? count : visible;
}
