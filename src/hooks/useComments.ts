import { useReducer } from 'react';
import { Comment } from 'types';

interface State {
  comments: Comment[] | null;
  sortBy: 'like' | 'new';
  page?: number;
}

export interface CommentsAction {
  type:
    | 'RESET'
    | 'REMOVE_COMMENT'
    | 'CHANGE_COMMENT'
    | 'LIKE_COMMENT'
    | 'ADD_COMMENTS'
    | 'CHANGE_SORT';
  commentId?: number;
  comment?: Partial<Comment>;
  comments?: Comment[];
  sortBy?: 'like' | 'new';
  page?: number;
}

const initialState: State = { comments: null, sortBy: 'like' };

function reducer(state: State, action: CommentsAction) {
  switch (action.type) {
    case 'RESET':
      return { ...initialState, sortBy: state.sortBy };
    case 'REMOVE_COMMENT':
      return {
        ...state,
        comments:
          state.comments?.filter(
            (comment) => comment.commentId !== action.commentId
          ) || [],
      };
    case 'CHANGE_COMMENT':
      return {
        ...state,
        comments:
          state.comments?.map((comment) => {
            if (comment.commentId === action.comment?.commentId) {
              return { ...comment, ...action.comment };
            }
            return comment;
          }) || [],
      };
    case 'LIKE_COMMENT':
      return {
        ...state,
        comments:
          state.comments?.map((comment) => {
            if (comment.commentId === action.commentId)
              return {
                ...comment,
                liked: !comment.liked,
                likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
              };
            return comment;
          }) || [],
      };
    case 'ADD_COMMENTS':
      return {
        ...state,
        comments: [
          ...(state.comments || []),
          // PostsSlice.tsx 참고
          ...(action.comments?.filter(
            (comment) =>
              !state.comments?.filter(
                (el) => el.commentId === comment.commentId
              ).length
          ) || []),
        ],
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

function useComments() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}

export default useComments;
