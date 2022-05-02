import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface Value {
  clickedPostCard: boolean;
  setClickedPostCard: Dispatch<SetStateAction<boolean>>;
}

const Context = createContext<Value>({
  clickedPostCard: false,
  setClickedPostCard: () => {},
});

export const PostCardContextProvider: FC = ({ children }) => {
  const [clickedPostCard, setClickedPostCard] = useState(false);

  return (
    <Context.Provider value={{ clickedPostCard, setClickedPostCard }}>
      {children}
    </Context.Provider>
  );
};

export const usePostCardContext = () => useContext(Context);
