import { Formik } from 'formik';
import type { NextPage } from 'next';
import { object, string } from 'yup';
import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';
import NonLogin from '../components/NonLogin';
import SocialLoginButtons from '../components/SocialLoginButtons';
import styles from '../styles/Login.module.css';

const Login: NextPage = () => {
  return (
    <Layout type="account" title="creddit: 로그인">
      <div className={styles.loginContainer}>
        <h1>로그인</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={object({
            email: string()
              .email('올바른 이메일 주소를 입력해주세요.')
              .required('이메일을 입력해주세요.'),
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
                value={values.password}
                onChange={handleChange}
                placeholder="비밀번호"
                type="password"
                name="password"
                onBlur={handleBlur}
                error={touched.password && errors.password}
              />
              <Button type="submit" disabled={isSubmitting}>
                로그인
              </Button>
            </form>
          )}
        </Formik>
        <SocialLoginButtons />
        <NonLogin />
      </div>
    </Layout>
  );
};

export default Login;
