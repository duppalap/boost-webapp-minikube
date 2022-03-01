import { Box, styled, useTheme } from '@mui/material';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
//
import BaseOptionChart from './BaseOptionChart';

// ----------------------------------------------------------------------

export interface ChartLineProps {
  categories: string[];
  data: number[];
  title?: string;
  name: string;
  height?: number;
  width?: number;
  annotations?: any;
}

export default function BoostLineChart(props: ChartLineProps) {
  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: props.categories,
      tickAmount: 4
    },
    title: {
      text: props.title,
      align: 'center'
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        formatter: function (value: number) {
          return value + '%';
        }
      },
      tickAmount: 4
    },
    annotations: props.annotations,

    tooltip: { x: { show: false }, marker: { show: false } },
    noData: {
      text: 'No data to display',
      align: 'center',
      verticalAlign: 'middle'
    }
  });

  let CHART_DATA = [
    {
      name: props.name,
      type: 'line',
      data: props.data
    }
  ];

  const MuiBoostLineChar = styled((props: any) => <ReactApexChart {...props} />)(({ theme }) => ({
    ...(props.width && { width: props.width }),
    ...(props.height && { height: props.height })
  }));

  return (
    <Box sx={{ p: 3, pb: 1 }} dir="ltr">
      <MuiBoostLineChar series={CHART_DATA} options={chartOptions} />
    </Box>
  );
}
