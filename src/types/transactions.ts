import { CupData } from './inventory';

export type Transaction = {
  id: number;
  orderType: string;
  cups: CupData[];
  status: TransactionStatusStrings;
  createdAt: Date;
  isDeleted: boolean;
  note: string;
};

export enum TransactionStatusEnum {
  CONSUMED = 1,
  SOLD,
  GIVEN_AWAY,
  OTHER,
}

export enum TransactionStatusStrings {
  CONSUMED = 'CONSUMED',
  SOLD = 'SOLD',
  GIVEN_AWAY = 'GIVEN_AWAY',
  OTHER = 'OTHER',
}
