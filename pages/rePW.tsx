import type { NextPage } from 'next';
import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';
import styles from '../styles/rePW.module.css';

const rePW: NextPage = () => {
  return (
    <Layout title="제목: 비밀번호 찾기">
      <div className={styles.rePWContainer}>
        <h1>비밀번호 재설정</h1>
        <Input dataName="새 비밀번호" />
        <Button btnName="확인" />
      </div>
    </Layout>
  );
};

export default rePW;
