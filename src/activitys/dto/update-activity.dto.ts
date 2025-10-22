export interface UpdateActivityDto {
  userId: number;
  isRewarded: boolean;
  lastEntry: Date;
  streak: number;
}