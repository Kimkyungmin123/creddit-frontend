import Button from 'components/Button';
import Input from 'components/Input';
import Layout from 'components/Layout';
import SocialLoginButtons from 'components/SocialLoginButtons';
import ERRORS from 'constants/errors';
import { Formik } from 'formik';
import type { NextPage } from 'next';
import Link from 'next/link';
import styles from 'styles/Signup.module.css';
import { object, string } from 'yup';

const Signup: NextPage = () => {
  return (
    <Layout type="account" title="creddit: 회원가입">
      <div className={styles.signupContainer}>
        <h1>회원가입</h1>
        <SignupForm
          onSubmit={(values) => {
            console.log(values);
          }}
        />
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

type SignupFormProps = {
  onSubmit: (values: {
    email: string;
    nickname: string;
    password: string;
  }) => void;
};

export function SignupForm({ onSubmit }: SignupFormProps) {
  return (
    <Formik
      initialValues={{ email: '', nickname: '', password: '' }}
      validationSchema={object({
        email: string()
          .email(ERRORS.emailInvalid)
          .required(ERRORS.emailRequired),
        nickname: string().required(ERRORS.nicknameRequired),
        password: string().required(ERRORS.passwordRequired),
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
          <Input
            value={values.nickname}
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
          <Button
            type="submit"
            disabled={isSubmitting}
            data-testid="submitButton"
          >
            가입
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default Signup;
