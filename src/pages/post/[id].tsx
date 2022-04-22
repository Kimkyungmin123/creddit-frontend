import Button from 'components/Button';
import Comment from 'components/Comment';
import Layout from 'components/Layout';
import MyDate from 'components/MyDate';
import Textarea from 'components/Textarea';
import ERRORS from 'constants/errors';
import { Formik } from 'formik';
import { CaretDown, Close, HeartFill, LoadingSpokes, Sort } from 'icons';
import { useRouter } from 'next/router';
import styles from 'styles/Post.module.scss';
import { Post } from 'types';
import { object, string } from 'yup';
import postsDummy from '../../data/posts.json';

export type PostTopProps = {
  post: Post;
};

function PostTop({ post }: PostTopProps) {
  const router = useRouter();
  const { likeCount, title } = post;

  return (
    <div className={styles.topBar}>
      <div className={styles.topBarContent}>
        <div className={styles.topBarLeftLikeCnt}>
          <HeartFill />
          {likeCount}
        </div>
        <span className={styles.topBarTitle}>{title}</span>
        <button aria-label="게시물 닫기" onClick={() => router.back()}>
          <Close />
        </button>
      </div>
    </div>
  );
}

export type PostMainProps = {
  post: Post;
};

function PostMain({ post }: PostMainProps) {
  const { title, createdDate, content, member } = post;
  return (
    <div className={styles.postMain}>
      <h2>{title}</h2>
      <div className={styles.postDetail}>
        <span>{member}</span>
        <MyDate date={createdDate} />
        <button aria-label="게시물 수정">수정</button>
        <button aria-label="게시물 삭제">삭제</button>
      </div>
      <p>{content}</p>
    </div>
  );
}

export type PostCommentFormProps = {
  onSubmit: (values: { comment: string }) => Promise<void>;
};

function PostCommentForm({ onSubmit }: PostCommentFormProps) {
  // TODO: 버튼 눌렀을 때 로그인 되어있지 않으면 로그인 페이지로 이동

  return (
    <Formik
      initialValues={{ comment: '' }}
      validationSchema={object({
        comment: string().required(ERRORS.commentRequired),
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
          <form onSubmit={handleSubmit}>
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
            <div className={styles.commentFormBottom}>
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

export type PostCommentBoxProps = {
  post: Post;
};

function PostCommentBox({ post }: PostCommentBoxProps) {
  const { commentCount, comments } = post;

  return (
    <div className={styles.commentBox}>
      <div className={styles.commentBoxTop}>
        <div className={styles.commentInfo}>
          <span>댓글 {commentCount}개</span>
          <button
            // TODO: 현재 정렬 기준에 따라 aria-label 변경
            aria-label={'댓글 정렬 기준 변경'}
          >
            <Sort />
            <span>정렬 기준: 좋아요순</span>
            <CaretDown />
          </button>
        </div>
        <PostCommentForm
          onSubmit={async (values) => {
            console.log(values);
          }}
        />
      </div>
      <div className={styles.commentsContainer}>
        {comments.map((comment, i) => {
          return (
            <Comment
              key={i}
              nickName={comment.member}
              content={comment.content}
              likeCount={comment.likeCount}
              date={comment.createdDate}
            />
          );
        })}
      </div>
    </div>
  );
}

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const numID = Number(id) - 1;
  const post = postsDummy[numID];

  return (
    <Layout title={post.title}>
      <div
        className={styles.postContainer}
        onClick={(event) => {
          const target = event.target as HTMLElement;
          if (target.classList.contains(styles.postContainer)) {
            router.back();
          }
        }}
      >
        <div className={styles.postBox}>
          <PostTop post={post} />
          <section className={styles.postContent}>
            <PostMain post={post} />
            <PostCommentBox post={post} />
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Post;
