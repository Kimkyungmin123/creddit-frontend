import { Formik } from 'formik';
import type { NextPage } from 'next';
import { object, string } from 'yup';
import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';
import styles from '../styles/FindPassword.module.css';

const FindPassword: NextPage = () => {
  return (
    <Layout type="account" title="creddit: 비밀번호 찾기">
      <div className={styles.FindPasswordContainer}>
        <h1>비밀번호 찾기</h1>
        <div className={styles.FindPasswordText}>
          <p>이메일을 입력하고 확인 버튼을 누르시면, 해당 이메일로</p>
          <p>비밀번호 재설정 링크를 보내드립니다.</p>
        </div>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={object({
            email: string()
              .email('올바른 이메일 주소를 입력해주세요.')
              .required('이메일을 입력해주세요.'),
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
              <Button type="submit" disabled={isSubmitting}>
                확인
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default FindPassword;
