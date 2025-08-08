export type InventoryItem = {
  cupId?: number;
  label: string;
  numberOf: number;
};

export type Inventory = {
  orderTypeId: number;
  label: string;
  cups: InventoryItem[];
};

export type InventoryPostRequest = {
  orderTypeId: number;
  cupData: CupData[];
};

export type CupData = {
  cupId: number;
  quantity: number;
};
