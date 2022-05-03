import { PostCardContextProvider } from 'context/PostCardContext';
import { PostsContextProvider } from 'context/PostsContext';
import { FC } from 'react';

const ContextsProvider: FC = ({ children }) => {
  return (
    <PostCardContextProvider>
      <PostsContextProvider>{children}</PostsContextProvider>
    </PostCardContextProvider>
  );
};

export default ContextsProvider;
