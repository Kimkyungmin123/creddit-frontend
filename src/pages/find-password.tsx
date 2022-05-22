import Button from 'components/Button';
import Input from 'components/Input';
import Layout from 'components/Layout';
import ERRORS from 'constants/errors';
import { ConnectedFocusError } from 'focus-formik-error';
import { Formik } from 'formik';
import useLogin from 'hooks/useLogin';
import { LoadingSpokes } from 'icons';
import type { NextPage } from 'next';
import { useState } from 'react';
import { wrapper } from 'slices/store';
import { initUser } from 'slices/userSlice';
import styles from 'styles/FindPassword.module.scss';
import api from 'utils/api';
import focusOnFormElement from 'utils/focusOnFormElement';
import getValidationSchema from 'utils/getValidationSchema';
import isDuplicate from 'utils/isDuplicate';
import { object } from 'yup';

const FindPassword: NextPage = () => {
  const [email, setEmail] = useState('');
  const login = useLogin('/reset-password');

  return (
    <Layout
      title="비밀번호 찾기 - creddit"
      backgroundColor="clean"
      hideSearchBar={true}
    >
      <div className={styles.findPasswordContainer}>
        <h1>비밀번호 찾기</h1>
        {email ? (
          <>
            <p className={styles.description}>
              해당 이메일로 보내드린 임시 비밀번호를 입력해주세요.
            </p>
            <LoginForm
              onSubmit={async ({ password }) => {
                await login({ email, password });
              }}
            />
          </>
        ) : (
          <>
            <p className={styles.description}>
              이메일을 입력하고 확인 버튼을 누르시면, 해당 이메일로 임시
              비밀번호를 보내드립니다.
            </p>
            <FindPasswordForm
              onSubmit={async ({ email }) => {
                const emailExists = await isDuplicate('email', email);
                if (!emailExists) throw { notFound: true };
                await api.post('/member/sendEmail/password', email, {
                  headers: {
                    'Content-Type': 'text/plain',
                  },
                });
                setEmail(email);
              }}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

type FindPasswordFormProps = {
  onSubmit: (values: { email: string }) => Promise<void>;
};

function FindPasswordForm({ onSubmit }: FindPasswordFormProps) {
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={object({
        email: getValidationSchema('email'),
      })}
      onSubmit={async (values, { setErrors }) => {
        try {
          await onSubmit(values);
        } catch (_err) {
          const error = _err as { notFound?: boolean };
          setErrors({ email: error.notFound ? ERRORS.emailNotFound : '' });
          if (error.notFound) {
            focusOnFormElement('email');
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
        <form onSubmit={handleSubmit} className={styles.form}>
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
          <Button
            type="submit"
            disabled={isSubmitting}
            data-testid="submitButton"
          >
            {isSubmitting ? <LoadingSpokes /> : '확인'}
          </Button>
        </form>
      )}
    </Formik>
  );
}

type LoginFormProps = {
  onSubmit: (values: { password: string }) => Promise<void>;
};

function LoginForm({ onSubmit }: LoginFormProps) {
  return (
    <Formik
      initialValues={{ password: '' }}
      validationSchema={object({
        password: getValidationSchema('passwordLax'),
      })}
      onSubmit={async (values, { setErrors }) => {
        try {
          await onSubmit(values);
        } catch (err) {
          setErrors({ password: ERRORS.tempPasswordInvalid });
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
      }) => {
        return (
          <form onSubmit={handleSubmit} className={styles.form}>
            <ConnectedFocusError focusDelay={0} />
            <Input
              value={values.password}
              onChange={handleChange}
              placeholder="임시 비밀번호"
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
              {isSubmitting ? <LoadingSpokes /> : '확인'}
            </Button>
          </form>
        );
      }}
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

export default FindPassword;
