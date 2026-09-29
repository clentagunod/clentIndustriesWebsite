import { cx } from '@/lib/cx';
import s from './Logo.module.css';

interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}

/** Mark: a "C" built from terminal brackets holding a block cursor. */
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg className={s.mark} width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="ClentIndustries logo">
      <path d="M38 11H12v26h26" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" />
      <path d="M43 6v5M43 37v5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="square" />
      <rect className={s.cursor} x="21" y="20" width="9" height="9" fill="currentColor" />
    </svg>
  );
}

export function Logo({ size = 36, showWordmark = true, className }: LogoProps) {
  return (
    <span className={cx(s.logo, className)}>
      <LogoMark size={size} />
      {showWordmark && (
        <span className={s.word}>
          Clent<span className={s.dim}>Industries</span>
        </span>
      )}
    </span>
  );
}
