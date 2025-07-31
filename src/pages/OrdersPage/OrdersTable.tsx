import { useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

import CustomToolbar from '../../components/CustomToolbar';
import { GRID_DEFAULT_LOCALE_TEXT } from '../../hooks/useGetDataGridTranslations';
import { Order } from '../../types/orders';
import useGetOrderColumns from './useGetOrderColumns';

type Props = {
  data: Order[] | undefined;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
};

export default function OrdersTable({ data, handleDelete, handleEdit }: Props) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const { palette } = useTheme();

  function transformOrders(rawOrders: Order[]) {
    return rawOrders.map((order) => {
      const base = {
        ...order,
        orderExpenses: order.orderExpense,
      };

      const baseAny = base as any;

      order.cups?.forEach((cup) => {
        const fieldName = `cup_${cup.label.trim().replace(/\s+/g, '_')}`;
        baseAny[fieldName] = cup.numberOf ?? 0;
      });

      return baseAny;
    });
  }

  const transformedOrdersData = transformOrders(data || []);

  const columns = useGetOrderColumns({
    data: data || [],
    handleDelete,
    handleEdit,
  });

  return (
    <DataGrid
      sx={{
        '& .MuiDataGrid-columnHeader': {
          backgroundColor: palette.secondary.lighter,
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 'bold',
        },
      }}
      //   disableColumnMenu
      pageSizeOptions={[10, 25, 50, 100]}
      initialState={{
        sorting: {
          sortModel: [{ field: 'createdAt', sort: 'desc' }],
        },
      }}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      rows={transformedOrdersData || []}
      columns={columns}
      localeText={GRID_DEFAULT_LOCALE_TEXT}
      slots={{
        toolbar: CustomToolbar,
      }}
      showToolbar
    />
  );
}
