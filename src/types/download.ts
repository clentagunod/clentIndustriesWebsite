export type ReleaseChannel = 'stable' | 'beta' ;
export type Platform = 'windows' | 'macos' | 'linux';

export interface ChangelogEntry {
  version: string;
  date: string; // ISO date, e.g. 2026-09-29
  notes: string[];
}

/** One downloadable piece of software. Add new items in `data/downloads.ts`. */
export interface DownloadItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  version: string;
  channel: ReleaseChannel;
  platform: Platform;
  /** Public URL of the file, e.g. `/downloads/EduAutomata-Setup.exe` */
  fileUrl: string;
  fileName: string;
  sizeLabel: string;
  /** Optional SHA-256 so users can verify the installer. */
  sha256?: string;
  requirements: string[];
  changelog: ChangelogEntry[];
  /** Set to false to show the entry as "coming soon" without a live link. */
  available: boolean;
}
