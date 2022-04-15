import Button from 'components/Button';
import Input from 'components/Input';
import Layout from 'components/Layout';
import ERRORS from 'constants/errors';
import { Formik } from 'formik';
import type { NextPage } from 'next';
import styles from 'styles/FindPassword.module.scss';
import { object, string } from 'yup';

const FindPassword: NextPage = () => {
  return (
    <Layout title="creddit: 비밀번호 찾기" backgroundColor="clean">
      <div className={styles.findPasswordContainer}>
        <h1>비밀번호 찾기</h1>
        <p className={styles.description}>
          이메일을 입력하고 확인 버튼을 누르시면, 해당 이메일로 비밀번호 재설정
          링크를 보내드립니다.
        </p>
        <FindPasswordForm
          onSubmit={(values) => {
            console.log(values);
          }}
        />
      </div>
    </Layout>
  );
};

type FindPasswordFormProps = {
  onSubmit: (values: { email: string }) => void;
};

export function FindPasswordForm({ onSubmit }: FindPasswordFormProps) {
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={object({
        email: string()
          .email(ERRORS.emailInvalid)
          .required(ERRORS.emailRequired),
      })}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
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
          <Button
            type="submit"
            disabled={isSubmitting}
            data-testid="submitButton"
          >
            확인
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default FindPassword;
