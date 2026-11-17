import { ArrowDown } from 'lucide-react';
import styles from './LoadMore.module.css';

interface Props {
  remaining: number;
  onClick: () => void;
}

export default function LoadMore({ remaining, onClick }: Props) {
  if (remaining <= 0) return null;

  return (
    <div className={styles.container}>
      <button className={styles.button} type="button" onClick={onClick}>
        <span>Load more treats</span>
        <ArrowDown size={16} aria-hidden="true" />
      </button>
      <span className={styles.remaining} aria-live="polite">
        {remaining} {remaining === 1 ? 'more treat' : 'more treats'}
      </span>
    </div>
  );
}
