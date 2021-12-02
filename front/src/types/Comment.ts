export interface Comment {
  id: number;
  createdAt: string;
  content: string;
  postId: number;
  userId: number;
  user: {
    nickname: string;
    content: {
      url: string | null;
    };
  };
}

export type Comments = Comment[];
