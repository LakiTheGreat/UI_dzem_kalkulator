import { useForm, useFieldArray } from 'react-hook-form';
import { useEffect } from 'react';
import { Button, Container, Stack, Typography } from '@mui/material';

import FormProvider from '../../components/FormProvider';
import RHFTextInput from '../../components/RHFTextInput';

type FruitItem = {
  grams: string | number;
  price: string | number;
  total: string | number;
};

type FormData = {
  fruits: FruitItem[];
};

export default function NewForm() {
  const methods = useForm<FormData>({
    defaultValues: {
      fruits: [{ grams: '', price: '', total: '' }],
    },
  });

  const { control, register, watch, setValue, handleSubmit } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fruits',
  });

  const { fruits } = watch();

  useEffect(() => {
    console.log(fruits);
    fruits.forEach((fruit, index) => {
      const grams = Number(fruit.grams);
      const price = Number(fruit.price);

      const total =
        grams > 0 && price > 0 ? ((price / 1000) * grams).toFixed(0) : '';

      setValue(`fruits.${index}.total`, total);
    });
  }, [fruits, setValue]);

  const formSubmit = (data: FormData) => {
    console.log('Submitted:', data);
  };

  return (
    <Container maxWidth='sm'>
      <FormProvider methods={methods} onSubmit={handleSubmit(formSubmit)}>
        <Stack spacing={2}>
          <Typography variant='h6'>Fruits</Typography>

          {fields.map((field, index) => (
            <Stack
              direction='row'
              spacing={2}
              key={field.id}
              alignItems='center'
            >
              <Stack sx={{ flex: 1 }}>
                <RHFTextInput
                  type='number'
                  label='Grams'
                  {...register(`fruits.${index}.grams`)}
                />
              </Stack>

              <Stack sx={{ flex: 1 }}>
                <RHFTextInput
                  type='number'
                  label='Price/kg'
                  {...register(`fruits.${index}.price`)}
                />
              </Stack>
              <Stack sx={{ flex: 1 }}>
                <Typography>{`Total: ${fruits[index].total}`}</Typography>
              </Stack>
              <Button
                variant='outlined'
                color='error'
                onClick={() => remove(index)}
                sx={{ flex: 1 }}
              >
                Remove
              </Button>
            </Stack>
          ))}

          <Button
            variant='outlined'
            onClick={() => append({ grams: '', price: '', total: '' })}
          >
            Add Fruit
          </Button>

          <Button type='submit' variant='contained'>
            Submit
          </Button>
        </Stack>
      </FormProvider>
    </Container>
  );
}
