import { Rising, Time } from 'icons';
import { useState } from 'react';
import styles from './ClassifyingPosts.module.scss';

const ClassifyingPosts = () => {
  const [SelectedOrder, setSelectedOrder] = useState(false);
  const orderListHandle = () => {
    setSelectedOrder(() => !SelectedOrder);
  };

  return (
    <div className={styles.ClassifyingContainer}>
      <button
        className={SelectedOrder ? styles.popularityOrder : styles.Selected}
        onClick={orderListHandle}
      >
        <Rising />
        <span>인기</span>
      </button>
      <button
        className={!SelectedOrder ? styles.latestOrder : styles.Selected}
        onClick={orderListHandle}
      >
        <Time />
        <span>최신</span>
      </button>
    </div>
  );
};

export default ClassifyingPosts;
