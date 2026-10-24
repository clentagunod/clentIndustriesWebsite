import { useEffect, useRef, useState } from 'react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import styles from './Maintenance.module.css';

const message = 'Your life is a simulation, nothing is real';
const glitches = [
  'Ж', '₪', 'λ', 'ø', 'א', 'ヲ', 'Я', 'Ѫ', '∅', '҂', 'ᚠ', 'כ', 'ع', 'ϟ', '҉', '̷',
  '你', '是', '幻', '觉', '現', '実', 'の', '世', '界', '人', '生', '은', '시', '뮬',
  'ре', 'а́', 'ль', 'но', 'жизнь', 'الحياة', 'حقيقة', 'नकली', 'ชีวิต', 'සිමියු',
];
const rowCount = 64;
const cycleCount = 3;

function distortMessage(): string {
  return [...message]
    .map((character) => {
      if (!/[a-z]/i.test(character) || Math.random() > 0.2) return character;
      return Math.random() > 0.75
        ? `${glitches[Math.floor(Math.random() * glitches.length)]}${character}`
        : glitches[Math.floor(Math.random() * glitches.length)];
    })
    .join('');
}

const rows = Array.from({ length: rowCount }, (_, index) => ({
  clean: index % 4 === 0,
  phrases: Array.from({ length: 4 }, () =>
    index % 4 === 0 ? message : distortMessage(),
  ),
}));

export default function Maintenance() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const cycleRef = useRef<HTMLDivElement>(null);
  const [trails, setTrails] = useState<number[]>([]);

  useDocumentTitle('Maintenance');

  useEffect(() => {
    const viewport = viewportRef.current;
    const cycle = cycleRef.current;
    if (!viewport || !cycle) return;

    const cycleHeight = cycle.offsetHeight;
    viewport.scrollTop = cycleHeight;

    let previousScrollTop = viewport.scrollTop;
    let trailTimeout = 0;

    const handleScroll = () => {
      let currentScrollTop = viewport.scrollTop;
      const loopThreshold = cycleHeight / 2;

      if (currentScrollTop < loopThreshold) {
        currentScrollTop += cycleHeight;
        viewport.scrollTop = currentScrollTop;
        previousScrollTop = currentScrollTop;
        return;
      }

      if (currentScrollTop > cycleHeight * 1.5) {
        currentScrollTop -= cycleHeight;
        viewport.scrollTop = currentScrollTop;
        previousScrollTop = currentScrollTop;
        return;
      }

      const distance = previousScrollTop - currentScrollTop;
      if (Math.abs(distance) > 1) {
        setTrails((current) => [Math.max(-110, Math.min(110, distance * 1.5)), ...current].slice(0, 4));
        window.clearTimeout(trailTimeout);
        trailTimeout = window.setTimeout(() => setTrails([]), 380);
      }
      previousScrollTop = currentScrollTop;
    };

    viewport.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      viewport.removeEventListener('scroll', handleScroll);
      window.clearTimeout(trailTimeout);
    };
  }, []);

  return (
    <main className={styles.maintenance} ref={viewportRef} aria-label="Glitched reality message">
      <div className={styles.loopContent}>
        {Array.from({ length: cycleCount }, (_, cycleIndex) => (
          <div
            className={styles.textCycle}
            key={cycleIndex}
            ref={cycleIndex === 0 ? cycleRef : undefined}
            aria-hidden={cycleIndex !== 1}
          >
            {rows.map((row, rowIndex) => (
              <div className={styles.textLine} key={`${cycleIndex}-${rowIndex}`}>
                {row.phrases.map((phrase, phraseIndex) => (
                  <span
                    className={row.clean ? undefined : styles.corrupted}
                    key={`${cycleIndex}-${rowIndex}-${phraseIndex}`}
                  >
                    {phrase}
                  </span>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.trails} aria-hidden="true">
        {trails.map((offset, index) => (
          <span
            className={styles.trail}
            key={`${index}-${offset}`}
            style={{ transform: `translate(-50%, calc(-50% + ${offset}px))` }}
          >
            Your life is a simulation, nothing is real
          </span>
        ))}
      </div>

    </main>
  );
}
