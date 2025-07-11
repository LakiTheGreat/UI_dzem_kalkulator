export type Order = {
  id: number;
  orderTypeName: string;
  orderName: string;
  numberOfSmallCups: number;
  numberOfLargeCups: number;
  totalExpense: number;
  totalValue: number;
  profit: number;
  profitMargin: number;
  createdAt: Date;
};

export type NewOrder = { orderTypeId: number } & Omit<
  Order,
  'id' | 'createdAt' | 'orderTypeName'
>;
