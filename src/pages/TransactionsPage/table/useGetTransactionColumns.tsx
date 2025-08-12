import { Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { Transaction } from '../../../types/transactions';
import { formatDate } from '../../../utils/formatDate';
import getStatusTranslation from '../../../utils/getStatusTranslation';
import DataGridRowActions from '../../../components/DataGridRowActions';

type Props = {
  data: Transaction[];
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
};

export default function useGetTransactionColumns({
  data,
  handleEdit,
  handleDelete,
}: Props) {
  const uniqueCups = new Set<string>();
  data.forEach((order) =>
    order.cups?.forEach((cup) =>
      uniqueCups.add((cup && cup.label && cup.label.trim()) || '')
    )
  );

  const columns: GridColDef[] = [
    {
      field: 'note',
      headerName: 'Napomena',
      flex: 1,
      minWidth: 170,
    },
    {
      field: 'createdAt',
      headerName: 'Vreme unosa',
      flex: 1,
      minWidth: 170,
      renderCell: ({ row }) => {
        return <>{formatDate(row.createdAt || '', 'DD.MMM YY, HH:mm')}</>;
      },
    },
    {
      field: 'orderType',
      headerName: 'Vrsta džema',
      flex: 1,
      minWidth: 150,
    },

    {
      field: 'status',
      headerName: 'Transakcija',
      flex: 1,
      minWidth: 150,
      renderCell: ({ row }) => {
        return (
          <Stack justifyContent='center' sx={{ height: '100%' }}>
            <Typography>{getStatusTranslation(row.status)}</Typography>
          </Stack>
        );
      },
    },
  ];

  // ✅ Dynamic cup columns
  uniqueCups.forEach((label) => {
    columns.push({
      field: `cup_${label}`,
      headerName: `${label}`,
      flex: 1,
      minWidth: 100,
    });
  });

  columns.push({
    field: '',
    headerName: '',
    flex: 1,
    minWidth: 60,
    maxWidth: 70,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,

    renderCell: ({ row }) => {
      return (
        <DataGridRowActions
          onEdit={() => handleEdit(row.id)}
          onDelete={() => handleDelete(row.id)}
        />
      );
    },
  });

  return columns;
}
