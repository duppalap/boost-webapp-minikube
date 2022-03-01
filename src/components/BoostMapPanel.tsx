import { alpha, styled } from '@mui/material/styles';
import MapGL, {
  InteractiveMapProps,
  MapRef,
  LayerProps,
  Layer,
  Source,
  MapEvent,
  Popup
} from 'react-map-gl';
import { useState, useRef, useEffect, useContext } from 'react';
import {
  Box,
  Typography,
  Paper,
  useTheme,
  Stack,
  Divider,
  Grid,
  Dialog,
  DialogContent
} from '@mui/material';

import closeFill from '@iconify/icons-eva/close-fill';

import mapboxgl from 'mapbox-gl';

import {
  MapControlScale,
  MapControlGeolocate,
  MapControlNavigation,
  MapControlFullscreen
} from './map/controls';

import { BoostDeviceInterface } from '../@types/boost';
import { MIconButton } from '../components/@material-extend';
import { Icon } from '@iconify/react';
import { DashboardContext } from '../contexts/DashboardContext';
import React from 'react';
import BoostDevicePage from '../pages/boost/BoostDevicePage';

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

// ----------------------------------------------------------------------

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  height: `100%`,
  width: `100%`
}));

const BoostDeviceInfoStyle = styled('div')(({ theme }) => ({
  zIndex: 99,
  position: 'absolute',
  bottom: theme.spacing(2),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius
}));

// ----------------------------------------------------------------------

export interface MapProps extends InteractiveMapProps {
  id: string;
  boostDevices: BoostDeviceInterface[];
  changeUtilizationSummary: any;
  mapboxApiAccessToken: string;
}

export interface ISocData {
  time: string;
  soc: number;
}

