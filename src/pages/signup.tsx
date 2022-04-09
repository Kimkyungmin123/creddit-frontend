import Button from 'components/Button';
import Input from 'components/Input';
import Layout from 'components/Layout';
import SocialLoginButtons from 'components/SocialLoginButtons';
import ERRORS from 'constants/errors';
import { Formik } from 'formik';
import useLogin from 'hooks/useLogin';
import useUser from 'hooks/useUser';
import { LoadingSpokes } from 'icons';
import type { NextPage } from 'next';
import Link from 'next/link';
import styles from 'styles/Signup.module.scss';
import api from 'utils/api';
import { object, string } from 'yup';

const Signup: NextPage = () => {
  useUser({ redirectTo: '/' });
  const login = useLogin();

  return (
    <Layout type="account" title="creddit: 회원가입">
      <div className={styles.signupContainer}>
        <h1>회원가입</h1>
        <SignupForm
          onSubmit={async (values) => {
            await api.post('/auth/signup', values);
            await login(values);
          }}
        />
        <SocialLoginButtons />
        <div className={styles.loginSuggestion}>
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
  }) => Promise<void>;
};

export function SignupForm({ onSubmit }: SignupFormProps) {
  return (
    <Formik
      initialValues={{ email: '', nickname: '', password: '' }}
      validationSchema={object({
        email: string()
          .email(ERRORS.emailInvalid)
          .required(ERRORS.emailRequired),
        nickname: string()
          .matches(/^[ㄱ-ㅎ가-힣a-zA-Z0-9-_]+$/, ERRORS.nicknameInvalid)
          .min(2, ERRORS.nicknameShort)
          .max(10, ERRORS.nicknameLong)
          .required(ERRORS.nicknameRequired),
        password: string()
          .matches(
            /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*\W)(?=\S+$).+/,
            ERRORS.passwordInvalid
          )
          .min(8, ERRORS.passwordShort)
          .max(20, ERRORS.passwordLong)
          .required(ERRORS.passwordRequired),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        await onSubmit(values);
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
        <form onSubmit={handleSubmit}>
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
            {isSubmitting ? <LoadingSpokes /> : '가입'}
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default Signup;
