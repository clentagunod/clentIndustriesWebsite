import type { NavItem } from '@/types/nav';

/** Single source of truth for site-wide copy. Edit here, not in components. */
export const siteConfig = {
  name: 'ClentIndustries',
  tagline: 'We build useful things on the fucking internet.',
  mission:
    'Our education system might be a goddamn mess, and here we are, starting our own revolution.',
  contact: {
    email: 'donugaclent@gmail.com', // TODO: replace with your real address
    links: [
      { label: 'github', href: 'https://github.com/clentagunod' }, // TODO: replace
      { label: 'facebook', href: 'https://facebook.com/clent.agunod.1' }, // TODO: replace
    ],
  },
  nav: [
    { label: './home', to: '/' },
    { label: './downloads', to: '/downloads' },
    { label: './projects', to: '/projects' },
    { label: './about', to: '/about' },
    { label: './contact', to: '/contact' },
  ] satisfies NavItem[],
  values: [
    { title: 'Small on purpose', body: 'Each tool does one job well instead of many jobs badly.' },
    { title: 'Works offline', body: 'Your files stay on your machine unless you decide otherwise.' },
    { title: 'Honest releases', body: 'Version notes and checksums ship with every download.' },
  ],
} as const;
