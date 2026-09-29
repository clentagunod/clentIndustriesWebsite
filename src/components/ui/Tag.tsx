import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import s from './Tag.module.css';

export function Tag({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'accent' }) {
  return <span className={cx(s.tag, tone === 'accent' && s.accent)}>{children}</span>;
}
