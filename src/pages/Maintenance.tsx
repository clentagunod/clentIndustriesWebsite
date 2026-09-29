import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { siteConfig } from '@/config/site';
import styles from './Maintenance.module.css';

export default function Maintenance() {
  useDocumentTitle('Maintenance');

  return (
    <main className={styles.maintenance}>
      <section className={styles.panel} aria-labelledby="maintenance-title">
        <div className={styles.topline}>
          <span>{siteConfig.name}</span>
          <span className={styles.status}>Maintenance in progress</span>
        </div>
        <div className={styles.content}>
          <span className={styles.code}>503 / temporarily unavailable</span>
          <h1 id="maintenance-title">We’ll be back shortly.</h1>
          <p>We’re making a few updates. Please check back soon.</p>
        </div>
        <div className={styles.footer}>
          <span>service status</span>
          <span className={styles.indicator}>updating</span>
        </div>
      </section>
    </main>
  );
}