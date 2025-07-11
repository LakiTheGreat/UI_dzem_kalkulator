import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import RHFSelectInput, {
  MenuItemType,
} from '../../../components/RHFSelectInput';
import RHFTextInput from '../../../components/RHFTextInput';
import FormattedPrice from '../../../utils/FormattedPrice';

import { FruitItem } from './index';

type Props = {
  mappedData: MenuItemType[];
};

export default function FruitsForm({ mappedData }: Props) {
  const { control, register, setValue } = useFormContext<{
    fruits: FruitItem[];
  }>();

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
    <Stack spacing={2}>
      {fields.map((field, index) => (
        <Stack key={field.id} gap={2}>
          <Stack direction='column' alignItems='center' gap={2}>
            <Stack sx={{ width: '100%' }}>
              <RHFSelectInput
                menuItems={mappedData}
                label='Naziv voća'
                name={`fruits.${index}.fruitName`}
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
            <Stack direction='row' gap={2}>
              <Stack sx={{ flex: 1, alignItems: 'center' }}>
                <Typography>Ukupno:</Typography>
                <FormattedPrice price={fruits[index]?.total ?? ''} isBold />
              </Stack>

              <IconButton color='error' onClick={() => remove(index)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Stack>
          <Divider />
        </Stack>
      ))}

      <Button
        variant='outlined'
        startIcon={<AddIcon />}
        onClick={() =>
          append({ fruitName: '', grams: '', price: '', total: '' })
        }
      >
        Dodaj voće
      </Button>
    </Stack>
  );
}
