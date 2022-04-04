import { useState } from 'react';
import Input from '../Input';
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
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            type="email"
          />
        )}

        {type === 'signup' && (
          <Input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임"
          />
        )}

        {(type === 'signup' || type === 'login') && (
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            type="password"
          />
        )}

        {type === 'resetPassword' && (
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="새 비밀번호"
            type="password"
          />
        )}
        <button className={styles.btnName}>{btnName}</button>
      </form>
    </div>
  );
};

export default AuthForm;
