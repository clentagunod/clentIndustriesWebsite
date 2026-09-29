import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import s from './TerminalWindow.module.css';

interface Props {
  title: string;
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section';
}

/** The shared window chrome used by every card and panel on the site. */
export function TerminalWindow({ title, children, className, as: Tag = 'div' }: Props) {
  return (
    <Tag className={cx(s.window, className)}>
      <div className={s.bar} aria-hidden="true">
        <i style={{ background: 'var(--danger)' }} />
        <i style={{ background: 'var(--accent)' }} />
        <i style={{ background: 'var(--fg)' }} />
        <span className={s.title}>{title}</span>
      </div>
      <div className={s.body}>{children}</div>
    </Tag>
  );
}
