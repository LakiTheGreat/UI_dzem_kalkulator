export type BouquetTransaction = {
  id: number;
  note: string;
  totalExpense: number;
  income: number;
  profit: number;
  profitMargin: number;
  createdAt: Date;
  isDeleted: boolean;
};
