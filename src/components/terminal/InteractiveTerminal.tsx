import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import { downloads } from '@/data/downloads';
import { useSequence } from '@/hooks/useSequence';
import { TerminalWindow } from '@/components/ui/TerminalWindow';
import { COMMANDS, runCommand } from './commands';
import s from './InteractiveTerminal.module.css';

interface Line { id: number; kind: 'in' | 'out'; text: string }

const BOOT = [
  `booting ${siteConfig.name.toLowerCase()}...`,
  'loading modules ......... ok',
  `${downloads.length} package${downloads.length === 1 ? '' : 's'} ready for download`,
  "type 'help' to see commands",
];

/** A tiny working shell: visitors can navigate the site by typing. */
export function InteractiveTerminal() {
  const navigate = useNavigate();
  const bootVisible = useSequence(BOOT.length, 380);
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState('');
  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const history = useRef<string[]>([]);
  const cursor = useRef(-1);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, bootVisible]);

  function push(kind: Line['kind'], text: string) {
    return { id: idRef.current++, kind, text };
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const input = value.trim();
    setValue('');
    if (!input) return;
    history.current.push(input);
    cursor.current = history.current.length;

    const result = runCommand(input);
    if (result.clear) {
      setLines([]);
      return;
    }
    setLines((prev) => [...prev, push('in', input), ...result.output.map((t) => push('out', t))]);
    if (result.navigateTo) navigate(result.navigateTo);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = cursor.current + (e.key === 'ArrowUp' ? -1 : 1);
      if (next < 0 || next > history.current.length) return;
      cursor.current = next;
      setValue(history.current[next] ?? '');
    }
  }

  return (
    <TerminalWindow title="terminal.app">
      <div
        className={s.screen}
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        role="log"
        aria-live="polite"
      >
        {BOOT.slice(0, bootVisible).map((t) => (
          <p key={t} className={s.out}>{t}</p>
        ))}
        {lines.map((l) =>
          l.kind === 'in' ? (
            <p key={l.id} className={s.in}><span className={s.prompt}>$</span> {l.text}</p>
          ) : (
            <p key={l.id} className={s.out}>{l.text}</p>
          ),
        )}
        <form onSubmit={onSubmit} className={s.form}>
          <label htmlFor="term-input" className={s.prompt}>$</label>
          <input
            id="term-input"
            ref={inputRef}
            className={s.input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="try: help"
            aria-label={`Terminal command. Available: ${COMMANDS.join(', ')}`}
          />
        </form>
      </div>
    </TerminalWindow>
  );
}
