import type { NextPage } from 'next';
import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';
import styles from '../styles/ResetPassword.module.css';

const ResetPassword: NextPage = () => {
  return (
    <Layout type="account" title="creddit: 비밀번호 찾기">
      <div className={styles.resetPasswordContainer}>
        <h1>비밀번호 재설정</h1>
        <AuthForm type="resetPassword" btnName="확인" />
      </div>
    </Layout>
  );
};

export default ResetPassword;
