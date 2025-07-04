import User, { UserDTO } from "./user";
import Toilet, { ToiletDTO } from "./toilet";

export type VoteType = "UPVOTE" | "DOWNVOTE";

export interface VoteDTO {
  id: string;
  type: VoteType;
  userId: string;
  toiletId: string;
  createdAt: string;
  user?: UserDTO;
  toilet?: ToiletDTO;
}

export interface VoteModel {
  id: string;
  type: VoteType;
  userId: string;
  toiletId: string;
  createdAt: Date;
  user?: User;
  toilet?: Toilet;
}

export default class Vote implements VoteModel {
  id: string;
  type: VoteType;
  userId: string;
  toiletId: string;
  createdAt: Date;
  user?: User;
  toilet?: Toilet;

  constructor(dto: VoteDTO) {
    this.id = dto.id;
    this.type = dto.type;
    this.userId = dto.userId;
    this.toiletId = dto.toiletId;
    this.createdAt = new Date(dto.createdAt);

    if (dto.user) this.user = new User(dto.user);
    if (dto.toilet) this.toilet = new Toilet(dto.toilet);
  }

  static fromDTO(dto: VoteDTO): Vote {
    return new Vote(dto);
  }

  isUpvote(): boolean {
    return this.type === "UPVOTE";
  }
  isDownvote(): boolean {
    return this.type === "DOWNVOTE";
  }
}
