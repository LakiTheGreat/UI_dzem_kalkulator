import ClearIcon from '@mui/icons-material/Clear';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { forwardRef, HTMLInputTypeAttribute, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type RHFTextInputProps = TextFieldProps & {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  showCurrency?: boolean;
};

const RHFTextInput = forwardRef<HTMLInputElement, RHFTextInputProps>(
  (
    { name, label, type, disabled = false, showCurrency = false, ...rest },
    ref
  ) => {
    const { control, getValues, setValue } = useFormContext();
    const [showPassword, setShowPassword] = useState(false);

    const handleFocus = () => {
      if (type !== 'number') return;
      const currentValue = getValues(name);
      if (currentValue === 0) {
        setValue(name, '');
      }
    };

    const onBlur = () => {
      if (type !== 'number') return;
      const currentValue = getValues(name);
      if (currentValue === '') {
        setValue(name, 0);
      }
    };

    const handleClear = () => {
      setValue(name, '');
    };

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          const displayedValue =
            showCurrency && typeof field.value === 'number'
              ? `${field.value} din`
              : field.value;

          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value;
            if (showCurrency) {
              value = value.replace(/\s*din$/, ''); // remove ' DIN'
            }
            field.onChange(value);
          };

          return (
            <Stack direction='row' gap={2}>
              <Stack sx={{ width: '100%' }}>
                <TextField
                  {...rest}
                  disabled={disabled}
                  autoComplete='randomStringToPReventAutoFill'
                  size='medium'
                  inputRef={ref}
                  aria-label={`Input for ${label}`}
                  type={showPassword && type === 'password' ? 'text' : type}
                  fullWidth
                  variant='outlined'
                  label={label}
                  error={!!error}
                  value={displayedValue ?? ''}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={onBlur}
                  onWheel={(e) => (e.target as HTMLElement).blur()}
                  onKeyDown={(e) => {
                    if (
                      type === 'number' &&
                      ['e', 'E', '+', '-'].includes(e.key)
                    ) {
                      e.preventDefault();
                    }
                  }}
                  sx={{
                    '& input[type=number]': {
                      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button':
                        {
                          appearance: 'none',
                          margin: 0,
                        },
                    },
                  }}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position='end'>
                          {type === 'password' ? (
                            <IconButton
                              edge='end'
                              onClick={togglePasswordVisibility}
                              size='small'
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          ) : null}
                          {field.value && !disabled ? (
                            <IconButton
                              edge='end'
                              onClick={handleClear}
                              size='small'
                              sx={{ ml: 1 }}
                            >
                              <ClearIcon />
                            </IconButton>
                          ) : null}
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Stack>
            </Stack>
          );
        }}
      />
    );
  }
);

export default RHFTextInput;
