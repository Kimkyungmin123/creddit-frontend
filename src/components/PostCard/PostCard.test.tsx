import postDummy from 'data/post.json';
import { render, screen } from 'utils/test-utils';
import PostCard, { cutContents, PostCardProps } from './PostCard';

describe('PostCard', () => {
  const setup = (props: Partial<PostCardProps> = {}) => {
    const initialProps: PostCardProps = {
      post: postDummy,
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
    const { title, content, member, comments, likes } = post;
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByTestId('content').textContent).toBe(content);
    expect(screen.getByTestId('profile-image')).toBeInTheDocument();
    expect(screen.getByTestId('author').textContent).toBe(member.nickname);
    expect(screen.getByText(`댓글 ${comments}개`)).toBeInTheDocument();
    expect(screen.getByTestId('like-button')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${likes}`))).toBeInTheDocument();
    expect(screen.getByTestId('my-date')).toBeInTheDocument();
  });

  it('cuts the content if the content is longer than 150 chracters', () => {
    const post = {
      ...postDummy,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam condimentum rutrum volutpat. Proin vulputate et lacus vitae dignissim. Donec nec vehicula magna. Duis ligula lectus, iaculis nec est eget, volutpat auctor ante. Vivamus vitae quam sit amet erat iaculis posuere in quis dui. Curabitur in dictum nisl, nec aliquam odio. Nunc egestas turpis eget arcu auctor venenatis. Mauris elementum, neque in convallis vestibulum, sapien augue eleifend mi, et mollis eros neque sit amet nisi. Suspendisse tincidunt eros felis, condimentum varius tellus venenatis eget. Curabitur non sagittis velit. Sed non feugiat dolor. Curabitur a nunc eget ante imperdiet dignissim sed vitae orci.',
    };
    setup({ post });
    expect(screen.getByTestId('content').textContent).toBe(
      cutContents(post.content)
    );
  });
});
