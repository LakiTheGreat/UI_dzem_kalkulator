export type Cup = {
  id: number;
  value: number;
  label: string;
  isDeleted: boolean;
};

export type CupWithPriceData = {
  id: number;
  label: string;
  isDeleted: boolean;
  cost: number;
  sellingPrice: number;
};
