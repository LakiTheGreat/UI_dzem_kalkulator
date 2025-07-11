import { MenuItemType } from '../components/RHFSelectInput';
import { Cup } from '../types/cups';
import { Fruit } from '../types/fruits';

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
