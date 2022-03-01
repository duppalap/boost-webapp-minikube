import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as React from 'react';
import {
  Accordion,
  AccordionDetails,
  alpha,
  styled,
  Typography,
  useTheme,
  Tooltip,
  DialogTitle,
  Dialog,
  IconButton,
  DialogContent,
  StyledEngineProvider
} from '@mui/material';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import { IBoostAccordianProps } from '../@types/boost';
import { BoostService } from '../_apis_/boost';
import { SyntheticEvent } from 'react';
import { BoostHistoricPricingGrid, IPricingModel } from './grids/BoostHistoricPricingGrid';
import { MIconButton } from './@material-extend';
import CancelIcon from '@mui/icons-material/Cancel';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { AuthService } from '../_apis_/auth';
import { useLocation } from 'react-router-dom';

export default function BoostAccordian(props: IBoostAccordianProps) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const authService = new AuthService();
  const theme = useTheme();
  const boostService = new BoostService();
  const { title, help, info, children, icon, pricingHistory, subtitle } = props;
  const { search } = useLocation();

  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary expandIcon={<ExpandMoreIcon />} {...props} />
  ))(({ theme }) => ({
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    marginBottom: -1,
    '&.Mui-expanded': {
      minHeight: 48,
      maxHeight: 50
    },
    borderRadius: '8px 8px 0 0'
  }));

  /**
   * Historic Dialog states
   */
  const [open, setOpen] = React.useState(false);

  let [historicData, setHistoricData] = React.useState<IPricingModel[]>([]);

  /**
   * Displays the Pricing history information of the boost group.
   * @param ev event in react.
   */
  async function showPricingHistory(ev: SyntheticEvent) {
    ev.stopPropagation();
    const searchParams: URLSearchParams = new URLSearchParams(search);
    const ownerId = searchParams ? searchParams.get('ownerId') : '';
    const boostGroupId = searchParams ? searchParams.get('boostGroupId') : '';
    if (boostGroupId && ownerId) {
      const info = await boostService.getHistoricPricingModel(
        parseInt(ownerId, 10),
        parseInt(boostGroupId, 10)
      );
      if (info && info.data && info.data.rows.length > 0) {
        let hData = info.data.rows;
        hData.sort((a: IPricingModel, b: IPricingModel) => (a.createdAt > b.createdAt ? 1 : -1));
        hData.forEach((data: IPricingModel) => {
          data.createdAt = setFormatDate(data.createdAt);
          data.updatedAt = setFormatDate(data.updatedAt);
          data.status = data.status ? <BeenhereIcon /> : <CancelIcon />;
        });
        setHistoricData(hData);
        setOpen(!open);
      } else {
        noHistoricSnackBar();
      }
    } else {
      noHistoricSnackBar();
    }
  }

  function noHistoricSnackBar() {
    enqueueSnackbar('No Historic Pricing', {
      variant: 'warning',
      action: (key) => (
        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </MIconButton>
      ),
      autoHideDuration: 3000
    });
  }

  /**
   * Format the date and here we can receive 2 kinds of values, date or string,
   * depends on the browser that this is executing.
   */
  function setFormatDate(dateItem: Date | string): string {
    dateItem = new Date(dateItem);
    return (
      [dateItem.getMonth() + 1, dateItem.getDate(), dateItem.getFullYear()].join('/') +
      ' ' +
      [dateItem.getHours(), dateItem.getMinutes(), dateItem.getSeconds()].join(':')
    );
  }

  const MuiDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1)
    }
  }));

  interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
  }

  const MuiDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  return (
    <Accordion key={`accordian_${title}`} sx={{ boxShadow: theme.shadows[3] }} {...props}>
      <AccordionSummary key={`accordian_summary_${title}`}>
        {icon}
        <Typography
          variant="subtitle1"
          sx={{
            ...(icon && { pl: 1.5 })
          }}
        >
          {title}
        </Typography>
        {info && (
          <Typography sx={{ color: 'text.secondary', marginLeft: 1 }}> {`(${info})`} </Typography>
        )}
        {help && (
          <Tooltip title={`${help}`}>
            <InfoIcon sx={{ marginLeft: 1 }} />
          </Tooltip>
        )}
        {pricingHistory && (
          <Tooltip title={`${pricingHistory}`}>
            <HistoryIcon onClick={(ev) => showPricingHistory(ev)} sx={{ marginLeft: 1 }} />
          </Tooltip>
        )}
        <MuiDialog
          onClose={() => setOpen(!open)}
          keepMounted
          maxWidth={'xl'}
          fullWidth={true}
          MuiDialogTitlearia-labelledby="customized-dialog-title"
          open={open}
        >
          <MuiDialogTitle id="customized-dialog-title" onClose={() => setOpen(!open)}>
            Historic Pricing
          </MuiDialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              <StyledEngineProvider injectFirst>
                <BoostHistoricPricingGrid historicData={historicData} />
              </StyledEngineProvider>
            </Typography>
          </DialogContent>
        </MuiDialog>
        <Typography
          sx={{
            fontStyle: 'italic',
            fontSize: 12,
            marginTop: 0.5,
            marginLeft: 1
          }}
        >
          {subtitle}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
