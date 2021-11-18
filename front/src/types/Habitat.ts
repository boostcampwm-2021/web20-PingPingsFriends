export interface Habitat {
  id: number;
  name: string;
  color: string;
  leaderId: string | number;
}
export type HabitatLists = Habitat[];

type RecentUserInfo = {
  userId: string;
  createdAt: Date;
  url: string | null;
  nickname: string;
};
type Leader = {
  userId: number;
  nickname: string;
  url: null | string;
};
export interface HabitatInfo {
  habitat: Habitat;
  leader: null | Leader;
  userCnt: number;
  postCnt: number;
  recentUsers: RecentUserInfo[];
  lastActTime: Date;
}
