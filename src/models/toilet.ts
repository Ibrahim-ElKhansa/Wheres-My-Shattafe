import Coordinates from "./coordinates";
import User, { UserDTO } from "./user";

export type Gender = "undefined" | "male" | "female" | "both";
export type Status = "pending" | "approved" | "rejected";

export interface ToiletDTO {
  id: string;
  name: string;
  lat: number;
  lng: number;
  gender: Gender;
  description?: string;
  upvoteCount?: number;
  downvoteCount?: number;

  // Admin-only, so optional on the public endpoint:
  status?: Status;
  submittedAt?: string;
  submittedById?: string;
  submittedBy?: UserDTO;
}

export interface ToiletModel {
  id: string;
  name: string;
  lat: number;
  lng: number;
  gender: Gender;
  description?: string;
  upvoteCount?: number;
  downvoteCount?: number;

  status?: Status;
  submittedAt?: Date;
  submittedById?: string;
  submittedBy?: User;
}

export default class Toilet implements ToiletModel {
  id: string;
  name: string;
  lat: number;
  lng: number;
  gender: Gender;
  description?: string;
  upvoteCount?: number;
  downvoteCount?: number;

  status?: Status;
  submittedAt?: Date;
  submittedById?: string;
  submittedBy?: User;

  constructor(dto: ToiletDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.lat = dto.lat;
    this.lng = dto.lng;
    this.gender = dto.gender;
    this.description = dto.description;
    this.upvoteCount = dto.upvoteCount;
    this.downvoteCount = dto.downvoteCount;

    this.status = dto.status;
    this.submittedById = dto.submittedById;
    this.submittedAt = dto.submittedAt ? new Date(dto.submittedAt) : undefined;
    this.submittedBy = dto.submittedBy ? new User(dto.submittedBy) : undefined;
  }

  getCoordinates(): Coordinates {
    return new Coordinates(this.lat, this.lng);
  }
  get totalVotes() {
    return (this.upvoteCount ?? 0) - (this.downvoteCount ?? 0);
  }

  static fromDTO(dto: ToiletDTO): Toilet {
    return new Toilet(dto);
  }
}
