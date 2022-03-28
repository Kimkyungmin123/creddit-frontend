import { useState } from 'react';
import styles from './Input.module.css';

type InputProps = {
  dataName: string;
};

const Input = ({ dataName }: InputProps) => {
  const [data, setData] = useState('');

  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.input}
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder={dataName}
        type="text"
      />
    </div>
  );
};

export default Input;
