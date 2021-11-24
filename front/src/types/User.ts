interface Content {
  id: number;
  url: string;
  mimeType: string;
}

interface Species {
  name: string;
}

interface Habitat {
  id: number;
  name: string;
}

export interface User {
  id: number;
  username: string;
  nickname: string;
  habitat: Habitat | null;
  species: Species | null;
  content: null | Content;
}

interface UserFeed {
  postId: number;
  url: string;
  numOfHearts: number;
}

export type UserFeeds = UserFeed[];
