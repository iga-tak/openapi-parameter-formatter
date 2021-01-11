import { PrimitiveType, ObjectType, ArrayType } from "./Types";
import * as Guard from "./Guard";

export interface ParameterOfForm {
  value: PrimitiveType | ArrayType | ObjectType;
  style: "form";
  explode: boolean;
}

export interface ParameterOfSpaceDelimited {
  value: ArrayType | ObjectType;
  style: "spaceDelimited";
  explode: boolean;
}

export interface ParameterOfPipeDelimited {
  value: ArrayType | ObjectType;
  style: "pipeDelimited";
  explode: boolean;
}

export interface ParameterOfDeepObject {
  value: ObjectType;
  style: "deepObject";
  explode: boolean;
}

export type Parameter = ParameterOfForm | ParameterOfSpaceDelimited | ParameterOfPipeDelimited | ParameterOfDeepObject;

export const generateFormParamter = (key: string | number, params: ParameterOfForm): string => {
  if (Guard.isEmpty(params.value)) {
    return `${key}=`;
  }
  if (Guard.isPrimitive(params.value)) {
    return `${key}=${params.value}`;
  }
  if (Guard.isArray(params.value)) {
    if (params.explode) {
      return params.value.map(item => `${key}=${item}`).join("&");
    } else {
      return `${key}=${params.value.join(",")}`;
    }
  }
  if (Guard.isObject(params.value)) {
    if (params.explode) {
      return Object.entries(params.value)
        .map(([k, v]) => `${k}=${v}`)
        .join("&");
    } else {
      const value = Object.entries(params.value)
        .map(([k, v]) => `${k},${v}`)
        .join(",");
      return `${key}=${value}`;
    }
  }
  return `${key}=`;
};

export const generate = (key: string | number, params: Parameter): string => {
  if (params.style === "form") {
    return generateFormParamter(key, params);
  }
  return `${key}`;
};
