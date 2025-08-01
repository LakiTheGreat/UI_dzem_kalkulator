import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ReactNode, useMemo } from 'react';
import { DataGrid } from './overrides/DataGrid';

import palette from './palette';

type Props = {
  children: ReactNode;
};

export default function AppTheme({ children }: Props) {
  const theme = useMemo(() => {
    return createTheme({
      typography: {
        fontFamily: `'Montserrat', sans-serif`,
      },
      cssVariables: {
        colorSchemeSelector: 'data-mui-color-scheme',
        cssVarPrefix: 'template',
      },

      palette: palette.light,
      components: {
        ...DataGrid,
      },
      shape: {
        borderRadius: 8,
      },
    });
  }, []);

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
