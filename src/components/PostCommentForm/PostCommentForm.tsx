import Button from 'components/Button';
import Textarea from 'components/Textarea';
import { Formik } from 'formik';
import { LoadingSpokes } from 'icons';
import getValidationSchema from 'utils/getValidationSchema';
import { object } from 'yup';
import styles from './PostCommentForm.module.scss';

export type PostCommentFormProps = {
  onSubmit: (values: { comment: string }) => Promise<void>;
};

function PostCommentForm({ onSubmit }: PostCommentFormProps) {
  // TODO: 버튼 눌렀을 때 로그인 되어있지 않으면 로그인 페이지로 이동

  return (
    <Formik
      initialValues={{ comment: '' }}
      validationSchema={object({
        comment: getValidationSchema('comment'),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        await onSubmit(values);
        setSubmitting(false);
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
            onSubmit={handleSubmit}
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
                {isSubmitting ? <LoadingSpokes /> : '작성'}
              </Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}

export default PostCommentForm;
