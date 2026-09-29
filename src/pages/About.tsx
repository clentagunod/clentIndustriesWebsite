import { siteConfig } from '@/config/site';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { TerminalWindow } from '@/components/ui/TerminalWindow';

export default function About() {
  useDocumentTitle('About');
  return (
    <div className="container page">
      <header className="page-head">
        <h1>About {siteConfig.name}</h1>
        <p>{siteConfig.mission}</p>
      </header>
      <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {siteConfig.values.map((v) => (
          <TerminalWindow key={v.title} as="section" title={v.title.toLowerCase().replace(/\s+/g, '-') + '.txt'}>
            <h3 style={{ marginBottom: 8 }}>{v.title}</h3>
            <p>{v.body}</p>
          </TerminalWindow>
        ))}
      </div>
    </div>
  );
}
