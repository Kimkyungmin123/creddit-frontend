import Button from 'components/Button';
import Textarea from 'components/Textarea';
import { Formik } from 'formik';
import { LoadingSpokes } from 'icons';
import getValidationSchema from 'utils/getValidationSchema';
import { object } from 'yup';
import styles from './PostForm.module.scss';

export type PostFormProps = {
  title: string;
  onSubmit: (values: { title: string; content: string }) => Promise<void>;
  initialValues?: { title: string; content: string };
};

function PostForm({
  title,
  onSubmit,
  initialValues = { title: '', content: '' },
}: PostFormProps) {
  return (
    <div className={styles.PostFormContainer}>
      <h1>글 {title}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={object({
          content: getValidationSchema('content'),
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
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Textarea
                value={values.title}
                onChange={handleChange}
                placeholder="제목"
                name="title"
                resizable={false}
                maxLength={50}
              />
              <Textarea
                value={values.content}
                onChange={handleChange}
                placeholder="내용"
                name="content"
                minRows={7}
                onBlur={handleBlur}
              />
              <p className={styles.error}>
                {touched.content && errors.content}
              </p>
              <Button
                type="submit"
                disabled={!values.title || !values.content || isSubmitting}
                data-testid="submitButton"
              >
                {isSubmitting ? <LoadingSpokes /> : <>{title}</>}
              </Button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default PostForm;
