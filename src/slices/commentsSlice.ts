import { AnyAction, createSlice, PayloadAction, Store } from '@reduxjs/toolkit';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { HYDRATE } from 'next-redux-wrapper';
import { useSelector } from 'react-redux';
import { State } from 'slices/store';
import { Comment } from 'types';
import getInfiniteScrollIndex from 'utils/getInfiniteScrollIndex';

type SortBy = 'like' | 'new';

export interface CommentsState {
  data: Comment[] | null;
  sortBy: SortBy;
  page?: number;
  finished?: boolean;
}

const initialState: CommentsState = { data: null, sortBy: 'like' };

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComments: (
      state,
      action: PayloadAction<{ data: Comment[]; sortBy?: SortBy }>
    ) => ({
      ...state,
      data: [
        ...(state.data || []),
        // PostsSlice.tsx 참고
        ...action.payload.data.filter(
          (comment) =>
            !state.data?.filter((el) => el.commentId === comment.commentId)
              .length
        ),
      ],
      page: state.sortBy === 'like' ? (state.page || 0) + 1 : undefined,
      sortBy: action.payload.sortBy || state.sortBy,
      finished: action.payload.data.length === 0 ? true : false,
    }),
    addComment: (state, action: PayloadAction<Comment>) => ({
      ...state,
      data: state.data ? [action.payload, ...state.data] : state.data,
    }),
    removeComment: (state, action: PayloadAction<number>) => ({
      ...state,
      data:
        state.data?.filter((comment) => comment.commentId !== action.payload) ||
        [],
    }),
    changeComment: (state, action: PayloadAction<Comment>) => ({
      ...state,
      data: state.data
        ? state.data.map((comment) =>
            comment.commentId === action.payload.commentId
              ? { ...comment, ...action.payload }
              : comment
          )
        : state.data,
    }),
    likeComment: (state, action: PayloadAction<number>) => ({
      ...state,
      data: state.data
        ? state.data.map((comment) =>
            comment.commentId === action.payload
              ? {
                  ...comment,
                  liked: !comment.liked,
                  likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
                }
              : comment
          )
        : state.data,
    }),
    removeCommentsLike: (state) => ({
      ...state,
      data: state.data
        ? state.data.map((comment) => ({ ...comment, liked: false }))
        : state.data,
    }),
    changeCommentsSort: (state, action: PayloadAction<SortBy>) => ({
      ...state,
      sortBy: action.payload,
      data: state.sortBy === action.payload ? state.data : null,
    }),
    changeReplyCount: (
      state,
      action: PayloadAction<{ id: number; type: 'add' | 'remove' }>
    ) => ({
      ...state,
      data: state.data
        ? state.data.map((comment) =>
            comment.commentId === action.payload.id
              ? {
                  ...comment,
                  detailCommentCount:
                    (comment.detailCommentCount || 0) +
                    (action.payload.type === 'add' ? 1 : -1),
                }
              : comment
          )
        : state.data,
    }),
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.comments,
    }),
  },
});

export const {
  addComments,
  addComment,
  removeComment,
  changeComment,
  likeComment,
  removeCommentsLike,
  changeCommentsSort,
  changeReplyCount,
} = commentsSlice.actions;

export const useComments = () =>
  useSelector<State, CommentsState>((state) => state.comments);

export async function initComments(
  store: Store<State, AnyAction>,
  context: GetServerSidePropsContext
) {
  try {
    const { comments } = store.getState();
    const { params } = context;
    const index = getInfiniteScrollIndex(comments);
    const { sortBy } = comments;
    const { access_token } = context.req.cookies;
    const { data } = await axios.get<Comment[]>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/comment?postId=${params?.id}&index=${index}&size=10&sort=${sortBy}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    store.dispatch(addComments({ data }));
  } catch (err) {
    console.error(err);
  }
}

export default commentsSlice;
