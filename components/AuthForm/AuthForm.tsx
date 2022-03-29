import { useState } from 'react';
import styles from './AuthForm.module.css';

type AuthFormProps = {
  btnName: string;
  type: 'login' | 'signup' | 'resetPassword' | 'findPassword';
};

const AuthForm = ({ btnName, type }: AuthFormProps) => {
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
            placeholder="이메일"
            type="email"
          />
        )}

        {type === 'signup' && (
          <input
            className={styles.AuthFormInput}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임"
            type="text"
          />
        )}

        {(type === 'signup' || type === 'login') && (
          <input
            className={styles.AuthFormInput}
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        {type === 'resetPassword' && (
          <input
            className={styles.AuthFormInput}
            type="password"
            placeholder="새 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        <button className={styles.btnName}>{btnName}</button>
      </form>
    </div>
  );
};

export default AuthForm;
