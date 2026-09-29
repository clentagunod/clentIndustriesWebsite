interface ProjectBase {
  id: string;
  name: string;
  summary: string;
  stack: string[];
  status: 'released' | 'in-development';
}

export interface SoftwareProject extends ProjectBase {
  discipline: 'software';
  href?: string;
}

export interface WebProject extends ProjectBase {
  discipline: 'web';
  websiteUrl: string;
  currentPage: { title: string; url: string };
}

export type Project = SoftwareProject | WebProject;

export const projects: readonly Project[] = [
  {
    id: 'edu-automata',
    discipline: 'software',
    name: 'Edu Automata',
    summary: 'Desktop automation for repetitive education tasks.',
    stack: ['Windows', 'Desktop'],
    status: 'released',
    href: '/downloads',
  },

  {
  id: 'edash-website',
  discipline: 'web',
  name: 'E-Dash',
  summary: 'School dashboard',
  stack: ['React', 'CSS'],
  status: 'in-development',
  websiteUrl: 'https://sanroque-edash.vercel.app/',
  currentPage: {
    title: 'Homepage',
    url: 'https://sanroque-edash.vercel.app/',
    },
  },
];
