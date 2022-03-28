import type { NextPage } from 'next';
import Link from 'next/link';
import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';
import SocialLoginButtons from '../components/SocialLoginButtons';
import styles from '../styles/Signup.module.css';

const Signup: NextPage = () => {
  return (
    <Layout title="제목: 회원가입">
      <div className={styles.container}>
        <h1>회원가입</h1>
        <Input dataName="이메일" />
        <LoginForm firstName="닉네임" secondName="비밀번호" />
        <Button btnName="회원가입" />
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
