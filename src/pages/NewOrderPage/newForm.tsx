import { useForm } from 'react-hook-form';
import { Button, Container, Divider, Stack } from '@mui/material';

import FormProvider from '../../components/FormProvider';
import FruitsForm from './from/FruitsForm';

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

  const { handleSubmit } = methods;

  const formSubmit = (data: FormData) => {
    console.log('Submitted:', data);
  };

  return (
    <Container maxWidth='sm'>
      <FormProvider methods={methods} onSubmit={handleSubmit(formSubmit)}>
        <Stack gap={4}>
          <FruitsForm />
          <Divider />
          <Button variant='contained' type='submit'>
            Sačuvaj
          </Button>
        </Stack>
      </FormProvider>
    </Container>
  );
}
