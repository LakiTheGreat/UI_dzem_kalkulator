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
  baseFruitIsFree: boolean;
  createdAt: Date;
};

export type NewOrder = { orderTypeId: number } & Omit<
  Order,
  'id' | 'createdAt' | 'orderTypeName'
>;

export type OrderParams = {
  orderTypeId: number;
  priceStatus: PRICE_STATUS;
};

export type OrderResponse = {
  orders: Order[];
  totalValue: number;
  totalExpense: number;
  totalProfit: number;
  totalSmallCups: number;
  totalLargeCups: number;
};

export const enum PRICE_STATUS {
  ALL = 0,
  ONLY_FREE = 1,
  ONLY_PAID = 2,
}
