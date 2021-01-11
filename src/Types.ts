export type NullType = null;
export type UndefinedType = undefined;
export type BigIntType = BigInt;
export type SymbolType = symbol;
export type PrimitiveType = string | number | boolean | NullType | UndefinedType | BigIntType;
export type ObjectType = { [key: string]: any };
export type ArrayType = any[];
