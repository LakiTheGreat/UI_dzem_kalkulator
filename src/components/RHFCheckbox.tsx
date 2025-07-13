import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type RHFCheckboxInputProps = CheckboxProps & {
  name: string;
  label: string;
  disabled?: boolean;
  isBold?: boolean;
  formControlMarginLeft?: number;
};

export default function RHFCheckbox({
  name,
  label,
  disabled,
  isBold = false,
  formControlMarginLeft = 0,
  ...rest
}: RHFCheckboxInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <Stack>
            <Stack direction='row' alignItems='center'>
              <FormControlLabel
                sx={{ ml: formControlMarginLeft }}
                control={
                  <Checkbox
                    disabled={disabled}
                    checked={value}
                    onChange={(_, checked) => onChange(checked)}
                    {...rest}
                  />
                }
                label={
                  <Typography
                    color={error ? 'error' : 'inherit'}
                    sx={{ fontWeight: isBold ? 'bold' : 'normal' }}
                  >
                    {label}
                  </Typography>
                }
              />
            </Stack>
          </Stack>
        );
      }}
    />
  );
}
