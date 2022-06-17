import { BaseEntity } from "./base-entity.interface";

export interface BaseUser {
  name: string;
  lastName: string;
  age?: number;
  email: string;
  document?: string;
}

export interface User extends BaseEntity, BaseUser {
  hash: string;
  token?: string;
}

// melhorar os modelos de usuario, criar para situações especificas
// registro, retorno dos gets, etc

// ainda está tudo junto, mas a idéia é se possa ter niveis diferentes, admim, usuario, etc
// vai ser melhorado
