import type { NextPage } from 'next';
// import Input from '../components/Input';

import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm/LoginForm';
import NonLogin from '../components/NonLogin/NonLogin';
import SocialLoginButton from '../components/SocialLoginButton/SocialLoginButton';
import styles from '../styles/Login.module.css';

const Login: NextPage = () => {
  return (
    <Layout title="제목: 로그인">
      <div className={styles.container}>
        <h1>로그인</h1>
        {/* <Input /> */}
        <LoginForm />
        <SocialLoginButton />
        <NonLogin />
      </div>
    </Layout>
  );
};

export default Login;
