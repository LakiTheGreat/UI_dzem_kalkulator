/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  preventDefaultEnter?: boolean;
};

export default function FormProvider({
  children,
  onSubmit,
  methods,
  preventDefaultEnter = true,
}: Props) {
  return (
    <Form {...methods}>
      <form
        onSubmit={onSubmit}
        style={{ width: '100%' }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && preventDefaultEnter) {
            e.preventDefault();
          }
        }}
      >
        {children}
      </form>
    </Form>
  );
}
