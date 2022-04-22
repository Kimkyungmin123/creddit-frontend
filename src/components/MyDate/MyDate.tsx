import formatDate from 'utils/formatDate';
import styles from './MyDate.module.scss';

export type MyDateProps = {
  date: string;
};

function MyDate({ date }: MyDateProps) {
  return (
    <div className={styles.date} data-testid="my-date">
      <span>{formatDate(date)}</span>
      <span>{formatDate(date, { type: 'short' })}</span>
    </div>
  );
}

export default MyDate;
