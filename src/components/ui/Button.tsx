import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cx } from '@/lib/cx';
import s from './Button.module.css';

type Variant = 'solid' | 'outline';

interface Common { variant?: Variant; children: ReactNode; className?: string }
type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined };
type AsRoute = Common & { to: string; href?: undefined };
type AsAnchor = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: undefined };

export type ButtonProps = AsButton | AsRoute | AsAnchor;

/** One component for buttons, router links, and file/external links. */
export function Button(props: ButtonProps) {
  const { variant = 'solid', className, children } = props;
  const cls = cx(s.btn, s[variant], className);

  if (props.to !== undefined) {
    return <Link to={props.to} className={cls}>{children}</Link>;
  }
  if (props.href !== undefined) {
    const { variant: _v, className: _c, children: _ch, to: _t, ...rest } = props;
    return <a className={cls} {...rest}>{children}</a>;
  }
  const { variant: _v, className: _c, children: _ch, to: _t, href: _h, ...rest } = props;
  return <button className={cls} type="button" {...rest}>{children}</button>;
}
