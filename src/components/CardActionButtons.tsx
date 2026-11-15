import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Button, ButtonGroup, CardActions } from '@mui/material';

import useResponsive from '../hooks/useResponsive';

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function CardActionButtons({ onEdit, onDelete }: Props) {
  const isSm = useResponsive('down', 'sm');

  return (
    <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
      <ButtonGroup
        fullWidth
        size={isSm ? 'large' : 'medium'}
        variant='outlined'
        color='inherit'
        sx={{
          bgcolor: 'background.paper',
          '& .MuiButton-root': { fontWeight: 'bold' },
        }}
      >
        <Button startIcon={<EditIcon />} onClick={onEdit}>
          Izmeni
        </Button>
        <Button color='error' startIcon={<DeleteIcon />} onClick={onDelete}>
          Obriši
        </Button>
      </ButtonGroup>
    </CardActions>
  );
}
