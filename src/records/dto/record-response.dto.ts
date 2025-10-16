import { Record } from "../records.model";

export class RecordResponseDto {
  id: number;
  userId: number;
  gameId: string;
  score: number;
  user: {
    name: string;
  };

  constructor(record: Record) {
    this.id = record.id;
    this.userId = Number(record.userId);
    this.gameId = record.gameId;
    this.score = record.score;
    this.user = {
      name: record.user.name
    };
  }
}