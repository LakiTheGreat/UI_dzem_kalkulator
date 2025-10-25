export type TomatoCup = {
  id: number;
  label: string;
};

export type TomatoTotal = {
  cupTypeId: number;
  label: string;
  totalCups: number;
};

export type UnsavedTomatoOrder = {
  cupTypeId: number;
  numOfCups: number;
  totalExpenses: number;
};

export type TomatoOrder = UnsavedTomatoOrder & {
  id: number;
  label?: string;
  createdAt?: string;
  isDeleted?: boolean;
};

export type TomatoParams = {
  transactionStatus: string | null;
};
