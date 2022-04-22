import MyDate from 'components/MyDate';
import { Post } from 'types';
import styles from './PostMain.module.scss';

export type PostMainProps = {
  post: Post;
};

function PostMain({ post }: PostMainProps) {
  const { title, createdDate, content, member } = post;
  // TODO: 현재 사용자가 작성자일 때만 수정, 삭제 버튼 표시

  return (
    <div className={styles.postMain} data-testid="post-main">
      <h2>{title}</h2>
      <div className={styles.postDetail}>
        <span>{member}</span>
        <MyDate date={createdDate} />
        <button aria-label="게시물 수정">수정</button>
        <button aria-label="게시물 삭제">삭제</button>
      </div>
      <p data-testid="content">{content}</p>
    </div>
  );
}

export default PostMain;
