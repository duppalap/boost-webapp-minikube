// material
import { Card, CardHeader, Typography, Grid } from '@mui/material';
import { BoostDeviceInterface, IHoursOfOperation } from '../../@types/boost';
import BoostLineChart from '../../components/charts/BoostLineChart';
import BoostDeviceSummary from './BoostDeviceSummary';
import { useEffect, useState } from 'react';
import LoadingScreen from '../../components/LoadingScreen';
import { BoostService } from '../../_apis_/boost';
import { boostAppConfig } from '../../config';
import { ISocData } from '../../components/BoostMapPanel';
import { Dictionary, groupBy } from 'lodash';
import dayjs from 'dayjs';
// utils

// ----------------------------------------------------------------------

type BoostDevicePageProps = {
  selectedBoostDevice: BoostDeviceInterface;
  onEdit?: VoidFunction;
  enableEdit?: boolean;
};

interface IHoc {
  openTime: string;
  closeTime: string;
}

export default function BoostDevicePage({
  onEdit,
  selectedBoostDevice,
  enableEdit = false
}: BoostDevicePageProps) {
  const boostService = new BoostService();

  const [minSOC, setMinSOC] = useState<number>(30);

  const [maxSOC, setMaxSOC] = useState<number>(30);

  const [socLoading, setSocLoading] = useState<boolean>(false);

  const [hoc, setHoc] = useState<IHoc>({ openTime: '12am', closeTime: '11pm' });

  const [categories, setCategories] = useState<string[]>([]);

  const [socHoursData, setSocHoursData] = useState<number[]>([]);

  useEffect(() => {
    loadHoc();
    loadSoc();
  }, [selectedBoostDevice]);

  const loadSoc = async () => {
    if (selectedBoostDevice) {
      setSocLoading(true);
      const response = await boostService.getSocInformation(
        '-1d@d',
        '@d',
        selectedBoostDevice.ownerId,
        selectedBoostDevice.boostGroupId,
        selectedBoostDevice.boostName,
        boostAppConfig.env ? boostAppConfig.env : 'development'
      );

      const categories: string[] = [];
      const socHoursData: number[] = [];

      if (response && response.status === 200) {
        if (response?.data) {
          //set maxHOC
          if (response.data.maxSOC) setMaxSOC(response.data.maxSOC);
          //set minSOC
          if (response.data.minSOC) setMinSOC(response.data.minSOC);

          //set categories
          if (response?.data?.rows?.length > 0) {
            const data = response?.data?.rows;
            var socData: ISocData[] = [];
            const precision = 60 * 60 * 1000;
            const groups: Dictionary<string[][]> = groupBy(data, (item) => {
              const floor = Math.floor(dayjs(item[0]).valueOf() / precision) * precision;
              return dayjs(floor).format('MM-DD-YYYY HH:mm');
            });
            for (const [key, value] of Object.entries(groups)) {
              const max = value.reduce(function (prev, current) {
                return Number(prev[3]) > Number(current[3]) ? prev : current;
              });
              socData.push({ time: key, soc: Number(max[3]) });
            }
            socData.sort(function (a, b) {
              return a.time.localeCompare(b.time);
            });

            socData.forEach((e) => {
              const time: string = dayjs(e.time).format('ha');
              categories.push(time);
              const soc = Number(e.soc) * 100;
              socHoursData.push(Math.floor(soc));
            });
          }
        }
      }
      setCategories(categories);
      setSocHoursData(socHoursData);
      setSocLoading(false);
    }
  };

  const getSortedAndSlicedData = (data: any) => {
    return data
      .sort((a: any, b: any) => (dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1))
      .slice(0, 7);
  };

  const loadHoc = async () => {
    if (selectedBoostDevice.ownerId && selectedBoostDevice.boostGroupId) {
      const boostGroupResponse = await boostService.getOperationHours(
        selectedBoostDevice.ownerId.toString(),
        selectedBoostDevice.boostGroupId.toString(),
        true,
        false
      );
      if (boostGroupResponse && boostGroupResponse.data) {
        const hoursOfOperations: IHoursOfOperation[] = getSortedAndSlicedData(
          boostGroupResponse.data.rows
        );
        if (hoursOfOperations && hoursOfOperations.length > 0) {
          const d = new Date();
          let hocFilter = hoursOfOperations.filter((f: IHoursOfOperation) => {
            return f.day === d.getDay();
          })[0];
          const openTime: string = getTime(true, hocFilter.openTime?.toString());
          const closeTime: string = getTime(false, hocFilter.closeTime?.toString());
          setHoc({ openTime: openTime, closeTime: closeTime });
        }
      }
    }
  };

  const getTime = (isOpenTime: boolean, time?: string): string => {
    let hours: string = `12${isOpenTime ? `am` : `pm`}`;
    if (time) {
      const t: string[] = time.split(':');
      const m: number = Number(t[1]);
      //round the time
      const h: number = m > 30 && Number(t[0]) != 23 ? Number(t[0]) + 1 : Number(t[0]);
      //change 24hours to 12hours format
      let period = h > 12 ? `pm` : `am`;
      hours = `${((h + 11) % 12) + 1}${period}`;
    }
    return hours;
  };

  let annotations = {
    xaxis: [
      {
        x: hoc.closeTime,
        x2: hoc.openTime,
        borderColor: '#000',
        fillColor: '#FEB019',
        opacity: 0.3,
        label: {
          offsetX: 50,
          text: 'High TOU',
          orientation: 'horizontal',
          textAnchor: 'start',
          position: 'top',
          style: {
            color: '#fff',
            background: '#FEB019'
          }
        }
      }
    ],
    yaxis: [
      {
        y: minSOC,
        borderColor: '#FF4560',
        label: {
          borderColor: '#FF4560',
          style: {
            color: '#fff',
            background: '#FF4560'
          },
          text: 'Min SOC',
          textAnchor: 'start',
          position: 'left'
        }
      },
      {
        y: maxSOC,
        borderColor: '#775DD0',
        label: {
          borderColor: '#775DD0',
          style: {
            color: '#fff',
            background: '#775DD0'
          },
          text: 'Max SOC',
          textAnchor: 'start',
          position: 'left'
        }
      }
    ]
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <BoostDeviceSummary
          selectedBoostDevice={selectedBoostDevice}
          onEdit={onEdit}
          enableEdit={enableEdit}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={<Typography variant="h6">State of Charge</Typography>}
            sx={{ mb: 3 }}
          />
          {socLoading ? (
            <LoadingScreen
              sx={{
                left: 0,
                width: 1,
                height: 500
              }}
            />
          ) : (
            <BoostLineChart
              categories={categories}
              data={socHoursData}
              name={'SOC'}
              annotations={annotations}
            />
          )}
        </Card>
      </Grid>
    </Grid>
  );
}
