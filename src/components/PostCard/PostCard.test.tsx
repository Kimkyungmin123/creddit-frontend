import postsDummy from 'data/posts.json';
import formatDate from 'utils/formatDate';
import { render, screen } from 'utils/test-utils';
import PostCard, { cutContents, PostCardProps } from './PostCard';

describe('PostCard', () => {
  const setup = (props: Partial<PostCardProps> = {}) => {
    const initialProps: PostCardProps = {
      post: postsDummy[0],
    };
    const utils = render(<PostCard {...initialProps} {...props} />);
    return {
      initialProps,
      ...utils,
    };
  };

  it('renders properly', () => {
    const { initialProps } = setup();
    const { post } = initialProps;
    const { title, content, member, commentCount, likeCount, createdDate } =
      post;
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByTestId('content').textContent).toBe(content);
    expect(screen.getByTestId('creator').textContent).toBe(`by ${member}`);
    expect(screen.getByText(`댓글 ${commentCount}개`)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${likeCount}`))).toBeInTheDocument();
    expect(screen.getByText(formatDate(createdDate))).toBeInTheDocument();
    expect(
      screen.getByText(formatDate(createdDate, { type: 'mobile' }))
    ).toBeInTheDocument();
  });

  it('cuts the content if the content is longer than 150 chracters', () => {
    const post = postsDummy[1];
    setup({ post });
    expect(screen.getByTestId('content').textContent).toBe(
      cutContents(post.content)
    );
  });
});
