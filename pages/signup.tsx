import { Formik } from 'formik';
import type { NextPage } from 'next';
import Link from 'next/link';
import { object, string } from 'yup';
import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';
import SocialLoginButtons from '../components/SocialLoginButtons';
import styles from '../styles/Signup.module.css';

const Signup: NextPage = () => {
  return (
    <Layout type="account" title="creddit: 회원가입">
      <div className={styles.signupContainer}>
        <h1>회원가입</h1>
        <Formik
          initialValues={{ email: '', nickname: '', password: '' }}
          validationSchema={object({
            email: string()
              .email('올바른 이메일 주소를 입력해주세요.')
              .required('이메일을 입력해주세요.'),
            nickname: string().required('닉네임을 입력해주세요.'),
            password: string().required('비밀번호를 입력해주세요.'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className={styles.form}>
              <Input
                value={values.email}
                onChange={handleChange}
                placeholder="이메일"
                type="email"
                name="email"
                onBlur={handleBlur}
                error={touched.email && errors.email}
              />
              <Input
                value={values.nickname || ''}
                onChange={handleChange}
                placeholder="닉네임"
                name="nickname"
                onBlur={handleBlur}
                error={touched.nickname && errors.nickname}
              />
              <Input
                value={values.password}
                onChange={handleChange}
                placeholder="비밀번호"
                type="password"
                name="password"
                onBlur={handleBlur}
                error={touched.password && errors.password}
              />
              <Button type="submit" disabled={isSubmitting}>
                가입
              </Button>
            </form>
          )}
        </Formik>
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
