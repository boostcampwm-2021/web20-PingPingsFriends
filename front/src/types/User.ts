interface Content {
  id: number;
  url: string;
  mimeType: string;
}

export interface User {
  id: number;
  username: string;
  nickname: string;
  habitatId: number | null;
  speciesId: null | number;
  content: null | Content;
}

interface UserFeed {
  postId: number;
  url: string;
  numOfHearts: number;
}

export type UserFeeds = UserFeed[];
