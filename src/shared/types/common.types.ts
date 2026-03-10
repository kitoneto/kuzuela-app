export interface WithId {
  id: string;
}

export interface WithTimestamps {
  createdAt: string;
  updatedAt: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
