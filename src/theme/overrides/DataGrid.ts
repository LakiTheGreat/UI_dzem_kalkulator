import { checkboxClasses } from '@mui/material/Checkbox';
import { Theme } from '@mui/material/styles';
import { tablePaginationClasses } from '@mui/material/TablePagination';
import { gridClasses } from '@mui/x-data-grid';
import type { DataGridComponents } from '@mui/x-data-grid/themeAugmentation';

export const DataGrid: DataGridComponents<Theme> = {
  MuiDataGrid: {
    defaultProps: {
      disableRowSelectionOnClick: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        overflow: 'auto',
        border: 'none',
        backgroundColor: theme.palette.background.default,
        '& .MuiDataGrid-columnHeader': {
          backgroundColor: theme.palette.secondary.lighter,
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 'bold',
        },
        '& .negative-profit-row': {
          backgroundColor: theme.palette.error.lighter,
        },

        [`& .${gridClasses.footerContainer}`]: {
          backgroundColor: theme.palette.background.paper,
        },
        [`& .${checkboxClasses.root}`]: {
          padding: theme.spacing(2),
          '& > svg': {
            fontSize: '1.2rem',
          },
        },
        [`& .${tablePaginationClasses.root}`]: {
          marginRight: theme.spacing(1),
          '& .MuiIconButton-root': {
            maxHeight: 32,
            maxWidth: 32,
            '& > svg': {
              fontSize: '1rem',
            },
          },
        },
      }),
    },
  },
};
