import type { NextPage } from 'next';
import Input from '../components/Input';
import Layout from '../components/Layout';
import styles from '../styles/Login.module.css';

const Login: NextPage = () => {
  return (
    <Layout title="제목: 로그인">
      <div className={styles.container}>
        로그인
        <Input />
      </div>
    </Layout>
  );
};

export default Login;
