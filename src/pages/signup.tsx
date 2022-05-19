import Button from 'components/Button';
import Input from 'components/Input';
import Layout from 'components/Layout';
import SocialLoginButtons from 'components/SocialLoginButtons';
import ERRORS from 'constants/errors';
import { ConnectedFocusError } from 'focus-formik-error';
import { Formik } from 'formik';
import useDuplicateError from 'hooks/useDuplicateError';
import useLogin from 'hooks/useLogin';
import { LoadingSpokes } from 'icons';
import type { NextPage } from 'next';
import Link from 'next/link';
import { wrapper } from 'slices/store';
import { initUser } from 'slices/userSlice';
import styles from 'styles/Signup.module.scss';
import api from 'utils/api';
import focusOnFormElement from 'utils/focusOnFormElement';
import getValidationSchema from 'utils/getValidationSchema';
import isDuplicate from 'utils/isDuplicate';
import { object } from 'yup';

const Signup: NextPage = () => {
  const login = useLogin();

  return (
    <Layout
      title="회원가입 - creddit"
      backgroundColor="clean"
      hideSearchBar={true}
    >
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
              const duplicate = await isDuplicate('nickname', values.nickname);
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
      onSubmit={async (values, { setErrors }) => {
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
          if (error.emailDuplicate) {
            focusOnFormElement('email');
          } else if (error.nicknameDuplicate) {
            focusOnFormElement('nickname');
          }
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
          <ConnectedFocusError focusDelay={0} />
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { user } = await initUser(store, context);
    if (user) return { redirect: { destination: '/', permanent: false } };
    return { props: {} };
  }
);

export default Signup;
