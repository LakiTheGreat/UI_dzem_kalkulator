export type OrderFruit = {
  grams: string;
  price: string;
  total: string;
  fruitId: string;
  fruitName?: string;
};

export type OrderCup = {
  id: number;
  label: string;
  numberOf: number;
  cost: number;
  sellingPrice: number;
  total: number;
};

export type OrderTotalCups = {
  label: string;
  numberOf: number;
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

export type OrderPatchRequest = NewOrder & { id: number };

export type OrderParams = {
  orderTypeId: number;
  priceStatus: PRICE_STATUS;
  year: number;
  month: number;
};

export type OrderResponse = {
  orders: Order[];
  totalValue: number;
  totalExpense: number;
  totalProfit: number;
  totalCups: OrderTotalCups[];
};

export const enum PRICE_STATUS {
  ALL = 0,
  ONLY_FREE = 1,
  ONLY_PAID = 2,
}
