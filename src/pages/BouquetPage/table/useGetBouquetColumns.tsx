import { Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { BouquetTransaction } from '../../../types/bouguets';
import { formatDate } from '../../../utils/formatDate';
import FormattedPrice from '../../../utils/FormattedPrice';
import DataGridRowActions from '../../../components/DataGridRowActions';

type Props = {
  data: BouquetTransaction[];
  handleDelete: (transaction: BouquetTransaction) => void;
  handleEdit: (id: number) => void;
};

export default function useGetBouquetColumns({
  data,
  handleEdit,
  handleDelete,
}: Props) {
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
      field: 'income',
      headerName: 'Cena buketa',
      flex: 1,
      minWidth: 150,
      renderCell: ({ row }) => {
        return (
          <Stack justifyContent='center' sx={{ height: '100%' }}>
            <FormattedPrice price={row.income} isBold />
          </Stack>
        );
      },
    },
    {
      field: 'totalExpense',
      headerName: 'Ukupni troškovi',
      flex: 1,
      minWidth: 150,
      renderCell: ({ row }) => {
        return (
          <Stack
            color='primary.main'
            justifyContent='center'
            sx={{ height: '100%' }}
          >
            <FormattedPrice price={row.totalExpense} isExpense isBold />
          </Stack>
        );
      },
    },
    {
      field: 'profit',
      headerName: 'Profit',
      flex: 1,
      minWidth: 150,
      renderCell: ({ row }) => {
        return (
          <Stack
            justifyContent='center'
            sx={{ height: '100%' }}
            color='success.dark'
          >
            <FormattedPrice price={row.profit} isBold />
          </Stack>
        );
      },
    },
    {
      field: 'profitMargin',
      headerName: 'Profitna marža',
      flex: 1,
      minWidth: 150,
      renderCell: ({ row }) => {
        return (
          <Stack justifyContent='center' sx={{ height: '100%' }}>
            <Typography>{row.profitMargin}%</Typography>
          </Stack>
        );
      },
    },
  ];

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
          onDelete={() => handleDelete(row)}
        />
      );
    },
  });

  return columns;
}
