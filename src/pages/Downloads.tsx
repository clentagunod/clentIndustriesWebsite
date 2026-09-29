import { downloads } from '@/data/downloads';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { DownloadCard } from '@/features/downloads/DownloadCard';

export default function Downloads() {
  useDocumentTitle('Downloads');
  return (
    <div className="container page">
      <header className="page-head">
        <h1>Downloads</h1>
        <p>Installers for everything we have released. Each one lists its version, size, and requirements.</p>
      </header>
      <div style={{ display: 'grid', gap: 24, maxWidth: 760 }}>
        {downloads.map((item) => <DownloadCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}
