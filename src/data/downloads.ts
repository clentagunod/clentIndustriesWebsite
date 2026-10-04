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
    tagline: 'Automation for posting academic information',
    description:
      '',
    version: '1.1.5',
    channel: 'stable',
    platform: 'windows',
    fileUrl: '/downloads/EduAutomata-Setup.exe',
    fileName: 'AutoPostStudio-Setup.exe',
    sizeLabel: '27.8 mb',
    requirements: ['Windows 10, 11 or later (64-bit)', 'Internet connection required'],
    changelog: [{ version: '1.0.0', date: '2026-09-30', notes: ['First public stable release.'] }],
    available: false,
  },
  {
    id: 'edu-automata',
    name: 'Edu Automata',
    tagline: 'Automation for everyday school tasks.',
    description:
      'Edu Automata is a Windows desktop app that automates repetitive education work so you can spend the time on teaching and learning instead dawg.',
    version: '1.0.0',
    channel: 'beta',
    platform: 'windows',
    fileUrl: '/downloads/EduAutomata-Setup.exe',
    fileName: 'EduAutomata-Setup.exe',
    sizeLabel: '27.8 mb',
    requirements: ['Windows 10, 11 or later (64-bit)', 'Internet connection not required'],
    changelog: [{ version: '1.0.0', date: '2026-09-29', notes: ['First public beta release.'] }],
    available: true,
  },
 
];
