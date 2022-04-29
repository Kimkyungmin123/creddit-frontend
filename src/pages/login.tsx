import Button from 'components/Button';
import Input from 'components/Input';
import Layout from 'components/Layout';
import SocialLoginButtons from 'components/SocialLoginButtons';
import ERRORS from 'constants/errors';
import { ConnectedFocusError } from 'focus-formik-error';
import { Formik, FormikErrors } from 'formik';
import useLogin from 'hooks/useLogin';
import useSocialLogin from 'hooks/useSocialLogin';
import useUser from 'hooks/useUser';
import { LoadingSpokes } from 'icons';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from 'styles/Login.module.scss';
import getValidationSchema from 'utils/getValidationSchema';
import { object } from 'yup';

const Login: NextPage = () => {
  const { isLoading, user } = useUser({ redirectTo: '/' });
  const login = useLogin();
  const { status } = useSession();
  useSocialLogin();

  return (
    <Layout
      title="로그인 - creddit"
      backgroundColor="clean"
      hideSearchBar={true}
    >
      {!isLoading && !user && status === 'unauthenticated' && (
        <div className={styles.loginContainer}>
          <h1>로그인</h1>
          <LoginForm
            onSubmit={async (values) => {
              await login(values);
            }}
          />
          <SocialLoginButtons />
          <div className={styles.bottomPanel}>
            <Link href="/find-password">
              <a aria-label="비밀번호 찾기" className={styles.forgotPW}>
                비밀번호를 잊으셨습니까?
              </a>
            </Link>
            <div className={styles.signupSuggestion}>
              <span>아직 회원이 아니신가요?</span>
              <Link href="/signup">
                <a>회원가입</a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

type LoginFormProps = {
  onSubmit: (values: { email: string; password: string }) => Promise<void>;
};

export function LoginForm({ onSubmit }: LoginFormProps) {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={object({
        email: getValidationSchema('email'),
        password: getValidationSchema('passwordLax'),
      })}
      onSubmit={async (values, { setFieldError }) => {
        try {
          await onSubmit(values);
        } catch (err) {
          setFieldError('emailOrPassword', ERRORS.emailOrPasswordInvalid);
        }
      }}
    >
      {({
        values,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        ...rest
      }) => {
        const errors = rest.errors as FormikErrors<{
          email: string;
          password: string;
          emailOrPassword: string;
        }>;

        return (
          <form onSubmit={handleSubmit}>
            <ConnectedFocusError focusDelay={0} />
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
            {errors.emailOrPassword && (
              <p className={styles.error}>{errors.emailOrPassword}</p>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              data-testid="submitButton"
            >
              {isSubmitting ? <LoadingSpokes /> : '로그인'}
            </Button>
          </form>
        );
      }}
    </Formik>
  );
}

export default Login;
