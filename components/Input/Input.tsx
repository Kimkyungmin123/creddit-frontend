import Link from 'next/link';
import { useState } from 'react';
import { Github, Google } from '../../icons';
import styles from './Input.module.css';

const Input = () => {
  
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

  return( 
  <div className={styles.container}>
    <div className={styles.loginContainer}>
        <form >
  
        <input className={styles.loginEmail}
          value={email}
          onChange={e=>setEmail(e.target.value)}
          placeholder="이메일"
          type="text" 
          />
        
        <input className={styles.loginPw}
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          />

        <button className={styles.localLoginBtn }  >로그인</button>
        <button  className={styles.snsLoginBtn}><span><Google/></span><span>Google 계정으로 계속하기</span></button>
        <button  className={styles.snsLoginBtn}><span><Github/></span><span>GitHub 계정으로 계속하기</span></button>
        </form>  

        <div className={styles.nonLogin}>
          <span className={styles.forgotPw}>비밀번호를 잊으셨습니까?</span>
          <span className={styles.nonAccount}>아직 회원이 아니신가요?<Link href="../../"><a> 회원가입</a></Link> </span>
        </div>
      </div>
    </div>

  );
};

export default Input;
