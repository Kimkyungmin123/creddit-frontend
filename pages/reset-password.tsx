import { Formik } from 'formik';
import type { NextPage } from 'next';
import { object, string } from 'yup';
import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';
import styles from '../styles/ResetPassword.module.css';

const ResetPassword: NextPage = () => {
  return (
    <Layout type="account" title="creddit: 비밀번호 찾기">
      <div className={styles.resetPasswordContainer}>
        <h1>비밀번호 재설정</h1>
        <Formik
          initialValues={{ password: '', passwordConfirm: '' }}
          validationSchema={object({
            password: string().required('새 비밀번호를 입력해주세요.'),
            passwordConfirm: string().required('새 비밀번호를 확인해주세요.'),
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
                value={values.password}
                onChange={handleChange}
                placeholder="새 비밀번호"
                type="password"
                name="password"
                onBlur={handleBlur}
                error={touched.password && errors.password}
              />
              <Input
                value={values.passwordConfirm}
                onChange={handleChange}
                placeholder="새 비밀번호 확인"
                type="password"
                name="passwordConfirm"
                onBlur={handleBlur}
                error={touched.passwordConfirm && errors.passwordConfirm}
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

export default ResetPassword;
