import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export type MenuItemType = {
  id: string | number;
  value: any;
  menuItemLabel: string | number;
  isDeleted?: boolean;
};

type RHFSelectInputProps = {
  name: string;
  label: string;
  menuItems: MenuItemType[];
  isBigInput?: boolean;
  disabled?: boolean;
};

const RHFSelectInput = forwardRef<HTMLDivElement, RHFSelectInputProps>(
  ({ name, label, menuItems, isBigInput = false, disabled = false }, ref) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <FormControl fullWidth error={!!error}>
            <InputLabel>{label}</InputLabel>
            <Select
              label={label}
              value={value ?? ''}
              onChange={(event: SelectChangeEvent) =>
                onChange(event.target.value)
              }
              inputRef={ref}
              disabled={disabled}
              sx={{ fontSize: isBigInput ? 20 : 'auto' }}
            >
              {menuItems.map((item) => (
                <MenuItem key={item.id} value={item.value}>
                  <Typography sx={{ fontSize: isBigInput ? 20 : 'inherit' }}>
                    {item.menuItemLabel}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    );
  }
);

export default RHFSelectInput;
