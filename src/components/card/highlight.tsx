import styles from './card.module.css';

type HighlightProps = {
  children: string;
};
export function Highlight({ children }: HighlightProps) {
  return (
    <span data-test-id='highlight-matches' className={styles.Card__titleHighlighter}>
      {children}
    </span>
  );
}
