export type BouquetTransaction = {
  id: number;
  note: string;
  totalExpense: number;
  income: number;
  profit: number;
  profitMargin: number;
  createdAt: Date;
  isDeleted: boolean;
  status: BouquetTransactionEnum;
};

export enum BouquetTransactionEnum {
  SOLD = 'SOLD',
  GIVEN_AWAY = 'GIVEN_AWAY',
  PROMOTION = 'PROMOTION',
  OTHER = 'OTHER',
}

export type BouquetParams = {
  transactionStatus: string | null;
};
