import { TransactionStatusStrings } from './transactions';

export type TomatoCup = {
  id: number;
  label: string;
};

export type TomatoTotal = {
  cupTypeId: number;
  label: string;
  totalCups: number;
  totalOrdered: number;
  totalUsedInTransactions: number;
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

export type TomatoTransactionParams = TomatoOrderParams & {
  transactionStatus: TransactionStatusStrings | null;
};

export type TomatoOrderParams = {
  year: number;
  month: number;
};

export type UnsavedTomatoTransaction = {
  note: string;
  status: TransactionStatusStrings;
  cupTypeId: number;
  numOfCups: number;
  pricePerCup: number;
};

export type TomatoTransaction = UnsavedTomatoTransaction & {
  id: number;
  createdAt?: string;
  isDeleted?: boolean;
  label?: string;
};
