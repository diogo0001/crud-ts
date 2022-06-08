import { BaseEntity } from "./base-entity.interface";

export interface BaseUser {
  name: string;
  lastName: string;
  age?: number;
  email?: string;
  document?: string;
}

export interface User extends BaseEntity, BaseUser {}

export const mockUsers: User[] = [
  {
    uuid: "22fe96b4-443d-4f92-adea-49f645703a24",
    name: "Tony",
    lastName: "Stark",
  },
  {
    uuid: "31a7e2f5-e271-41c1-9eb0-c1ca4a3d1c13",
    name: "Harry",
    lastName: "Potter",
  },
  {
    uuid: "fef049d2-d365-4b84-bbbb-a607e5e51590",
    name: "Marty",
    lastName: "Macfly",
    email: "back@future.doc",
  },
];
