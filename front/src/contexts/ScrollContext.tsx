import { Posts, PostsResponse } from '@src/types/Post';
import React, { createContext, useContext, useReducer } from 'react';
import { fetchAPI, getAuthOption } from '@lib/utils/fetch';

const FIX_FEED = 5;
const ITEM_HEIGHT = 650;

interface scrollState {
  startIndex: number;
  scrollTop: number;
  offset: number;
  height: number;
  feeds: Posts;
  totalFeeds: Posts;
}

export interface ScrollAction {
  type: 'CHANGE_SCROLL' | 'RESET_SCROLL' | 'CHANGE_TOTAL_FEEDS' | 'FETCH_POSTS' | 'RESET_FEEDS' | 'UPDATE_FEED';
  payload?: Partial<scrollState>;
  nextLike?: {
    feedId: number;
    like: 0 | 1;
  };
}

const initialState: scrollState = {
  startIndex: 0,
  scrollTop: 0,
  offset: 0,
  height: 0,
  feeds: [],
  totalFeeds: [],
};

interface IFetchPost {
  (habitat: number, lastFeedId?: number, accessToken?: string): Promise<{ totalFeeds: Posts }>;
}
export const fetchPost: IFetchPost = async (habitat, lastFeedId, accessToken) => {
  try {
    const posts = await new Promise(async (resolve, reject) => {
      fetchAPI(
        `/api/posts/habitats/${habitat}${lastFeedId ? `?lastPostId=${lastFeedId}` : ''}`,
        async (okResponse) => {
          const data: PostsResponse = await okResponse.json();
          const postsData: Posts = data.posts.map((post) => ({
            ...post,
            contents_url_array: post.post_contents_urls.split(','),
          }));
          resolve(postsData);
        },
        (failResponse) => {
          reject(failResponse);
        },
        (errResponse) => {
          reject(errResponse);
        },
        getAuthOption('GET', accessToken)
      );
    });

    return { totalFeeds: posts };
  } catch (e: any) {
    console.log(e);
    return e;
  }
};

const reducer = (state: scrollState, { type, payload, nextLike }: ScrollAction) => {
  switch (type) {
    case 'CHANGE_SCROLL': {
      const scrollTop = payload!.scrollTop!;
      const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
      const offset = startIndex * ITEM_HEIGHT;
      const feeds = state.totalFeeds.slice(startIndex, startIndex + FIX_FEED);

      return { ...state, scrollTop, startIndex, feeds, offset: offset < 0 ? 0 : offset };
    }
    case 'CHANGE_TOTAL_FEEDS': {
      const totalFeeds = [...state.totalFeeds, ...payload!.totalFeeds!];
      const height = totalFeeds.length * ITEM_HEIGHT;
      const feeds = totalFeeds.slice(state.startIndex, state.startIndex + FIX_FEED);

      return { ...state, totalFeeds, height, feeds };
    }
    case 'FETCH_POSTS': {
      const totalFeeds = [...state.totalFeeds, ...payload!.totalFeeds!];
      const feeds = totalFeeds.slice(state.startIndex, state.startIndex + FIX_FEED);

      return { ...state, totalFeeds, feeds };
    }
    case 'UPDATE_FEED': {
      const { feedId, like } = nextLike!;
      const totalFeeds: Posts = state.totalFeeds.map((feed) => (feed.post_id === feedId ? { ...feed, is_heart: like } : feed));
      const feeds = totalFeeds.slice(state.startIndex, state.startIndex + FIX_FEED);
      return { ...state, feeds, totalFeeds };
    }
    case 'RESET_SCROLL': {
      return { ...state, scrollTop: 0, offset: 0, height: 0 };
    }
    case 'RESET_FEEDS': {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

const ScrollStateContext = createContext<scrollState | null>(null);
const ScrollDispatchContext = createContext<React.Dispatch<ScrollAction> | null>(null);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ScrollDispatchContext.Provider value={dispatch}>
      <ScrollStateContext.Provider value={state}>{children}</ScrollStateContext.Provider>
    </ScrollDispatchContext.Provider>
  );
};

export const useScrollState = () => {
  const state = useContext(ScrollStateContext);
  if (!state) {
    throw new Error('user state context error');
  }
  return state;
};

export const useScrollDispatch = () => {
  const dispatch = useContext(ScrollDispatchContext);
  if (!dispatch) {
    throw new Error('user dispatch context error');
  }
  return dispatch;
};
