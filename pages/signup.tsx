import type { NextPage } from 'next';
import Link from 'next/link';
import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';
import Header from '../components/Header';
import SocialLoginButtons from '../components/SocialLoginButtons';
import styles from '../styles/Signup.module.css';

const Signup: NextPage = () => {
  return (
    <Layout title="creddit: 회원가입">
      <Header type="post" />
      <div className={styles.signupContainer}>
        <h1>회원가입</h1>
        <AuthForm type="signup" btnName="회원가입" />
        <SocialLoginButtons />
        <div className={styles.alreadyJoin}>
          <span>이미 회원이신가요?</span>
          <Link href="/login">
            <a>로그인</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
