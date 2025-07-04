import Toilet, { ToiletDTO } from "./toilet";

export type Role = "user" | "admin";

export interface UserDTO {
  id: string;
  email: string;
  role: Role;
  createdAt: string;
  toilets?: ToiletDTO[];
}

export interface UserModel {
  id: string;
  email: string;
  role: Role;
  createdAt: Date;
  toilets?: Toilet[];
}

export default class User implements UserModel {
  id: string;
  email: string;
  role: Role;
  createdAt: Date;
  toilets?: Toilet[];

  constructor(dto: UserDTO) {
    this.id = dto.id;
    this.email = dto.email;
    this.role = dto.role;
    this.createdAt = new Date(dto.createdAt);

    if (dto.toilets) {
      this.toilets = dto.toilets.map((t) => new Toilet(t));
    }
  }

  isAdmin() {
    return this.role === "admin";
  }
  get submissionCount(): number {
    return this.toilets?.length ?? 0;
  }

  static fromDTO(dto: UserDTO): User {
    return new User(dto);
  }
}
