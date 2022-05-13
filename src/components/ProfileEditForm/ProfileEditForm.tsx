import Button from 'components/Button';
import Textarea from 'components/Textarea';
import ERRORS from 'constants/errors';
import { ConnectedFocusError } from 'focus-formik-error';
import { Formik } from 'formik';
import useDuplicateError from 'hooks/useDuplicateError';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import { User } from 'types';
import focusOnFormElement from 'utils/focusOnFormElement';
import getValidationSchema from 'utils/getValidationSchema';
import { object } from 'yup';
import styles from './ProfileEditForm.module.scss';

export type ProfileEditFormProps = {
  user: User;
  onSubmit: (values: {
    nickname: string;
    introduction: string;
  }) => Promise<void>;
  onCancel: () => void;
};

function ProfileEditForm({ user, onSubmit, onCancel }: ProfileEditFormProps) {
  const { error: nicknameError, onChange: onChangeNickname } =
    useDuplicateError('nickname');
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        nickname: user.nickname,
        introduction: user.introduction || '',
      }}
      validationSchema={object({
        nickname: getValidationSchema('nickname'),
      })}
      onSubmit={async (values, { setErrors }) => {
        try {
          await onSubmit(values);
          onCancel();
          const { nickname, introduction } = values;
          await mutate(
            '/profile/show',
            { user: { ...user, nickname, introduction } },
            false
          );
          router.replace(`/profile/${nickname}`);
        } catch (_err) {
          const error = _err as { nicknameDuplicate?: boolean };
          if (error.nicknameDuplicate) {
            setErrors({ nickname: ERRORS.nicknameDuplicate });
            focusOnFormElement('nickname');
          } else {
            onCancel();
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
      }) => {
        return (
          <form
            onSubmit={handleSubmit}
            className={styles.form}
            data-testid="profile-edit-form"
          >
            <ConnectedFocusError focusDelay={0} />
            <div className={styles.inputContainer}>
              <input
                value={values.nickname}
                onChange={(event) => {
                  handleChange(event);
                  onChangeNickname(event);
                }}
                placeholder="닉네임"
                name="nickname"
                onBlur={handleBlur}
              />
              <p className={styles.error}>
                {(user.nickname !== values.nickname && nicknameError) ||
                  (touched.nickname && errors.nickname)}
              </p>
            </div>
            <Textarea
              value={values.introduction}
              onChange={handleChange}
              placeholder="소개"
              name="introduction"
              maxLength={50}
              autoFocus
            />
            <div className={styles.buttons}>
              <Button
                variant="plain"
                onClick={(event) => {
                  event.preventDefault();
                  onCancel();
                }}
              >
                취소
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                저장
              </Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}

export default ProfileEditForm;
