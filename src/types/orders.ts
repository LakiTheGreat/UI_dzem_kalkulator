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

export type OrderParams = {
  orderTypeId: number;
};

export type OrderResponse = {
  orders: Order[];
  totalValue: number;
  totalExpense: number;
  totalProfit: number;
};
