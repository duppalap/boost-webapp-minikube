import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader, Grid, Paper, Typography } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
import BaseOptionChart from '../../charts/BaseOptionChart';

interface ChartPoint {
  x?: number | string | Date | undefined;
  y?: number | string | Date | undefined;
  r?: number | undefined;
  t?: number | string | Date | undefined;
}
export declare type SingleDataSet = Array<number | null | undefined | number[]> | ChartPoint[];

interface BoostConnectorProps {
  leftDataConnectors: SingleDataSet;
  rightDataConnector: SingleDataSet;
}

export default function BoostConnectors(props: BoostConnectorProps) {
  const theme = useTheme();

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const CHART_HEIGHT = isMobile ? 520 : 325;
  const LEGEND_HEIGHT = 66;

  const ChartWrapperStyle = styled('div')(({ theme }) => ({
    height: CHART_HEIGHT,
    display: 'flex',
    ...(!isMobile && { marginTop: theme.spacing(5) }),
    '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
      overflow: 'visible'
    },
    '& .apexcharts-legend': {
      height: LEGEND_HEIGHT,
      alignContent: 'center',
      width: '200%',
      top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
    }
  }));

  function getChartOptions(title: string, showLegend: boolean) {
    return merge(BaseOptionChart(), {
      title: {
        text: title,
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: theme.palette.text.primary
        }
      },
      colors: [
        theme.palette.primary.light,
        theme.palette.primary.main,
        theme.palette.primary.dark,
        theme.palette.primary.darker
      ],
      labels: ['Available', 'Unavailable', 'Offline', 'Charging'],
      stroke: { colors: [theme.palette.background.paper] },
      legend: {
        show: isMobile ? false : showLegend,
        floating: true,
        horizontalAlign: 'center'
      },
      tooltip: {
        fillSeriesColor: false,
        y: {
          formatter: (seriesName: string) => fNumber(seriesName),
          title: {
            formatter: (seriesName: string) => `${seriesName}`
          }
        }
      },
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          expandOnClick: true,
          offsetX: 0,
          offsetY: 0,
          customScale: 1,
          dataLabels: {
            offset: 0,
            minAngleToShowLabel: 10
          },
          donut: {
            size: '65%',
            background: 'transparent',
            labels: {
              show: true,
              name: {
                formatter: (val: number | string) => val
              },
              value: {
                formatter: (val: number | string) => fNumber(val)
              },
              total: {
                show: true,
                formatter: (w: { globals: { seriesTotals: number[] } }) => {
                  const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                  return fNumber(sum);
                }
              }
            }
          }
        }
      }
    });
  }

  return (
    <ChartWrapperStyle dir="ltr">
      <Grid container style={{ height: '100%', width: '100%' }}>
        <Grid item xs={12} md={6}>
          <ReactApexChart
            type="donut"
            series={props.leftDataConnectors}
            options={getChartOptions('Left', true)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ReactApexChart
            type="donut"
            series={props.rightDataConnector}
            options={getChartOptions('Right', false)}
          />
        </Grid>
      </Grid>
    </ChartWrapperStyle>
  );
}
