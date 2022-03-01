// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';

// components
import Page from '../components/Page';

// assets
import { ComingSoonIllustration } from '../assets';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function ComingSoon() {
  return (
    <Page title="Coming Soon | Freewire-UI" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <Typography variant="h3" paragraph>
              Coming Soon this Summer!
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              We are currently working hard on this page!
            </Typography>

            <ComingSoonIllustration sx={{ my: 10, height: 240 }} />
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
