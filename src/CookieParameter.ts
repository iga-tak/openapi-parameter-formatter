import { PrimitiveType, ObjectType, ArrayType } from "./Types";

export interface CookieParameter {
  value: PrimitiveType | ObjectType | ArrayType;
  style?: "form";
  explode: boolean;
}
