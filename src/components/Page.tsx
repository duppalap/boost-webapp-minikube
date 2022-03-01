import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { forwardRef, useEffect, useCallback, ReactNode } from 'react';
// material
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

interface PageProps extends BoxProps {
  children: ReactNode;
  title?: string;
}

const Page = forwardRef<HTMLDivElement, PageProps>(({ children, title = '', ...other }, ref) => {
  return (
    <Box ref={ref} {...other}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Box>
  );
});

export default Page;
