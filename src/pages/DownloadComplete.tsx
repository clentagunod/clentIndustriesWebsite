import { useEffect, useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { downloads } from '@/data/downloads';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import s from './DownloadComplete.module.css';

function BrowserDownloadIllustration({ fileName }: { fileName: string }) {
  return (
    <svg className={s.illustration} viewBox="0 0 520 190" role="img" aria-label={`Illustration of a browser download warning for ${fileName}, with the keep option highlighted`}>
      <rect x="1" y="1" width="518" height="188" rx="8" className={s.window} />
      <path d="M1 34h518" className={s.rule} />
      <circle cx="20" cy="18" r="4" className={s.dot} />
      <circle cx="36" cy="18" r="4" className={s.dot} />
      <circle cx="52" cy="18" r="4" className={s.dot} />
      <rect x="26" y="57" width="40" height="48" rx="4" className={s.fileIcon} />
      <path d="M51 57v15h15" className={s.rule} />
      <text x="83" y="75" className={s.heading}>
        <title>{fileName}</title>
        {fileName.length > 44 ? `${fileName.slice(0, 41)}…` : fileName}
      </text>
      <text x="83" y="98" className={s.body}>This file is not commonly downloaded.</text>
      <rect x="365" y="115" width="127" height="44" rx="4" className={s.highlight} />
      <text x="386" y="143" className={s.highlightText}>Keep anyway</text>
      <path d="M349 137h-36l-12-13" className={s.arrow} />
    </svg>
  );
}

function SmartScreenIllustration() {
  return (
    <svg className={s.illustration} viewBox="0 0 520 190" role="img" aria-label="Illustration of the Windows protected your PC screen: select More info to reveal Run anyway">
      <rect x="1" y="1" width="518" height="188" rx="8" className={s.window} />
      <rect x="26" y="29" width="468" height="132" rx="4" className={s.panel} />
      <path d="M50 52l19-11 19 11v22c0 14-9 24-19 29-10-5-19-15-19-29z" className={s.shield} />
      <path d="M61 68l6 6 11-13" className={s.check} />
      <text x="104" y="60" className={s.heading}>Windows protected your PC</text>
      <text x="104" y="82" className={s.body}>Microsoft Defender SmartScreen prevented</text>
      <text x="104" y="100" className={s.body}>an unrecognized app from starting.</text>
      <rect x="104" y="116" width="95" height="31" rx="3" className={s.highlight} />
      <text x="115" y="136" className={s.highlightText}>More info</text>
      <path d="M207 108l-8-12" className={s.arrow} />
      <text x="222" y="127" className={s.body}>Then choose:</text>
      <rect x="322" y="108" width="142" height="39" rx="3" className={s.button} />
      <text x="337" y="132" className={s.body}>Run anyway</text>
    </svg>
  );
}

export default function DownloadComplete() {
  const { id } = useParams();
  const item = downloads.find((download) => download.id === id && download.available);
  const started = useRef(false);

  useDocumentTitle(item ? `Downloading ${item.name}` : 'Download not found');

  useEffect(() => {
    if (!item || started.current) return;
    started.current = true;

    const link = document.createElement('a');
    link.href = item.fileUrl;
    link.download = item.fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, [item]);

  if (!item) return <Navigate to="/downloads" replace />;

  const isWindows = item.platform === 'windows';

  return (
    <div className={`container page ${s.page}`}>
      <header className={`page-head ${s.intro}`}>
        <span className={s.eyebrow}>download / ready</span>
        <h1>Thank you for downloading!</h1>
        <p>
          Your download should start automatically. If it does not,{' '}
          <a href={item.fileUrl} download={item.fileName}>click here to download {item.fileName}</a>.
        </p>
      </header>

      <section className={s.steps} aria-labelledby="steps-heading">
        <div className={s.sectionHeading}>
          <span className={s.eyebrow}>{item.platform} / install guide</span>
          <h2 id="steps-heading">Install {item.name}</h2>
        </div>

        <article className={s.step}>
          <div className={s.stepCopy}>
            <span className={s.stepNumber}>01</span>
            <div>
              <h3>Keep the download</h3>
              <p>
                If your browser warns that the installer is not commonly downloaded or may be
                unsafe, open the download options and choose <strong>Download anyway</strong> or
                <strong> Keep anyway</strong>. The exact wording varies by browser.
              </p>
            </div>
          </div>
          <figure>
            <BrowserDownloadIllustration fileName={item.fileName} />
            <figcaption>Illustration: browser download warning; wording varies.</figcaption>
          </figure>
        </article>

        {isWindows && (
          <article className={s.step}>
            <div className={s.stepCopy}>
              <span className={s.stepNumber}>02</span>
              <div>
                <h3>Review the SmartScreen prompt</h3>
                <p>
                  When you open the installer, Windows may show “Windows protected your PC.”
                  If you have verified the file and choose to proceed, select <strong>More info</strong>,
                  then <strong>Run anyway</strong>. Otherwise, select “Don’t run.”
                </p>
              </div>
            </div>
            <figure>
              <SmartScreenIllustration />
              <figcaption>Illustration: “Run anyway” appears after “More info”; wording may differ.</figcaption>
            </figure>
          </article>
        )}

        <article className={`${s.step} ${s.lastStep}`}>
          <div className={s.stepCopy}>
            <span className={s.stepNumber}>{isWindows ? '03' : '02'}</span>
            <div>
              <h3>Complete installation</h3>
              <p>
                Follow the installation instructions for {item.platform} to install {item.name}.
                You can cancel at any time if the installer asks for something unexpected.
              </p>
            </div>
          </div>
        </article>
      </section>

      <footer className={s.footer}>
        <Button to="/downloads" variant="outline">Back to downloads</Button>
        <Link to="/contact">Questions about this release?</Link>
      </footer>
    </div>
  );
}
