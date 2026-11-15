import { FormControlLabel, Switch } from '@mui/material';

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function ShowActionsSwitch({ checked, onChange }: Props) {
  return (
    <FormControlLabel
      sx={{ mb: 2 }}
      control={
        <Switch
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
      }
      label='Prikaži komande'
    />
  );
}
