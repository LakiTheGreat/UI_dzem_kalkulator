export type TomatoCup = {
  id: number;
  label: string;
};

export type UnsavedTomatoOrder = {
  cupTypeId: number;
  numOfCups: number;
  totalExpenses: number;
};

export type TomatoOrder = UnsavedTomatoOrder & {
  id: number;
  label: string;
  createdAt: string;
};

export type TomatoParams = {
  transactionStatus: string | null;
};
