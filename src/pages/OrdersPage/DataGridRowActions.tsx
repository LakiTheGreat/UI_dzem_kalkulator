/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { MouseEvent, ReactNode, useState } from 'react';

import MenuPopover from '../../components/MenuPopover';

type Props = {
  onEdit: (value: any) => void;
  onDelete: (value: any) => void;
};

type Action = {
  label: string;
  icon: ReactNode;
  handler: (value: any) => void;
};

export default function DataGridRowActions({ onEdit, onDelete }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let actionList: Action[] = [
    {
      label: 'Izmeni',
      icon: <EditIcon />,
      handler: onEdit,
    },
    {
      label: 'Obriši',
      icon: <DeleteIcon />,
      handler: onDelete,
    },
  ];

  return (
    <>
      <IconButton aria-label='open' size='small' onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>

      <MenuPopover
        open={open}
        aria-label='popover-modal'
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          color: (theme) => theme.palette.text.secondary,
          width: 'fit-content',
        }}
      >
        {actionList.map(({ label, icon, handler }) => (
          <MenuItem
            sx={{ borderRadius: 1 }}
            key={label}
            onClick={(e) => {
              handler(e);
              handleClose();
            }}
          >
            <ListItemIcon sx={{ mr: (t) => t.spacing(1) }}>{icon}</ListItemIcon>

            <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
              {label}
            </ListItemText>
          </MenuItem>
        ))}
      </MenuPopover>
    </>
  );
}
