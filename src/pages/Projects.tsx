import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Tag } from '@/components/ui/Tag';
import { TerminalWindow } from '@/components/ui/TerminalWindow';
import styles from './Projects.module.css';

export default function Projects() {
  useDocumentTitle('Projects');
  const softwareProjects = projects.filter((project) => project.discipline === 'software');
  const webProjects = projects.filter((project) => project.discipline === 'web');

  return (
    <div className="container page">
      <header className="page-head">
        <h1>Our work</h1>
        <p>Software and websites, each built with a clear purpose.</p>
      </header>
      <TerminalWindow as="section" title="software-development/">
        <div style={{ display: 'grid', gap: 20 }}>
          <h2>Software Development</h2>
          {softwareProjects.length > 0 ? (
            <ul style={{ display: 'grid', gap: 20 }}>
              {softwareProjects.map((project) => (
                <li key={project.id} style={{ display: 'grid', gap: 6 }}>
                  <h3>{project.href ? <Link to={project.href}>{project.name}</Link> : project.name}</h3>
                  <p>{project.summary}</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <Tag tone={project.status === 'released' ? 'default' : 'accent'}>{project.status}</Tag>
                    {project.stack.map((item) => <Tag key={item}>{item}</Tag>)}
                  </div>
                </li>
              ))}
            </ul>
          ) : <p>Software projects will be listed here.</p>}
        </div>
      </TerminalWindow>

      <TerminalWindow as="section" title="web-development/">
        <div style={{ display: 'grid', gap: 20 }}>
          <h2>Web Development</h2>
          {webProjects.length > 0 ? (
            <ul style={{ display: 'grid', gap: 20 }}>
              {webProjects.map((project) => (
                <li key={project.id} style={{ display: 'grid', gap: 6 }}>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <Tag tone={project.status === 'released' ? 'default' : 'accent'}>{project.status}</Tag>
                    {project.stack.map((item) => <Tag key={item}>{item}</Tag>)}
                  </div>
                  <p>
                    Website: <a href={project.websiteUrl} target="_blank" rel="noreferrer">{project.websiteUrl}</a>
                  </p>
                  <p>
                    Current page: <a href={project.currentPage.url} target="_blank" rel="noreferrer">{project.currentPage.title}</a>
                  </p>
                  <div className={styles.pagePreview}>
                    <iframe
                      src={project.currentPage.url}
                      title={`${project.name}: ${project.currentPage.title} preview`}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      sandbox="allow-scripts"
                      tabIndex={-1}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : <p>Web projects will be listed here as they are ready to share.</p>}
        </div>
      </TerminalWindow>
    </div>
  );
}
