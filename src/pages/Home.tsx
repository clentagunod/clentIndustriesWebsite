import { siteConfig } from '@/config/site';
import { downloads } from '@/data/downloads';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { LogoMark } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { InteractiveTerminal } from '@/components/terminal/InteractiveTerminal';
import { DownloadCard } from '@/features/downloads/DownloadCard';
import s from './Home.module.css';

export default function Home() {
  useDocumentTitle();
  const featured = downloads.find((d) => d.available) ?? downloads[0];

  return (
    <div className={`container ${s.page}`}>
      <section className={s.hero}>
        <LogoMark size={72} />
        <h1>{siteConfig.tagline}</h1>
        <p>{siteConfig.mission}</p>
        <div className={s.cta}>
          <Button to="/projects">Explore our work</Button>
          <Button to="/downloads" variant="outline">Get the software</Button>
        </div>
      </section>

      <section aria-label="Interactive terminal" className={s.term}>
        <InteractiveTerminal />
      </section>

      {featured && (
        <section aria-labelledby="featured" className={s.featured}>
          <h2 id="featured">Latest release</h2>
          <DownloadCard item={featured} compact />
        </section>
      )}

      <section aria-labelledby="values" className={s.values}>
        <h2 id="values" className="sr-only">Principles</h2>
        {siteConfig.values.map((v) => (
          <div key={v.title} className={s.value}>
            <h3>{v.title}</h3>
            <p>{v.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
