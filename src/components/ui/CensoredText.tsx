import s from './CensoredText.module.css';

const censoredWords = /\b(fucking|goddamn)\b/gi;

export function CensoredText({ text }: { text: string }) {
  return (
    <>
      {text.split(censoredWords).map((part, index) =>
        /^(fucking|goddamn)$/i.test(part) ? (
          <span key={index} className={s.censored}>{part}</span>
        ) : (
          part
        ),
      )}
    </>
  );
}