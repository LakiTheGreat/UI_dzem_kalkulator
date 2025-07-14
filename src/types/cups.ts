export type Cup = {
  id: number;
  value: number;
  label: string;
  isDeleted: boolean;
};

export type CupWithPriceData = {
  id: number;
  value: number;
  label: string;
  const: number;
  sellingPrice: number;
};
