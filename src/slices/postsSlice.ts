import { AnyAction, createSlice, PayloadAction, Store } from '@reduxjs/toolkit';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { HYDRATE } from 'next-redux-wrapper';
import { useSelector } from 'react-redux';
import { State } from 'slices/store';
import { Post, User } from 'types';

type SortBy = 'like' | 'new' | 'following';

export interface PostsState {
  data: Post[] | null;
  sortBy: SortBy;
  page?: number;
  blockHydrate?: boolean;
  scrollY?: number;
  finished?: boolean;
}

const initialState: PostsState = { data: null, sortBy: 'like' };

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPosts: () => ({ ...initialState }),
    addPosts: (
      state,
      action: PayloadAction<{ data: Post[]; sortBy?: SortBy }>
    ) => ({
      ...state,
      data: [
        ...(state.data || []),
        // 기존 글과 중복되지 않는 글만 추가(인기순 정렬이 실시간으로 바뀌면 글이 중복될 수 있음)
        // 반대로 누락되는 글도 있지만, 일단 거기까진 고려하지 않기로 했음
        ...(action.payload.data.filter(
          (post) => !state.data?.filter((el) => el.id === post.id).length
        ) || []),
      ],
      page: state.sortBy === 'like' ? (state.page || 0) + 1 : undefined,
      sortBy: action.payload.sortBy || state.sortBy,
      finished: action.payload.data.length === 0 ? true : false,
    }),
    changePostsHydrate: (
      state,
      action: PayloadAction<{ block: boolean; scrollY?: number }>
    ) => ({
      ...state,
      blockHydrate: action.payload.block,
      scrollY:
        action.payload.scrollY !== undefined
          ? action.payload.scrollY
          : state.scrollY,
    }),
    likePost: (state, action: PayloadAction<number>) => ({
      ...state,
      data:
        state.data?.map((post) =>
          post.id === action.payload
            ? {
                ...post,
                liked: !post.liked,
                likes: post.liked ? post.likes - 1 : post.likes + 1,
              }
            : post
        ) || [],
    }),
    changePostComments: (
      state,
      action: PayloadAction<{ id: number; type: 'add' | 'delete' }>
    ) => ({
      ...state,
      data:
        state.data?.map((post) =>
          post.id === action.payload.id
            ? {
                ...post,
                comments:
                  action.payload.type === 'delete'
                    ? post.comments - 1
                    : post.comments + 1,
              }
            : post
        ) || [],
    }),
    changePostAuthor: (state, action: PayloadAction<User>) => ({
      ...state,
      data:
        state.data?.map((post) =>
          post.member.nickname === action.payload.nickname
            ? {
                ...post,
                member: { ...post.member, nickname: action.payload.nickname },
                profile: action.payload.image,
              }
            : post
        ) || [],
    }),
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      const { posts } = action.payload;
      return posts?.blockHydrate ? { ...state } : { ...state, ...posts };
    },
  },
});

export const {
  resetPosts,
  addPosts,
  changePostsHydrate,
  likePost,
  changePostComments,
  changePostAuthor,
} = postsSlice.actions;

export const usePosts = () =>
  useSelector<State, PostsState>((state) => state.posts);

export { initPosts, getIndex };

async function initPosts(
  url: string,
  store: Store<State, AnyAction>,
  context: GetServerSidePropsContext
) {
  try {
    const { user, posts } = store.getState();
    if (posts.blockHydrate) return;

    const { resolvedUrl } = context;
    const sortBy = getSortByUrl(resolvedUrl);
    const index = getIndex(posts, sortBy);
    const { data } = await axios.get<Post[]>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}${url}`,
      {
        params: {
          index,
          size: 10,
          sort: sortBy,
          nickname: user?.nickname,
          keyword: context.query.q ? context.query.q : null,
        },
      }
    );
    store.dispatch(addPosts({ data, sortBy }));
  } catch (err) {
    console.error(err);
  }
}

function getSortByUrl(url: string) {
  if (url?.match(/.*\/recent.*/)) return 'new';
  if (url?.match(/.*\/following.*/)) return 'following';
  return 'like';
}

function getIndex(posts: PostsState, sortBy?: SortBy) {
  const { sortBy: s, data, page } = posts;
  switch (sortBy || s) {
    case 'new':
    case 'following':
      return !data ? Number.MAX_SAFE_INTEGER : data[data.length - 1].id;
    case 'like':
      return !data ? 0 : page || 0;
  }
}

export default postsSlice;
