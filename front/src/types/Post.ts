export interface Post {
  post_id: number;
  human_content: string;
  animal_content: string;
  created_at: string;
  user_id: number;
  username: string;
  nickname: string;
  user_image_url: null;
  post_contents_urls: string;
  post_contents_types: string;
  numOfHearts: string;
  is_heart: string;
}

export type Posts = Post[];
