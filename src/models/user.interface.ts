import { BaseEntity } from "./base-entity.interface";

export interface BaseUser {
  name: string;
  lastName: string;
  age?: number;
  email?: string;
  document?: string;
}

export interface User extends BaseEntity, BaseUser {}
