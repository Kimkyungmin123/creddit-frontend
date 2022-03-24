import { useState } from 'react';

import styles from './Input.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <form>
          <input
            className={styles.loginEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            type="text"
          />

          <input
            className={styles.loginPw}
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className={styles.localLoginBtn}>로그인</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
