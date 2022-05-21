import { SortBy } from 'types';

function getInfiniteScrollIndex(state: any, sortBy?: SortBy) {
  const { sortBy: s, data, page } = state;
  switch (sortBy || s) {
    case 'new':
    case 'following':
      return !data
        ? Number.MAX_SAFE_INTEGER
        : data[data.length - 1].id || data[data.length - 1].commentId;
    case 'like':
      return !data ? 0 : page || 0;
  }
}

export default getInfiniteScrollIndex;
