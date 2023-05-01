// types.ts
export type DeepRequired<T> = {
    [K in keyof T]-?: Required<T[K]>;
  };
  