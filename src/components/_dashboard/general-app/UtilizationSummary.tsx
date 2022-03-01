import { Icon } from '@iconify/react';
// material
import {
  Box,
  Grid,
  Paper,
  Typography,
  PaperProps,
  useTheme,
  Stack,
  LinearProgress
} from '@mui/material';

import BoostBarChart from '../../../components/charts/BoostBarChart';

import { DashboardContext } from '../../../contexts/DashboardContext';
import React, { useContext } from 'react';

// utils

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 32,
  height: 32
};

// ----------------------------------------------------------------------

export interface UtilizationSummaryItem {
  name: string;
  value?: string | number;
  icon?: object | string;
}

export interface UtilizationSummaryProps {
  utilizationSummary: UtilizationSummaryItem[];
  barChartDaysData: number[];
  barChartHoursData: number[];
  dateRangeFilter?: any;
}

export default function UtilizationSummary(props: UtilizationSummaryProps) {
  const { utilizationSummary, barChartDaysData, barChartHoursData, dateRangeFilter } = props;

  const { loadingSummary } = useContext(DashboardContext);

  const theme = useTheme();

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  const UTILIZATION_SUMMARY_ICONS: UtilizationSummaryItem[] = [
    {
      name: 'ChargingSessions_CCS',
      icon: <Icon icon="mdi:ev-plug-type2" color="#1877F2" {...ICON_SIZE} />
    },
    {
      name: 'ChargingSessions_CHAdeMO',
      icon: <Icon icon="mdi:ev-plug-chademo" color="#DF3E30" {...ICON_SIZE} />
    },
    {
      name: 'Total_Charging_Sessions',
      icon: <Icon icon="icon-park-outline:energy-socket" color="#004d40" {...ICON_SIZE} />
    },
    {
      name: 'Total_Energy_Dispensed',
      icon: <Icon icon="mdi:battery-charging-100" color="#1C9CEA" {...ICON_SIZE} />
    },
    {
      name: 'Total_Charging_Duration',
      icon: <Icon icon="ic:baseline-battery-charging-full" color="#fb8c00" {...ICON_SIZE} />
    },
    {
      name: 'Avg_Energy_Dispensed',
      icon: <Icon icon="mdi:battery-charging-60" color="#c62828" {...ICON_SIZE} />
    },
    {
      name: 'Avg_Charging_Duration',
      icon: <Icon icon="ic:baseline-battery-charging-90" color="#4caf50" {...ICON_SIZE} />
    }
  ];

  const systemShadows = theme.shadows.slice(1, theme.shadows.length);

  const style = {
    display: 'block',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    ...(theme.palette.mode === `dark` && { bgcolor: 'grey.900' })
  } as const;

  const pStyle = {
    p: 2,
    minHeight: 150,
    minWidth: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    m: 1
  } as const;

  const ShadowCard = ({ sx, children }: PaperProps) => {
    return (
      <Paper
        sx={{
          p: 2,
          borderRadius: 2,
          alignItems: 'center',
          justifyContent: 'center',
          ...sx
        }}
      >
        {children}
      </Paper>
    );
  };

  const UtilizationSummary = (props: UtilizationSummaryItem) => {
    const { icon, value, name } = props;

    const griItemProps: any = {
      ...(isMobile && { xs: 12 }),
      sx: {
        p: 2,
        textAlign: 'center',
        ...(!isMobile && { width: `13.22%` }),
        mx: `auto`,
        my: 1,
        border: `1px solid ${theme.palette.grey[500_32]}`,
        borderRadius: 1
      }
    };

    return (
      <Grid item {...griItemProps}>
        <Box sx={{ mb: 0.5 }}>{icon}</Box>
        <Typography variant="h6">{value}</Typography>
        <Typography sx={{ color: 'text.secondary', overflowWrap: 'break-word' }}>
          {name?.replace(/[^a-zA-Z ]/g, ' ')}
        </Typography>
      </Grid>
    );
  };

  return (
    <Stack sx={{ marginTop: 2 }} spacing={2}>
      <Paper sx={style}>
        <Typography variant="h5" paragraph>
          Utilization Summary
        </Typography>
        <ShadowCard sx={{ boxShadow: systemShadows[6] }}>
          {dateRangeFilter}
          <Grid container xs={12}>
            {loadingSummary ? (
              <Paper variant="outlined" sx={pStyle}>
                <Box sx={{ width: '100%' }}>
                  <LinearProgress />
                </Box>
              </Paper>
            ) : (
              <React.Fragment>
                {utilizationSummary.map((site) => {
                  let obj = UTILIZATION_SUMMARY_ICONS.find((o) => o.name === site.name);
                  if (obj) site.icon = obj?.icon;
                  return <UtilizationSummary key={site.name} {...site} />;
                })}
              </React.Fragment>
            )}
          </Grid>
        </ShadowCard>
      </Paper>

      <Paper sx={style}>
        <Typography variant="h5" paragraph>
          Trends
        </Typography>
        <Typography gutterBottom variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Data is cumulated over the last 30 days as default. Please select a date range above to
          update the charts
        </Typography>
        <ShadowCard sx={{ boxShadow: systemShadows[6] }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <BoostBarChart
                categories={[
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday'
                ]}
                data={barChartDaysData}
                title={'Charging Sessions by day of the week'}
                name={'Sessions'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BoostBarChart
                categories={[
                  '12am-3am',
                  '3am-6am',
                  '6am-9am',
                  '9am-12pm',
                  '12pm-3pm',
                  '3pm-6pm',
                  '6pm-9pm',
                  '9pm-12am'
                ]}
                data={barChartHoursData}
                title={'Charging sessions by time of the day'}
                name={'Sessions'}
              />
            </Grid>
          </Grid>
        </ShadowCard>
      </Paper>
    </Stack>
  );
}
