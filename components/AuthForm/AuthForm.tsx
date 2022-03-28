import { useState } from 'react';
import styles from './AuthForm.module.css';

type AuthFormProps = {
  emailInput?: string;
  nicknameInput?: string;
  passwordInput?: string;
  authFormBtn: string;
  type: string;
};

const AuthForm = ({
  emailInput,
  nicknameInput,
  passwordInput,
  authFormBtn,
  type,
}: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  return (
    <div className={styles.AuthFormContainer}>
      <form>
        {type !== 'resetPassword' && (
          <input
            className={styles.AuthFormInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={emailInput}
            type="text"
          />
        )}

        {type === 'signup' && (
          <input
            className={styles.AuthFormInput}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder={nicknameInput}
            type="text"
          />
        )}

        {type !== 'findPassword' && (
          <input
            className={styles.AuthFormInput}
            type="password"
            placeholder={passwordInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        <button className={styles.authFormBtn}>{authFormBtn}</button>
      </form>
    </div>
  );
};

export default AuthForm;
