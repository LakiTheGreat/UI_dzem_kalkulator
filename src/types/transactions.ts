import { CupData } from './inventory';

export type Transaction = {
  id: number;
  orderType?: string;
  orderTypeId?: number;
  cups: CupData[];
  status: TransactionStatusStrings;
  createdAt: Date;
  isDeleted: boolean;
  note: string;
};

export type UnsavedTransaction = {
  orderTypeId: number;
  status: TransactionStatusStrings;
  cupData: CupData[];
};

export enum TransactionStatusEnum {
  CONSUMED = 1,
  SOLD,
  GIVEN_AWAY,
  OTHER,
}

export enum TransactionStatusStrings {
  SOLD = 'SOLD',
  CONSUMED = 'CONSUMED',
  GIVEN_AWAY = 'GIVEN_AWAY',
  OTHER = 'OTHER',
}
