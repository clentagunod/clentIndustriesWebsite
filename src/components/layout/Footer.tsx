import { siteConfig } from '@/config/site';
import { cx } from '@/lib/cx';
import s from './Footer.module.css';

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={cx('container', s.inner)}>
        <span>&copy; {new Date().getFullYear()} {siteConfig.name}</span>
        <ul className={s.links}>
          {siteConfig.contact.links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
