import type { NextPage } from 'next';
import AuthForm from '../components/AuthForm';
import Header from '../components/Header';
import Layout from '../components/Layout';
import NonLogin from '../components/NonLogin';
import SocialLoginButtons from '../components/SocialLoginButtons';
import styles from '../styles/Login.module.css';

const Login: NextPage = () => {
  return (
    <Layout title="creddit: 로그인">
      <Header type="account" />
      <div className={styles.loginContainer}>
        <h1>로그인</h1>
        <AuthForm type="login" btnName="로그인" />
        <SocialLoginButtons />
        <NonLogin />
      </div>
    </Layout>
  );
};

export default Login;
