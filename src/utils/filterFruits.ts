import { Fruit } from '../types/fruits';

const EXCLUDED_LABELS = [
  'Limun',
  'Urme',
  'Lešnik',
  'Orah',
  'Čia semenke',
  'Kakao',
];

export default function filterFruits(fruits: Fruit[] | undefined) {
  if (!fruits) return [];

  const filteredFruits = fruits.filter(
    (fruit) => !EXCLUDED_LABELS.includes(fruit.label)
  );

  return filteredFruits;
}
