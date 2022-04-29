import formatDate from 'utils/formatDate';
import styles from './MyDate.module.scss';

export type MyDateProps = {
  date: string;
};

function MyDate({ date }: MyDateProps) {
  const isToday = new Date(date).toDateString() === new Date().toDateString();

  return (
    <div className={styles.date} data-testid="my-date">
      <span>{formatDate(date, { hideTime: !isToday })}</span>
      <span>{formatDate(date, { type: 'short', hideTime: !isToday })}</span>
    </div>
  );
}

export default MyDate;
