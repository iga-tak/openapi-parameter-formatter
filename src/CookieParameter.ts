import { PrimitiveType, ObjectType, ArrayType, ParameterOfForm } from "./Types";
import * as Guard from "./Guard";

export interface Parameter {
  value: PrimitiveType | ObjectType | ArrayType;
  style: "form";
  explode: boolean;
}

export const generate = (key: string | number, params: Parameter): string | undefined => {
  if (params.style === "form") {
    return generateFormParamter(key, params);
  }
  return undefined;
};

const generateFormParamter = (key: string | number, params: ParameterOfForm): string => {
  if (Guard.isEmpty(params.value)) {
    return `${key}=`;
  }
  if (Guard.isPrimitive(params.value)) {
    return `${key}=${params.value}`;
  }
  if (Guard.isArray(params.value)) {
    if (params.explode) {
      return params.value.map(item => `${key}=${item}`).join(";");
    } else {
      return `${key}=${params.value.join(",")}`;
    }
  }
  if (Guard.isObject(params.value)) {
    if (params.explode) {
      return Object.entries(params.value)
        .map(([k, v]) => `${k}=${v}`)
        .join(";");
    } else {
      const value = Object.entries(params.value)
        .map(([k, v]) => `${k},${v}`)
        .join(",");
      return `${key}=${value}`;
    }
  }
  return `${key}=`;
};
