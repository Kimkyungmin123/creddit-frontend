import type { NextPage } from 'next';
import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';
import styles from '../styles/FindPW.module.css';

const FindPW: NextPage = () => {
  return (
    <Layout title="제목: 비밀번호 찾기">
      <div className={styles.findPWcontainer}>
        <h1>비밀번호 찾기</h1>
        <div className={styles.findPWText}>
          <p>이메일을 입력하고 확인 버튼을 누르시면, 해당 이메일로</p>
          <p>비밀번호 재설정 링크를 보내드립니다.</p>
        </div>
        <Input dataName="이메일" />
        <Button btnName="확인" />
      </div>
    </Layout>
  );
};

export default FindPW;
