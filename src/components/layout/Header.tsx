import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import { cx } from '@/lib/cx';
import { Logo } from '@/components/ui/Logo';
import s from './Header.module.css';

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={s.header}>
      <div className={cx('container', s.inner)}>
        <Link to="/" aria-label={`${siteConfig.name} home`} className={s.brand}>
          <Logo />
        </Link>
        <button
          type="button"
          className={s.toggle}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '[close]' : '[menu]'}
        </button>
        <nav id="primary-nav" aria-label="Primary" className={cx(s.nav, open && s.open)}>
          {siteConfig.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => cx(s.link, isActive && s.active)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
