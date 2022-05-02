import { createContext, FC, useContext, useReducer } from 'react';
import { Post } from 'types';

interface Action {
  type: 'RESET' | 'CHANGE_POST' | 'ADD_POSTS';
  post?: Partial<Post>;
  posts?: Post[];
}

function reducer(state: Post[] | null, action: Action) {
  switch (action.type) {
    case 'RESET':
      return null;
    case 'CHANGE_POST':
      return (
        state?.map((post) => {
          if (post.id === action.post?.id) return { ...post, ...action.post };
          return post;
        }) || []
      );
    case 'ADD_POSTS':
      return [...(state || []), ...(action.posts || [])];
    default:
      throw new Error();
  }
}

const Context = createContext<{
  posts: Post[] | null;
  dispatch: (value: Action) => void;
}>({
  posts: null,
  dispatch: () => {},
});

export const PostsContextProvider: FC = ({ children }) => {
  const [posts, dispatch] = useReducer(reducer, null);

  return (
    <Context.Provider value={{ posts, dispatch }}>{children}</Context.Provider>
  );
};

export const usePostsContext = () => useContext(Context);
