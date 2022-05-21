import { useReducer } from 'react';
import { Comment } from 'types';

type State = Comment[] | null;

export interface CommentsAction {
  type:
    | 'ADD_MULTIPLE'
    | 'ADD_ONE'
    | 'REMOVE_ONE'
    | 'CHANGE_ONE'
    | 'LIKE_ONE'
    | 'REMOVE_ALL_LIKE';
  payload?: any;
}

const initialState = null;

export {
  addReplies,
  addReply,
  removeReply,
  changeReply,
  likeReply,
  removeRepliesLike,
};

const addReplies = (payload: Comment[]): CommentsAction => ({
  type: 'ADD_MULTIPLE',
  payload,
});

const addReply = (payload: Comment): CommentsAction => ({
  type: 'ADD_ONE',
  payload,
});

const removeReply = (payload: number): CommentsAction => ({
  type: 'REMOVE_ONE',
  payload,
});

const changeReply = (payload: Comment): CommentsAction => ({
  type: 'CHANGE_ONE',
  payload,
});

const likeReply = (payload: number): CommentsAction => ({
  type: 'LIKE_ONE',
  payload,
});

const removeRepliesLike = (): CommentsAction => ({
  type: 'REMOVE_ALL_LIKE',
});

function reducer(state: State, action: CommentsAction) {
  switch (action.type) {
    case 'ADD_MULTIPLE': {
      const payload = action.payload as Comment[];
      return [
        ...(state || []),
        // PostsSlice.tsx 참고
        ...payload.filter(
          (reply) =>
            !state?.filter((el) => el.commentId === reply.commentId).length
        ),
      ];
    }
    case 'ADD_ONE': {
      const payload = action.payload as Comment;
      return [payload, ...(state || [])];
    }
    case 'REMOVE_ONE': {
      const payload = action.payload as number;
      return state
        ? state.filter((reply) => reply.commentId !== payload)
        : state;
    }
    case 'CHANGE_ONE': {
      const payload = action.payload as Comment;
      return state
        ? state.map((reply) =>
            reply.commentId === payload.commentId
              ? { ...reply, ...payload }
              : reply
          )
        : state;
    }
    case 'LIKE_ONE': {
      const payload = action.payload as number;
      return state
        ? state.map((comment) =>
            comment.commentId === payload
              ? {
                  ...comment,
                  liked: !comment.liked,
                  likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
                }
              : comment
          )
        : state;
    }
    case 'REMOVE_ALL_LIKE':
      return state
        ? state.map((comment) => ({ ...comment, liked: false }))
        : state;
    default:
      return state;
  }
}

function useReplies() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}

export default useReplies;
