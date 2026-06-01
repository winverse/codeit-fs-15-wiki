'use client';

import { useState } from 'react';
import * as styles from './MovieLikeButton.css.js';

export default function MovieLikeButton() {
  const [count, setCount] = useState(0);

  return (
    <button className={styles.button} onClick={() => setCount(count + 1)}>
      좋아요 {count}
    </button>
  );
}
