import type { NextPage } from 'next';
import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';
import styles from '../styles/reset-password.module.css';

const resetPassword: NextPage = () => {
  return (
    <Layout title="creddit: 비밀번호 찾기">
      <div className={styles.resetPasswordContainer}>
        <h1>비밀번호 재설정</h1>
        <AuthForm type="resetPassword" btnName="확인" />
      </div>
    </Layout>
  );
};

export default resetPassword;
