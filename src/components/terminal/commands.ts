import { siteConfig } from '@/config/site';
import { downloads } from '@/data/downloads';

export interface CommandResult {
  output: string[];
  navigateTo?: string;
  clear?: boolean;
}

const routes: Record<string, string> = Object.fromEntries(
  siteConfig.nav.map((n) => [n.label.replace('./', ''), n.to]),
);

export const COMMANDS = ['help', 'ls', 'whoami', 'cat mission.txt', 'open <section>', 'clear'] as const;

/** Pure function: easy to test, easy to extend with new commands. */
export function runCommand(raw: string): CommandResult {
  const [cmd = '', ...args] = raw.trim().toLowerCase().split(/\s+/);
  const arg = args.join(' ');

  switch (cmd) {
    case 'help':
      return { output: ['commands:', ...COMMANDS.map((c) => `  ${c}`)] };
    case 'ls':
      return { output: [...Object.keys(routes).map((r) => `${r}/`), ...downloads.map((d) => d.fileName)] };
    case 'whoami':
      return { output: [siteConfig.name, siteConfig.tagline] };
    case 'cat':
      return arg === 'mission.txt'
        ? { output: [siteConfig.mission] }
        : { output: [`cat: ${arg || '(missing file)'}: no such file`] };
    case 'open':
    case 'cd': {
      const target = arg.replace(/\/$/, '');
      const to = routes[target];
      return to
        ? { output: [`opening ${target}...`], navigateTo: to }
        : { output: [`${cmd}: ${target || '(missing name)'}: unknown section. try 'ls'`] };
    }
    case 'clear':
      return { output: [], clear: true };
    default:
      return { output: [`${cmd}: command not found. type 'help'`] };
  }
}
