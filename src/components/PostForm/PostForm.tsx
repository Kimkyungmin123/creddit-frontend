import Button from 'components/Button';
import ImageUploadButton from 'components/ImageUploadButton';
import Textarea from 'components/Textarea';
import ERRORS from 'constants/errors';
import { ConnectedFocusError } from 'focus-formik-error';
import { Formik } from 'formik';
import { LoadingSpokes } from 'icons';
import { useMemo, useState } from 'react';
import getValidationSchema from 'utils/getValidationSchema';
import { object } from 'yup';
import styles from './PostForm.module.scss';

interface Values {
  title: string;
  content: string;
}

export type PostFormProps = {
  title: string;
  onSubmit: (values: Values, imageFile: File | Blob | null) => Promise<void>;
  imageUrl?: string | null;
  initialValues?: Values;
};

function PostForm({
  title,
  onSubmit,
  imageUrl,
  initialValues = { title: '', content: '' },
}: PostFormProps) {
  const [imageFile, setImageFile] = useState<File | Blob | null>(null);
  const previewImgUrl = useMemo(() => {
    if (imageFile?.size === 0) return null;
    if (imageFile) return URL.createObjectURL(imageFile);
    return imageUrl;
  }, [imageFile, imageUrl]);
  const [imageError, setImageError] = useState('');

  return (
    <div className={styles.PostFormContainer}>
      <h1>글 {title}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={object({
          content: getValidationSchema('content'),
        })}
        onSubmit={async (values) => {
          await onSubmit(values, imageFile);
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
              <ConnectedFocusError focusDelay={0} />
              <Textarea
                value={values.title}
                onChange={handleChange}
                placeholder="제목"
                name="title"
                resizable={false}
                maxLength={50}
              />
              <div className={styles.imgButtons}>
                <ImageUploadButton
                  ariaLabel={'글 이미지 업로드'}
                  onChange={(file) => {
                    if (!file) return;

                    if (file.size > 10000000) {
                      setImageError(ERRORS.imageLarge);
                      return;
                    }

                    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
                    if (!validTypes.includes(file.type)) {
                      setImageError(ERRORS.imageWrongType);
                      return;
                    }

                    setImageError('');
                    setImageFile(file);
                  }}
                />
                {previewImgUrl && (
                  <Button
                    type="button"
                    variant="plain"
                    ariaLabel="글 이미지 제거"
                    onClick={() => setImageFile(new Blob())}
                  >
                    제거
                  </Button>
                )}
              </div>
              {imageError && <p className={styles.error}>{imageError}</p>}
              <Textarea
                value={values.content}
                onChange={handleChange}
                placeholder="내용"
                name="content"
                minRows={7}
                onBlur={handleBlur}
              />
              {errors.content && (
                <p className={styles.error}>
                  {touched.content && errors.content}
                </p>
              )}
              {previewImgUrl && <img src={previewImgUrl} alt="글 이미지" />}
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
