import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Maintenance from '@/pages/Maintenance';

// Home is eager (first paint); other routes are split into separate chunks.
const Downloads = lazy(() => import('@/pages/Downloads'));
const DownloadComplete = lazy(() => import('@/pages/DownloadComplete'));
const Docs = lazy(() => import('@/pages/Docs'));
const Projects = lazy(() => import('@/pages/Projects'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export default function App() {
  if (import.meta.env.VITE_MAINTENANCE_MODE === 'true') {
    return <Maintenance />;
  }

  return (
    <Suspense fallback={<p className="container page">loading...</p>}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="download/:id" element={<DownloadComplete />} />
          <Route path="docs" element={<Docs />} />
          <Route path="projects" element={<Projects />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
