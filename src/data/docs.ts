export interface SetupGuide {
  id: string;
  appName: string;
  summary: string;
  downloadId: string;
  requirements: readonly string[];
  steps: readonly {
    title: string;
    description: string;
  }[];
  youtubeVideoId?: string;
  notes?: readonly string[];
}

/**
 * Setup guides are content-only records. Add a guide here and associate it with
 * a download by ID; the Docs page renders each entry using the same layout.
 */
export const setupGuides: readonly SetupGuide[] = [

  {
    id: 'auto-post-studio',
    appName: 'AutoPost Studio',
    summary:
      'Install AutoPost Studio and prepare, review, and publish polished posts for your school Facebook Page.',
    downloadId: 'auto-post-studio',
    requirements: [
      'Windows 10 or later (64-bit)',
      'At least 4 GB RAM and 200 MB of available disk space',
      'Internet connection for AI caption generation and Facebook publishing',
      'Access to the Facebook Page you plan to publish to',
    ],
    steps: [
      {
        title: 'Download the installer',
        description:
          'Select Download installer above to download AutoPostStudio-Setup.exe.',
      },
      {
        title: 'Install and open AutoPost Studio',
        description:
          'Open the downloaded setup file and follow the Windows installer prompts. When installation finishes, launch AutoPost Studio.',
      },
      {
        title: 'Add a photo',
        description:
          'Choose a photo from your computer or import one from Google Drive. Select an image suitable for your school’s post.',
      },
      {
        title: 'Create the post image and caption',
        description:
          'Apply your school-branded image template. Generate a Facebook caption from keywords with AI, or write the full caption yourself.',
      },
      {
        title: 'Review and save',
        description:
          'Check the image and caption carefully, make any edits, then save the finished graphic when you are ready.',
      },
      {
        title: 'Publish to Facebook',
        description:
          'Connect or select the Facebook Page you are authorized to manage, review the final post, and publish it. An internet connection is required.',
      },
    ],
    notes: [
      'Review AI-generated captions and the finished graphic before publishing.',
      'Facebook publishing requires access to the target Page and an internet connection.',
      'You can create and save a graphic without publishing it immediately.',
    ],
  },

  {
    id: 'edu-automata',
    appName: 'Edu Automata',
    summary:
      'Install Edu Automata and get started managing learner records, attendance, and assessment scores.',
    downloadId: 'edu-automata',
    requirements: [
      'Windows 10 or later (64-bit)',
      'Internet connection not required; records are stored locally',
    ],
    steps: [
      {
        title: 'Download the installer',
        description:
          'Select Download installer above to get the latest Edu Automata setup file.',
      },
      {
        title: 'Install the app',
        description:
          'Open the downloaded setup file and follow the Windows installer prompts.',
      },
      {
        title: 'Start organizing records',
        description:
          'Open Edu Automata, add learner profiles, then record attendance, activity scores, and assessment scores.',
      },
      {
        title: 'Review and export',
        description:
          'Use the built-in charts to review attendance and score summaries, and export records to an Excel workbook.',
      },
    ],
    notes: [
      'Records are stored on this computer. Keep a regular exported workbook backup.',
      'The app works offline after installation.',
    ],
  },


];
