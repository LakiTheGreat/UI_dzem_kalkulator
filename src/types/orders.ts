export type OrderFruit = {
  grams: string;
  price: string;
  total: string;
  fruitId: string;
  fruitName?: string;
};

export type OrderCup = {
  label: string;
  numberOf: number;
  cost: number;
  sellingPrice: number;
  total: number;
};

export type Order = {
  id: number;
  orderName: string;
  orderTypeId: number;
  orderTypeName: string;
  createdAt: Date;
  baseFruitIsFree: boolean;
  cups: OrderCup[];
  fruits: OrderFruit[];
  orderValue: number;
  orderExpense: number;
  orderProfit: number;
  profitMargin: number;
};

export type NewOrder = {
  fruits: OrderFruit[];
  cups: OrderCup[];
  orderTypeId: number;
  baseFruitIsFree: boolean;
  orderName: string;
  otherExpensesMargin: number;
};

export type OrderParams = {
  orderTypeId: number;
  priceStatus: PRICE_STATUS;
};

export type OrderResponse = {
  orders: Order[];
  totalValue: number;
  totalExpense: number;
  totalProfit: number;
};

export const enum PRICE_STATUS {
  ALL = 0,
  ONLY_FREE = 1,
  ONLY_PAID = 2,
}
