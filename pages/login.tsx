import type { NextPage } from 'next';
import Button from '../components/Button';
import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';
import NonLogin from '../components/NonLogin';
import SocialLoginButtons from '../components/SocialLoginButtons';
import styles from '../styles/Login.module.css';

const Login: NextPage = () => {
  return (
    <Layout title="creddit: 로그인">
      <div className={styles.container}>
        <h1>로그인</h1>
        <LoginForm firstName="이메일" secondName="비밀번호" />
        <Button btnName="로그인" />
        <SocialLoginButtons />
        <NonLogin />
      </div>
    </Layout>
  );
};

export default Login;
