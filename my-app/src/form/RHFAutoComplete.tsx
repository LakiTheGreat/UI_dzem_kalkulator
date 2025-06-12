import { Autocomplete, Stack, TextField, Typography } from '@mui/material';

import { forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export type MenuItemType = {
  key: string | number;
  value: any;
  menuItemLabel: string | number;
  iso2?: string;
};

type RHFAutoCompleteProps = {
  name: string;
  label: string;
  menuItems: MenuItemType[];
  isBigInput?: boolean;
  hasFlag?: boolean;
  disabled?: boolean;
  noOptionsTextValue?: string;
  isLoading?: boolean;
};

const RHFAutoComplete = forwardRef<HTMLInputElement, RHFAutoCompleteProps>(
  (
    {
      name,
      label,
      menuItems,
      isBigInput = false,
      disabled = false,
      isLoading = false,
    },
    ref
  ) => {
    const { control } = useFormContext();
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <Stack>
              <Autocomplete
                loading={isLoading}
                disabled={disabled}
                disablePortal
                options={menuItems}
                getOptionLabel={(option) =>
                  `${option.menuItemLabel.toString()}`
                }
                value={menuItems.find((item) => value === item.value) || null}
                onChange={(e, newValue) => {
                  onChange(newValue ? newValue.value : '');
                }}
                // This KEY IS NOT menuItem key, but the result of getOption(option)
                renderOption={({ key, ...rest }, option) => (
                  <li key={option.key} {...rest}>
                    <Stack direction='row' alignItems='center'>
                      <Typography sx={{ fontSize: isBigInput ? 20 : 'auto' }}>
                        {`${option.menuItemLabel.toString()}`}
                      </Typography>
                    </Stack>
                  </li>
                )}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label={
                        <span
                          dangerouslySetInnerHTML={{
                            __html: label,
                          }}
                        />
                      }
                      ref={ref}
                      error={!!error}
                    />
                  );
                }}
              />
            </Stack>
          );
        }}
      />
    );
  }
);

export default RHFAutoComplete;
