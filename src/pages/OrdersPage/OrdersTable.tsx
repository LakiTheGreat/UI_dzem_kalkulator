import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

import useGetOrderColumns from './useGetOrderColumns';
import { Order } from '../../types/orders';
import { useTheme } from '@mui/material';

type Props = {
  data: Order[] | undefined;
};

export default function OrdersTable({ data }: Props) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const { palette } = useTheme();
  const columns = useGetOrderColumns();

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
      //   pageSizeOptions={PAGE_SIZE_OPTIONS}
      initialState={{
        sorting: {
          sortModel: [{ field: 'invalidRowNumber', sort: 'asc' }],
        },
      }}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      rows={data || []}
      columns={columns}
      //   getRowId={(row) => row.id}
      //   localeText={useGetDataGridTranslations()}
      slots={
        {
          // toolbar: () => <DataGridToolbar />,
          // pagination: () => <CustomDataGridPagination hasDownloadButton={true} />,
        }
      }
    />
  );
}
