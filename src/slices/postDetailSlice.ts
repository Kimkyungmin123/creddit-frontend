import { AnyAction, createSlice, PayloadAction, Store } from '@reduxjs/toolkit';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { HYDRATE } from 'next-redux-wrapper';
import { useSelector } from 'react-redux';
import { State } from 'slices/store';
import { Post } from 'types';

export type PostDetailState = Post | null;

const postDetailSlice = createSlice({
  name: 'postDetail',
  initialState: null as PostDetailState,
  reducers: {
    setPostDetail: (_, action: PayloadAction<Post | null>) => action.payload,
    likePostDetail: (state) =>
      state
        ? {
            ...state,
            liked: !state.liked,
            likes: state.liked ? state.likes - 1 : state.likes + 1,
          }
        : state,
    changePostDetailComments: (
      state,
      action: PayloadAction<'delete' | 'add'>
    ) =>
      state
        ? {
            ...state,
            comments:
              action.payload === 'delete'
                ? state.comments - 1
                : state.comments + 1,
          }
        : state,
    removePostDetailLike: (state) =>
      state ? { ...state, liked: false } : state,
  },
  extraReducers: {
    [HYDRATE]: (_, action) => action.payload.postDetail,
  },
});

export const {
  setPostDetail,
  likePostDetail,
  changePostDetailComments,
  removePostDetailLike,
} = postDetailSlice.actions;

export const usePostDetail = () =>
  useSelector<State, PostDetailState>((state) => state.postDetail);

export async function initPostDetail(
  store: Store<State, AnyAction>,
  context: GetServerSidePropsContext
) {
  try {
    const { user } = store.getState();
    const { id } = context.query;
    const userQuery = user ? `?nickname=${user.nickname}` : '';
    const { data: post } = await axios.get<Post>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/post/${id}${userQuery}`
    );
    store.dispatch(setPostDetail(post));
  } catch (err) {
    console.error(err);
  }
}

export default postDetailSlice;
