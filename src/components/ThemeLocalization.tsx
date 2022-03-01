import { ReactNode } from 'react';
// material
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

type ThemeLocalizationProps = {
  children: ReactNode;
};

export default function ThemeLocalization({ children }: ThemeLocalizationProps) {
  const defaultTheme = useTheme();

  const theme = createTheme(defaultTheme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
