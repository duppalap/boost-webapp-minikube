import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment
} from '@mui/material';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

type UserListToolbarProps = {
  filterName: string;
  action?: ReactNode;
  onFilterName: (value: string) => void;
};

export default function UserListToolbar({
  filterName,
  action,
  onFilterName
}: UserListToolbarProps) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle
      sx={{
        color: isLight ? 'primary.main' : 'text.primary'
      }}
    >
      <SearchStyle
        value={filterName}
        onChange={(e) => onFilterName(e.target.value)}
        placeholder={`Search ...`}
        startAdornment={
          <InputAdornment position="start">
            <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        }
      />
      <Box sx={{ flexShrink: 0 }}>{action}</Box>
    </RootStyle>
  );
}
