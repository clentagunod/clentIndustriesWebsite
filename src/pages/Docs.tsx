import { Link } from 'react-router-dom';
import { setupGuides } from '@/data/docs';
import { downloads } from '@/data/downloads';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Tag } from '@/components/ui/Tag';
import s from './Docs.module.css';

export default function Docs() {
  useDocumentTitle('Docs');

  return (
    <div className={`container page ${s.page}`}>
      <header className="page-head">
        <Tag>./docs</Tag>
        <h1>Setup guides</h1>
        <p>
          Clear, step-by-step instructions for installing and getting started
          with ClentIndustries apps.
        </p>
      </header>

      {setupGuides.length > 0 ? (
        <div className={s.guides}>
          {setupGuides.map((guide) => {
            const download = downloads.find((item) => item.id === guide.downloadId);

            return (
              <article key={guide.id} className={s.guide} id={guide.id}>
                <div className={s.guideHeader}>
                  <div className={s.heading}>
                    <span className={s.eyebrow}>APP SETUP</span>
                    <h2>{guide.appName}</h2>
                    <p>{guide.summary}</p>
                  </div>
                  {download?.available && (
                    <a className={s.download} href={download.fileUrl} download>
                      Download installer
                    </a>
                  )}
                </div>

                <div className={s.columns}>
                  <section className={s.steps} aria-labelledby={`${guide.id}-steps`}>
                    <h3 id={`${guide.id}-steps`}>Get started</h3>
                    <ol>
                      {guide.steps.map((step, index) => (
                        <li key={step.title}>
                          <span className={s.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
                          <div>
                            <h4>{step.title}</h4>
                            <p>{step.description}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </section>

                  <aside className={s.side}>
                    <section className={s.panel} aria-labelledby={`${guide.id}-requirements`}>
                      <h3 id={`${guide.id}-requirements`}>Before you begin</h3>
                      <ul>
                        {guide.requirements.map((requirement) => (
                          <li key={requirement}>{requirement}</li>
                        ))}
                      </ul>
                    </section>

                    <section className={s.video} aria-labelledby={`${guide.id}-video`}>
                      <h3 id={`${guide.id}-video`}>Video walkthrough</h3>
                      {guide.youtubeVideoId ? (
                        <div className={s.videoFrame}>
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${guide.youtubeVideoId}`}
                            title={`${guide.appName} setup video walkthrough`}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <p className={s.videoPlaceholder}>
                          No Video Instructions yet
                        </p>
                      )}
                    </section>

                    {guide.notes && guide.notes.length > 0 && (
                      <section className={s.panel} aria-labelledby={`${guide.id}-notes`}>
                        <h3 id={`${guide.id}-notes`}>Good to know</h3>
                        <ul>
                          {guide.notes.map((note) => <li key={note}>{note}</li>)}
                        </ul>
                      </section>
                    )}
                  </aside>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <section className={s.empty}>
          <h2>Guides are on the way</h2>
          <p>Setup instructions will appear here as they become available.</p>
        </section>
      )}

      <p className={s.more}>
        Looking for an installer? <Link to="/downloads">Browse all downloads</Link>.
      </p>
    </div>
  );
}