export default function BoostMapPanel({
  id,
  boostDevices,
  changeUtilizationSummary,
  mapboxApiAccessToken,
  ...other
}: MapProps) {
  const theme = useTheme();

  const clusterLayer: LayerProps = {
    id: `${id}-clusters`,
    type: 'circle',
    source: id,
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
      'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
    }
  };

  const clusterCountLayer: LayerProps = {
    id: `${id}-cluster-count`,
    type: 'symbol',
    source: id,
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12
    },
    paint: {}
  };

  const unClusteredPointLayer: LayerProps = {
    id: `${id}-unclustered-point`,
    type: 'symbol',
    source: id,
    filter: ['!', ['has', 'point_count']],
    layout: {
      'icon-image': 'pin', // reference the image
      'icon-size': 0.25
    },
    paint: {}
  };

  const [viewport, setViewport] = useState({
    latitude: 40.67,
    longitude: -103.59,
    zoom: 3,
    bearing: 0,
    pitch: 0,
    transitionDuration: 500
  });

  const mapRef = useRef() as React.MutableRefObject<MapRef>;

  const mapThemes: Record<string, string> = {
    street: 'mapbox://styles/mapbox/streets-v11',
    satellite: 'mapbox://styles/mapbox/satellite-streets-v11'
  };

  const systemShadows = theme.shadows.slice(1, theme.shadows.length);

  const { selectedBoostDevice, dateRange, updateSelectedBoostDevice } =
    useContext(DashboardContext);

  const [boostDeviceInfoOpen, setBoostDeviceInfoOpen] = useState<boolean>(false);

  const [socOpen, setSocOpen] = useState<boolean>(false);

  const features = boostDevices.map((boostDevice: BoostDeviceInterface) => ({
    type: 'Feature',
    properties: {
      cluster: false,
      boostDevice: boostDevice,
      category: boostDevice.geoLocation?.location_type
    },
    geometry: {
      type: 'Point',
      coordinates: [boostDevice.geoLocation?.lng, boostDevice.geoLocation?.lat]
    }
  }));

  const geojson: any = {
    type: 'FeatureCollection',
    features: features
  };

  useEffect(() => {
    const map = mapRef.current.getMap();
    map.loadImage('/static/map/pin.png', (error: any, image: any) => {
      if (error) throw error;
      if (!map.hasImage('pin')) {
        map.addImage('pin', image);
      }
    });
  }, [mapRef]);

  const onClick = (event: MapEvent) => {
    if (event?.features && event?.features?.length > 0) {
      const feature = event?.features?.[0];
      const clusterId = feature && feature.properties.cluster_id;
      if (clusterId) {
        const mapboxSource = mapRef.current?.getMap().getSource(id);
        mapboxSource.getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
          if (err) {
            return;
          }
          setViewport({
            ...viewport,
            longitude: feature && feature.geometry.coordinates[0],
            latitude: feature && feature.geometry.coordinates[1],
            zoom: isNaN(zoom) ? 3 : zoom
          });
        });
        setBoostDeviceInfoOpen(false);
      } else {
        setBoostDeviceInfoOpen(true);
        const newBoostDevice: BoostDeviceInterface = JSON.parse(feature.properties.boostDevice);
        if (selectedBoostDevice && selectedBoostDevice.boostId === newBoostDevice.boostId) {
          return;
        }
        updateSelectedBoostDevice(newBoostDevice);
        if (changeUtilizationSummary) changeUtilizationSummary(dateRange, newBoostDevice);
      }
    }
  };

  const IconWrapperStyle = styled('div')(({ theme }) => ({
    width: 24,
    height: 24,
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    mx: theme.spacing(1),
    color: theme.palette.success.main,
    backgroundColor: alpha(theme.palette.success.main, 0.16)
  }));

  return (
    <React.Fragment>
      <Paper
        sx={{
          mb: 3,
          borderRadius: 2,
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.neutral',
          boxShadow: systemShadows[6]
        }}
      >
        <Typography
          gutterBottom
          variant="subtitle2"
          sx={{ pl: 2, pt: 2, color: 'text.secondary', textAlign: 'center' }}
        >
          Click on a mark in the map to see the Boost charger details.
        </Typography>
        <Box sx={{ height: 443, pb: 1, pl: 1, pr: 1, position: 'relative' }}>
          <ChartWrapperStyle dir="ltr">
            <MapGL
              {...viewport}
              onViewportChange={setViewport}
              mapStyle={mapThemes.street}
              interactiveLayerIds={[clusterLayer.id as string, unClusteredPointLayer.id as string]}
              mapboxApiAccessToken={mapboxApiAccessToken}
              {...other}
              onClick={onClick}
              ref={mapRef}
            >
              <MapControlScale />
              <MapControlNavigation />
              <MapControlFullscreen />
              <MapControlGeolocate />
              <Source
                id={id}
                type="geojson"
                data={geojson}
                cluster={true}
                clusterMaxZoom={14}
                clusterRadius={50}
              >
                <Layer {...clusterLayer} />
                <Layer {...clusterCountLayer} />
                <Layer {...unClusteredPointLayer} />
              </Source>
              {boostDeviceInfoOpen && selectedBoostDevice && (
                <Popup
                  latitude={Number(selectedBoostDevice.geoLocation?.lat)}
                  longitude={Number(selectedBoostDevice.geoLocation?.lng)}
                  closeButton={false}
                  anchor="bottom"
                >
                  <Grid container sx={{ pb: 1.5 }}>
                    <Grid item xs={9} md={9}>
                      <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                        Selected Boost
                      </Typography>
                    </Grid>
                    <Grid item xs={3} md={3}>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="space-evenly"
                      >
                        <IconWrapperStyle>
                          <MIconButton
                            onClick={() => setSocOpen(!socOpen)}
                            size="small"
                            color="primary"
                          >
                            <Icon icon="ic:twotone-summarize" />
                          </MIconButton>
                        </IconWrapperStyle>
                        <IconWrapperStyle>
                          <MIconButton
                            onClick={() => setBoostDeviceInfoOpen(false)}
                            size="small"
                            color="primary"
                          >
                            <Icon icon={closeFill} />
                          </MIconButton>
                        </IconWrapperStyle>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Stack spacing={1.5} sx={{ pt: 1.5 }} color="primary">
                    <Typography variant="body2" gutterBottom sx={{ color: 'text.secondary' }}>
                      <Typography variant="body2" component="span">
                        Boost Name: &nbsp;
                      </Typography>
                      {selectedBoostDevice?.boostName}
                    </Typography>
                    <Typography variant="body2" gutterBottom sx={{ color: 'text.secondary' }}>
                      <Typography variant="body2" component="span">
                        Boost Serial Number: &nbsp;
                      </Typography>
                      {selectedBoostDevice?.boostSerialNumber}
                    </Typography>
                  </Stack>
                </Popup>
              )}
            </MapGL>
          </ChartWrapperStyle>
        </Box>
      </Paper>

      {selectedBoostDevice && (
        <Dialog
          open={socOpen}
          keepMounted
          maxWidth={'lg'}
          fullWidth={true}
          onClose={() => setSocOpen(!socOpen)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <BoostDevicePage selectedBoostDevice={selectedBoostDevice} />
          </DialogContent>
        </Dialog>
      )}
    </React.Fragment>
  );
}
