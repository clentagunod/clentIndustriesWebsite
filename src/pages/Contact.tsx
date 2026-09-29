import { siteConfig } from '@/config/site';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Button } from '@/components/ui/Button';
import { TerminalWindow } from '@/components/ui/TerminalWindow';

export default function Contact() {
  useDocumentTitle('Contact');
  const { email, links } = siteConfig.contact;
  return (
    <div className="container page">
      <header className="page-head">
        <h1>Contact</h1>
        <p>Questions, bug reports, or ideas for the next tool. Email is the fastest way to reach us.</p>
      </header>
      <TerminalWindow title="contact.sh" className="contact-window">
        <dl style={{ display: 'grid', gap: 8, margin: '0 0 20px' }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <dt style={{ width: 90, color: 'var(--fg-faint)' }}>email</dt>
            <dd style={{ margin: 0 }}><a href={`mailto:${email}`}>{email}</a></dd>
          </div>
          {links.map((l) => (
            <div key={l.label} style={{ display: 'flex', gap: 16 }}>
              <dt style={{ width: 90, color: 'var(--fg-faint)' }}>{l.label}</dt>
              <dd style={{ margin: 0 }}><a href={l.href} target="_blank" rel="noopener noreferrer">{l.href.replace('https://', '')}</a></dd>
            </div>
          ))}
        </dl>
        <Button href={`mailto:${email}`}>Send an email</Button>
      </TerminalWindow>
    </div>
  );
}
