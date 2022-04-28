import styles from './SendMessageDate.module.scss';

export type SendMessageDateProps = {
  date: string;
};

const SendMessageDate = ({ date }: SendMessageDateProps) => {
  return <div className={styles.SendMessageDate}>{date}</div>;
};

export default SendMessageDate;
