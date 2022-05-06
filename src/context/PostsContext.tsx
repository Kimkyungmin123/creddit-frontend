import { useRouter } from 'next/router';
import { createContext, FC, useContext, useEffect, useReducer } from 'react';
import { Post } from 'types';

interface State {
  posts: Post[] | null;
  url: string;
  sortBy: 'like' | 'new';
  page?: number;
}

interface Action {
  type: 'RESET' | 'CHANGE_POST' | 'LIKE_POST' | 'ADD_POSTS' | 'CHANGE_SORT';
  postId?: number;
  post?: Partial<Post>;
  posts?: Post[];
  url?: string;
  sortBy?: 'like' | 'new';
  page?: number;
}

const initialState: State = { posts: null, url: '', sortBy: 'like' };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'RESET':
      return { ...initialState, sortBy: state.sortBy };
    case 'CHANGE_POST':
      return {
        ...state,
        posts:
          state.posts?.map((post) => {
            if (post.id === action.post?.id) return { ...post, ...action.post };
            return post;
          }) || [],
      };
    case 'LIKE_POST':
      return {
        ...state,
        posts:
          state.posts?.map((post) => {
            if (post.id === action.postId)
              return {
                ...post,
                liked: !post.liked,
                likes: post.liked ? post.likes - 1 : post.likes + 1,
              };
            return post;
          }) || [],
      };
    case 'ADD_POSTS':
      if (action.posts?.length === 0) return { ...state };
      return {
        ...state,
        posts: [
          ...(state.posts || []),
          // 기존 글과 중복되지 않는 글만 추가(인기순 정렬이 실시간으로 바뀌면 글이 중복될 수 있음)
          // 반대로 누락되는 글도 있지만, 일단 거기까진 고려하지 않기로 했음
          ...(action.posts?.filter(
            (post) => !state.posts?.filter((el) => el.id === post.id).length
          ) || []),
        ],
        url: action.url || '',
        page: action.page,
      };
    case 'CHANGE_SORT':
      return {
        ...state,
        sortBy: action.sortBy || 'like',
      };
    default:
      throw new Error();
  }
}

const Context = createContext<{
  state: State;
  dispatch: (value: Action) => void;
}>({
  state: initialState,
  dispatch: () => {},
});

export const PostsContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export const usePostsContext = () => useContext(Context);

export function useResetPosts() {
  const { state, dispatch } = usePostsContext();
  const { url } = state;
  const router = useRouter();

  useEffect(() => {
    if (url !== router.asPath) {
      dispatch({ type: 'RESET' });
    }
  }, [url, dispatch, router]);
}
