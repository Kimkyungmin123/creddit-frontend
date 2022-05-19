import classNames from 'classnames';
import Button from 'components/Button';
import ButtonLink from 'components/ButtonLink';
import Input from 'components/Input';
import Layout from 'components/Layout';
import ERRORS from 'constants/errors';
import { ConnectedFocusError } from 'focus-formik-error';
import { Formik } from 'formik';
import { LoadingSpokes } from 'icons';
import type { NextPage } from 'next';
import { useState } from 'react';
import { wrapper } from 'slices/store';
import { initUser } from 'slices/userSlice';
import styles from 'styles/ResetPassword.module.scss';
import api from 'utils/api';
import getValidationSchema from 'utils/getValidationSchema';
import { object } from 'yup';

const ResetPassword: NextPage = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout
      title="비밀번호 변경 - creddit"
      backgroundColor="clean"
      hideSearchBar={true}
    >
      <div
        className={classNames(
          styles.resetPasswordContainer,
          submitted && styles.submitted
        )}
      >
        <h1>비밀번호 변경</h1>
        {submitted ? (
          <>
            <p className={styles.description}>
              비밀번호를 성공적으로 변경했습니다.
            </p>
            <ButtonLink href="/">홈으로</ButtonLink>
          </>
        ) : (
          <ResetPasswordForm
            onSubmit={async ({ newPassword }) => {
              await api.post('/member/changePassword', {
                password: newPassword,
              });
              setSubmitted(true);
            }}
          />
        )}
      </div>
    </Layout>
  );
};

type ResetPasswordFormProps = {
  onSubmit: (values: {
    newPassword: string;
    newPasswordConfirm: string;
  }) => Promise<void>;
};

function ResetPasswordForm({ onSubmit }: ResetPasswordFormProps) {
  return (
    <Formik
      initialValues={{ newPassword: '', newPasswordConfirm: '' }}
      validationSchema={object({
        newPassword: getValidationSchema('passwordStrict'),
      })}
      validate={({ newPassword, newPasswordConfirm }) => {
        if (newPassword !== newPasswordConfirm) {
          return { newPasswordConfirm: ERRORS.newPasswordConfirmInvalid };
        }
      }}
      onSubmit={async (values) => {
        await onSubmit(values);
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
            value={values.newPassword}
            onChange={handleChange}
            placeholder="새 비밀번호"
            type="password"
            name="newPassword"
            onBlur={handleBlur}
            error={touched.newPassword && errors.newPassword}
          />
          <Input
            value={values.newPasswordConfirm}
            onChange={handleChange}
            placeholder="새 비밀번호 확인"
            type="password"
            name="newPasswordConfirm"
            onBlur={handleBlur}
            error={touched.newPasswordConfirm && errors.newPasswordConfirm}
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { user } = await initUser(store, context);
    if (user) return { redirect: { destination: '/', permanent: false } };
    return { props: {} };
  }
);

export default ResetPassword;
