import { MenuItemType } from '../components/RHFSelectInput';
import { BouquetTransactionEnum } from '../types/bouguets';
import { Cup, CupWithPriceData } from '../types/cups';
import { Fruit } from '../types/fruits';
import { TomatoCup } from '../types/tomatos';
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

const allStatusesMenuItem: MenuItemType = {
  id: TransactionStatusStrings.ALL,
  value: TransactionStatusStrings.ALL,
  menuItemLabel: getStatusTranslation(TransactionStatusStrings.ALL),
};

type StatusMenuItemsOptions = { includeAll?: boolean };

// includeAll adds "Prikaži sve" (filters only; forms must not offer it as a status)
export const mapAllTransactionStatusesToMenuItems = ({
  includeAll = false,
}: StatusMenuItemsOptions = {}): MenuItemType[] => {
  const items = Object.values(TransactionStatusStrings)
    .filter((status) => status !== TransactionStatusStrings.ALL)
    .map((status) => ({
      id: status,
      value: status,
      menuItemLabel: getStatusTranslation(status),
    }));
  return includeAll ? [allStatusesMenuItem, ...items] : items;
};

export const mapBouquetTransactionStatusesToMenuItems = ({
  includeAll = false,
}: StatusMenuItemsOptions = {}): MenuItemType[] => {
  const items = Object.values(BouquetTransactionEnum).map((status) => ({
    id: status,
    value: status,
    menuItemLabel: getStatusTranslation(status),
  }));
  return includeAll ? [allStatusesMenuItem, ...items] : items;
};

export const mapTomatoCupsToMenuItems = (
  cups: TomatoCup[] | undefined
): MenuItemType[] => {
  if (!cups) return [];
  return cups.map(
    (cup: TomatoCup): MenuItemType => ({
      id: cup.id,
      value: cup.id,
      menuItemLabel: cup.label,
    })
  );
};
