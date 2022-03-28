import styles from './Button.module.css';

type ButtonProps = {
  btnName: string;
};

const Button = ({ btnName }: ButtonProps) => {
  return (
    <div>
      <button className={styles.btn}>{btnName}</button>
    </div>
  );
};

export default Button;
