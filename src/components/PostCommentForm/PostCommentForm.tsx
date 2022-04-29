import Button from 'components/Button';
import Textarea from 'components/Textarea';
import { Formik } from 'formik';
import useUser from 'hooks/useUser';
import { useRouter } from 'next/router';
import getValidationSchema from 'utils/getValidationSchema';
import { object } from 'yup';
import styles from './PostCommentForm.module.scss';

export type PostCommentFormProps = {
  onSubmit: (values: { comment: string }) => Promise<void>;
};

function PostCommentForm({ onSubmit }: PostCommentFormProps) {
  const { isLoading, user } = useUser();
  const router = useRouter();

  return (
    <Formik
      initialValues={{ comment: '' }}
      validationSchema={object({
        comment: getValidationSchema('comment'),
      })}
      onSubmit={async (values, { setFieldValue }) => {
        await onSubmit(values);
        setFieldValue('comment', '');
      }}
      validateOnChange={false}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
        setErrors,
      }) => {
        return (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (!isLoading && !user) router.push('/login');
              else handleSubmit(event);
            }}
            className={styles.form}
            data-testid="post-comment-form"
          >
            <Textarea
              value={values.comment}
              onChange={(event) => {
                setErrors({ comment: undefined });
                handleChange(event);
              }}
              placeholder="댓글을 남겨보세요"
              name="comment"
              minRows={3}
            />
            <div className={styles.formBottom}>
              {touched.comment && errors.comment && (
                <p className={styles.error}>{errors.comment}</p>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                data-testid="submitButton"
              >
                작성
              </Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}

export default PostCommentForm;
