import classNames from 'classnames';
import Button from 'components/Button';
import ButtonLink from 'components/ButtonLink';
import Input from 'components/Input';
import Layout from 'components/Layout';
import ERRORS from 'constants/errors';
import { Formik } from 'formik';
import useUser from 'hooks/useUser';
import { LoadingSpokes } from 'icons';
import type { NextPage } from 'next';
import { useState } from 'react';
import styles from 'styles/FindPassword.module.scss';
import api from 'utils/api';
import getValidationSchema from 'utils/getValidationSchema';
import isDuplicate from 'utils/isDuplicate';
import { object } from 'yup';

const FindPassword: NextPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const { isLoading, user } = useUser({ redirectTo: '/' });

  return (
    <Layout
      title="비밀번호 찾기 - creddit"
      backgroundColor="clean"
      hideSearchBar={true}
    >
      {!isLoading && !user && (
        <div
          className={classNames(
            styles.findPasswordContainer,
            submitted && styles.submitted
          )}
        >
          <h1>비밀번호 찾기</h1>
          {submitted ? (
            <>
              <p className={styles.description}>
                해당 이메일로 임시 비밀번호를 보내드렸습니다.
              </p>
              <ButtonLink href="/">홈으로</ButtonLink>
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
                  setSubmitted(true);
                }}
              />
            </>
          )}
        </div>
      )}
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
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          await onSubmit(values);
        } catch (_err) {
          const error = _err as { notFound?: boolean };
          setErrors({ email: error.notFound ? ERRORS.emailNotFound : '' });
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
            {isSubmitting ? <LoadingSpokes /> : '확인'}
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default FindPassword;
