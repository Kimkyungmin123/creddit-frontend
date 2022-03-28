import { useState } from 'react';
import styles from './LoginForm.module.css';

type LoginFormProps = {
  firstName: string;
  secondName: string;
};

const LoginForm = ({ firstName, secondName }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.loginContainer}>
      <form>
        <input
          className={styles.loginEmail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={firstName}
          type="text"
        />

        <input
          className={styles.loginPw}
          type="password"
          placeholder={secondName}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
    </div>
  );
};

export default LoginForm;
