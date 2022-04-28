import Button from 'components/Button';
import Input from 'components/Input';
import Layout from 'components/Layout';
import SocialLoginButtons from 'components/SocialLoginButtons';
import ERRORS from 'constants/errors';
import { Formik } from 'formik';
import useDuplicateError from 'hooks/useDuplicateError';
import useLogin from 'hooks/useLogin';
import useSocialLogin from 'hooks/useSocialLogin';
import useUser from 'hooks/useUser';
import { LoadingSpokes } from 'icons';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from 'styles/Signup.module.scss';
import api from 'utils/api';
import getValidationSchema from 'utils/getValidationSchema';
import isDuplicate from 'utils/isDuplicate';
import { object } from 'yup';

const Signup: NextPage = () => {
  const { isLoading, user } = useUser({ redirectTo: '/' });
  const login = useLogin();
  const { status } = useSession();
  useSocialLogin();

  return (
    <Layout
      title="회원가입 - creddit"
      backgroundColor="clean"
      hideSearchBar={true}
    >
      {!isLoading && !user && status === 'unauthenticated' && (
        <div className={styles.signupContainer}>
          <h1>회원가입</h1>
          <SignupForm
            onSubmit={async (values) => {
              const error: { [key: string]: boolean } = {};
              const checkEmailDuplicate = async () => {
                const duplicate = await isDuplicate('email', values.email);
                if (duplicate) error.emailDuplicate = true;
              };

              const checkNicknameDuplicate = async () => {
                const duplicate = await isDuplicate(
                  'nickname',
                  values.nickname
                );
                if (duplicate) error.nicknameDuplicate = true;
              };

              await Promise.all([
                checkEmailDuplicate(),
                checkNicknameDuplicate(),
              ]);

              if (Object.keys(error).length > 0) {
                throw error;
              }

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
      )}
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
  const { error: emailError, onChange: onChangeEmail } =
    useDuplicateError('email');
  const { error: nicknameError, onChange: onChangeNickname } =
    useDuplicateError('nickname');

  return (
    <Formik
      initialValues={{ email: '', nickname: '', password: '' }}
      validationSchema={object({
        email: getValidationSchema('email'),
        nickname: getValidationSchema('nickname'),
        password: getValidationSchema('passwordStrict'),
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          await onSubmit(values);
        } catch (_err) {
          const error = _err as {
            emailDuplicate?: boolean;
            nicknameDuplicate?: boolean;
          };
          setErrors({
            email: error.emailDuplicate ? ERRORS.emailDuplicate : '',
            nickname: error.nicknameDuplicate ? ERRORS.nicknameDuplicate : '',
          });
        } finally {
          setSubmitting(false);
        }
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
            onChange={(event) => {
              handleChange(event);
              onChangeEmail(event);
            }}
            placeholder="이메일"
            type="email"
            name="email"
            onBlur={handleBlur}
            error={emailError || (touched.email && errors.email)}
          />
          <Input
            value={values.nickname}
            onChange={(event) => {
              handleChange(event);
              onChangeNickname(event);
            }}
            placeholder="닉네임"
            name="nickname"
            onBlur={handleBlur}
            error={nicknameError || (touched.nickname && errors.nickname)}
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
