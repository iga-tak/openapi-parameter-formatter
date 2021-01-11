import { ArrayType } from "./Types";

export interface HeaderParameter {
  value: ArrayType;
  style?: "simple";
  explode: boolean;
}
