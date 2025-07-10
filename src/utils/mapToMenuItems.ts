import { MenuItemType } from '../components/RHFSelectInput';
import { Fruit } from '../types/fruits';

export const mapFruitToMenuItems = (
  fruits: Fruit[] | undefined
): MenuItemType[] => {
  if (!fruits) return [];
  return fruits.map(
    (fruit: Fruit): MenuItemType => ({
      id: fruit.id,
      value: fruit.label,
      menuItemLabel: fruit.label,
      isDeleted: fruit.isDeleted,
    })
  );
};
