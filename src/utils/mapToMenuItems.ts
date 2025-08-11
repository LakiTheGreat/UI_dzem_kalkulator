import { MenuItemType } from '../components/RHFSelectInput';
import { Cup, CupWithPriceData } from '../types/cups';
import { Fruit } from '../types/fruits';
import { TransactionStatusStrings } from '../types/transactions';
import getStatusTranslation from './getStatusTranslation';

export const mapFruitToMenuItems = (
  fruits: Fruit[] | undefined
): MenuItemType[] => {
  if (!fruits) return [];
  return fruits.map(
    (fruit: Fruit): MenuItemType => ({
      id: fruit.id,
      value: fruit.id,
      menuItemLabel: fruit.label,
      isDeleted: fruit.isDeleted,
    })
  );
};

export const mapCupsToMenuItems = (cups: Cup[] | undefined): MenuItemType[] => {
  if (!cups) return [];
  return cups.map(
    (cup: Cup): MenuItemType => ({
      id: cup.id,
      value: cup.label,
      menuItemLabel: cup.label,
      isDeleted: cup.isDeleted,
    })
  );
};

export const mapCupsWithDataToMenuItems = (
  cups: CupWithPriceData[] | undefined
): MenuItemType[] => {
  if (!cups) return [];
  return cups.map(
    (cup: CupWithPriceData): MenuItemType => ({
      id: cup.id,
      value: cup.id,
      menuItemLabel: cup.label,
      isDeleted: cup.isDeleted,
    })
  );
};

export const mapAllTransactionStatusesToMenuItems = (): MenuItemType[] => {
  return Object.values(TransactionStatusStrings).map((status) => ({
    id: status,
    value: status,
    menuItemLabel: getStatusTranslation(status),
  }));
};
