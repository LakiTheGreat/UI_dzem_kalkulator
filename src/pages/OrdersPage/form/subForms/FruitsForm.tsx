import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import RHFCheckbox from '../../../../components/RHFCheckbox';
import RHFSelectInput, {
  MenuItemType,
} from '../../../../components/RHFSelectInput';
import RHFTextInput from '../../../../components/RHFTextInput';
import { EXCLUDED_LABELS } from '../../../../utils/filterFruits';
import FormattedPrice from '../../../../utils/FormattedPrice';
import { FruitItem } from '../index';

type Props = {
  mappedData: MenuItemType[];
};

export default function FruitsForm({ mappedData }: Props) {
  const { control, register, setValue } = useFormContext<{
    fruits: FruitItem[];
  }>();

  const included = mappedData.filter(
    (item) => !EXCLUDED_LABELS.includes(String(item.menuItemLabel))
  );

  const excluded = mappedData
    .filter((item) => EXCLUDED_LABELS.includes(String(item.menuItemLabel)))
    .sort((a, b) =>
      String(a.menuItemLabel).localeCompare(String(b.menuItemLabel))
    );

  // Create sorted array with a divider
  const sortedDataWithDivider =
    excluded.length > 0
      ? [
          ...included,
          {
            id: 'divider',
            value: 'divider',
            menuItemLabel: 'DIVIDER',
          },
          ...excluded,
        ]
      : included;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fruits',
  });

  const fruits = useWatch({
    control,
    name: 'fruits',
  });

  useEffect(() => {
    fruits.forEach((fruit, index) => {
      const grams = Number(fruit.grams);
      const price = Number(fruit.price);
      const calculatedTotal =
        grams > 0 && price > 0 ? ((price / 1000) * grams).toFixed(0) : '';

      // Normalize values to string for comparison
      const currentTotal = fruit.total?.toString() ?? '';

      if (currentTotal !== calculatedTotal) {
        setValue(`fruits.${index}.total`, calculatedTotal);
      }
    });
  }, [fruits, setValue]);

  return (
    <Stack>
      <RHFCheckbox name='baseFruitIsFree' label='Osnova je besplatna' />
      <Stack gap={1}>
        <Typography variant='caption'>
          Neophodno je uneti <strong>makar jedno voće</strong> i{' '}
          <strong>njegovu gramažu.</strong>
        </Typography>
        <Typography variant='caption'>
          Cena nije obavezna. Ali da bi sistem ovu seriju upamtio kao "Besplatna
          osnova" neophodno je čekirati checkbox iznad ("Osnova je besplatna").
        </Typography>
      </Stack>
      {fields.map((field, index) => (
        <Stack key={field.id} gap={2}>
          <Stack direction='column' alignItems='center' gap={2}>
            <Stack sx={{ width: '100%' }}></Stack>
            <Stack sx={{ width: '100%' }}>
              <RHFSelectInput
                menuItems={sortedDataWithDivider.map((item) =>
                  item.value === 'divider' ? { ...item, disabled: true } : item
                )}
                label='Voće'
                name={`fruits.${index}.fruitId`}
              />
            </Stack>
            <Stack direction='row' gap={1} sx={{ width: '100%' }}>
              <Stack sx={{ flex: 1 }}>
                <RHFTextInput
                  type='number'
                  label='Gramaža'
                  {...register(`fruits.${index}.grams`)}
                />
              </Stack>

              <Stack sx={{ flex: 1 }}>
                <RHFTextInput
                  type='number'
                  label='Cena/kg'
                  {...register(`fruits.${index}.price`)}
                />
              </Stack>
            </Stack>
            <Stack direction='row' gap={2} alignItems='center'>
              <Stack sx={{ flex: 1, alignItems: 'center' }}>
                <Typography>Ukupno:</Typography>
                <FormattedPrice price={fruits[index]?.total ?? ''} isBold />
              </Stack>

              <Stack>
                <IconButton
                  color='error'
                  onClick={() => remove(index)}
                  disabled={fruits.length === 1}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
          <Divider />
        </Stack>
      ))}

      <Button
        sx={{ bgcolor: 'white' }}
        size='large'
        variant='outlined'
        startIcon={<AddIcon />}
        onClick={() => append({ fruitId: '', grams: '', price: '', total: '' })}
      >
        Dodaj voće
      </Button>
    </Stack>
  );
}
