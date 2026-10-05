import type { DownloadItem } from '@/types/download';

/**
 * Download registry. To publish new software:
 *  1. Put the file in /public/downloads
 *  2. Add an entry below. The Downloads page and Home page pick it up automatically.
 */
export const downloads: readonly DownloadItem[] = [
  {
    id: 'auto-post-studio',
    name: 'AutoPost Studio',
    tagline: 'Create, format, and publish school posts with ease',
    description:
      'A desktop social media automation tool for schools and educational organizations. AutoPost Studio lets users add photos, automatically apply a school-branded image template, create polished Facebook captions from keywords using AI, review and edit content, save finished graphics, and publish approved posts directly to a Facebook Page. Built for simple, consistent, and efficient school communication without requiring Canva or complex editing software.',
    version: '2.1.1',
    channel: 'stable',
    platform: 'windows',
    fileUrl: '/downloads/AutoPostStudio-Setup.exe',
    fileName: 'AutoPostStudio-Setup.exe',
    sizeLabel: '52.7 MB',
    requirements: [
      'Windows 10 or Windows 11 (64-bit)',
      'Internet connection required for AI API and Facebook publishing',
      'At least 4 GB RAM',
      'At least 200 MB available disk space'
    ],
    changelog: [
      {
        version: '2.1.1',
        date: '2026-10-04',
        notes: [
          'Added AI-assisted caption generation from keywords.',
          'Added support for manually written full captions.',
          'Added google drive image imports. ',
        ]
      },
      {
        version: '1.1.6',
        date: '2026-09-30',
        notes: [
          'First public stable release.'
        ]
      }
    ],
    available: true,
  },
  {
    id: 'edu-automata',
    name: 'Edu Automata',
    tagline: 'Simple, local learner recordkeeping.',
    description:
      'Manage learner profiles and record weekly attendance, activity scores, and assessment scores. Review attendance rates and score summaries with built-in charts, and export your records to an Excel workbook that updates in the background. Your data is stored locally, and the app works offline without requiring Python to be installed.',
    version: '1.0.0',
    channel: 'beta',
    platform: 'windows',
    fileUrl: '/downloads/EduAutomata-Setup.exe',
    fileName: 'EduAutomata-Setup.exe',
    sizeLabel: '27.8 MB',
    requirements: [
      'Windows 10 or later (64-bit)',
      'No internet connection required; records are stored locally',
      'Python installation not required',
    ],
    changelog: [
      {
        version: '1.0.0',
        date: '2026-09-29',
        notes: ['First public beta release.'],
      },
    ],
    available: true,
  },
 
];
