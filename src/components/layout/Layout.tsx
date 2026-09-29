import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import s from './Layout.module.css';

export function Layout() {
  return (
    <div className={s.shell}>
      <a href="#main" className={s.skip}>Skip to content</a>
      <Header />
      <main id="main" className={s.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
