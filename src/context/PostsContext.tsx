import { createContext, FC, useContext, useReducer } from 'react';
import { Post } from 'types';

interface Value {
  posts: Post[];
  dispatch: (value: Action) => void;
}

const Context = createContext<Value>({
  posts: [],
  dispatch: () => {},
});

interface Action {
  type: 'RESET' | 'CHANGE_POST' | 'ADD_POSTS';
  post?: Partial<Post>;
  posts?: Post[];
}

function reducer(state: Post[], action: Action) {
  switch (action.type) {
    case 'RESET':
      return [];
    case 'CHANGE_POST':
      return state.map((post) => {
        if (post.id === action.post?.id) return { ...post, ...action.post };
        return post;
      });
    case 'ADD_POSTS':
      return [...state, ...(action.posts || [])];
    default:
      throw new Error();
  }
}

export const PostsContextProvider: FC = ({ children }) => {
  const [posts, dispatch] = useReducer(reducer, []);

  return (
    <Context.Provider value={{ posts, dispatch }}>{children}</Context.Provider>
  );
};

export const usePostsContext = () => useContext(Context);
