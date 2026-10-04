import type { DownloadItem } from '@/types/download';
import { formatDate, platformLabel } from '@/lib/format';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { TerminalWindow } from '@/components/ui/TerminalWindow';
import s from './DownloadCard.module.css';

interface Props {
  item: DownloadItem;
  /** Compact cards hide requirements and changelog (used on Home). */
  compact?: boolean;
  downloadCount?: number;
}

export function DownloadCard({ item, compact = false, downloadCount }: Props) {
  const latest = item.changelog[0];

  return (
    <TerminalWindow as="article" title={`./downloads/${item.id}`}>
      <div className={s.head}>
        <h3>{item.name}</h3>
        <div className={s.tags}>
          <Tag>v{item.version}</Tag>
          <Tag>{platformLabel[item.platform]}</Tag>
          {item.channel === 'beta' && <Tag tone="accent">beta</Tag>}
        </div>
      </div>
      <p>{compact ? item.tagline : item.description}</p>
      {downloadCount !== undefined && (
        <p className={s.downloadCount}>
          {downloadCount.toLocaleString()} download {downloadCount === 1 ? 'start' : 'starts'}
        </p>
      )}

      {!compact && (
        <dl className={s.meta}>
          <div><dt>file</dt><dd>{item.fileName}</dd></div>
          <div><dt>size</dt><dd>{item.sizeLabel}</dd></div>
          <div>
            <dt>released</dt>
            <dd>{item.available && latest ? formatDate(latest.date) : 'Coming soon'}</dd>
          </div>
          {item.sha256 && <div><dt>sha256</dt><dd className={s.hash}>{item.sha256}</dd></div>}
        </dl>
      )}

      {!compact && item.requirements.length > 0 && (
        <div className={s.block}>
          <h4>requirements</h4>
          <ul>{item.requirements.map((r) => <li key={r}>- {r}</li>)}</ul>
        </div>
      )}

      {!compact && latest && (
        <div className={s.block}>
          <h4>changelog v{latest.version}</h4>
          <ul>{latest.notes.map((n) => <li key={n}>- {n}</li>)}</ul>
        </div>
      )}

      <div className={s.actions}>
        {item.available ? (
          <Button to={`/download/${item.id}`}>Download {item.fileName}</Button>
        ) : (
          <Button variant="outline" disabled>Coming soon</Button>
        )}
        {compact && <Button to="/downloads" variant="outline">All downloads</Button>}
      </div>
    </TerminalWindow>
  );
}
