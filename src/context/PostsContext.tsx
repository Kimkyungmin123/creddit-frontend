import { useRouter } from 'next/router';
import { createContext, FC, useContext, useEffect, useReducer } from 'react';
import { Post } from 'types';

interface State {
  posts: Post[] | null;
  url: string;
}

interface Action {
  type: 'RESET' | 'CHANGE_POST' | 'LIKE_POST' | 'ADD_POSTS';
  postId?: number;
  post?: Partial<Post>;
  posts?: Post[];
  url?: string;
}

const initialState: State = { posts: null, url: '' };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'RESET':
      return { ...initialState };
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
      return {
        ...state,
        posts: [...(state.posts || []), ...(action.posts || [])],
        url: action.url || '',
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
