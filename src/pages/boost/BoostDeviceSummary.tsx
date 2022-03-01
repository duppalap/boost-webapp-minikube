import { Icon } from "@iconify/react";
import editFill from "@iconify/icons-eva/edit-fill";
// material
import {
  Card,
  Stack,
  Button,
  Divider,
  CardHeader,
  Typography,
  CardContent,
  Box,
} from "@mui/material";
import { BoostDeviceInterface } from "../../@types/boost";
import { useTheme } from "@mui/material/styles";
import { upperCase } from "lodash";
import Label from "../../components/Label";
// utils

// ----------------------------------------------------------------------

type BoostDeviceSummaryProps = {
  selectedBoostDevice: BoostDeviceInterface;
  onEdit?: VoidFunction;
  enableEdit?: boolean;
};

export default function BoostDeviceSummary({
  onEdit,
  selectedBoostDevice,
  enableEdit = false,
}: BoostDeviceSummaryProps) {
  const theme = useTheme();

  const BoostStatusLabel = (technicalStatus?: boolean) => {
    const boostStatus: string = technicalStatus == true ? "active" : "inactive";
    return (
      <Label
        variant={theme.palette.mode === "light" ? "ghost" : "filled"}
        color={boostStatus === `active` ? "success" : "error"}
      >
        {upperCase(boostStatus)}
      </Label>
    );
  };

  const BoostConnectorLabel = (boostConnectorStatus?: string) => {
    const bcStatus: string =
      boostConnectorStatus === "AVAILABLE"
        ? boostConnectorStatus
        : "UNAVAILABLE";
    return (
      <Label
        variant={theme.palette.mode === "light" ? "ghost" : "filled"}
        color={bcStatus === `AVAILABLE` ? "success" : "error"}
      >
        {upperCase(bcStatus)}
      </Label>
    );
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Boost Device Summary"
        action={
          enableEdit && (
            <Button
              size="small"
              type="button"
              onClick={onEdit}
              startIcon={<Icon icon={editFill} />}
            >
              Edit
            </Button>
          )
        }
      />

      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Boost Name:
            </Typography>
            <Typography variant="subtitle2">
              {selectedBoostDevice?.boostName}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Boost Serial Number
            </Typography>
            <Typography variant="subtitle2">
              {selectedBoostDevice?.boostSerialNumber}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Client-ID
            </Typography>
            <Typography variant="subtitle2">
              {selectedBoostDevice?.clientId}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Boost Group Name
            </Typography>
            <Typography variant="subtitle2">
              {selectedBoostDevice?.boostGroupName}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Status
            </Typography>
            {BoostStatusLabel(selectedBoostDevice.technicalStatus)}
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Left Connector
            </Typography>
            {BoostConnectorLabel(selectedBoostDevice?.leftConnector)}
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Right Connector
            </Typography>
            {BoostConnectorLabel(selectedBoostDevice?.rightConnector)}
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ mt: "8px" }} variant="subtitle1">
              Address
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="body2"
              component="span"
              sx={{ color: "text.secondary" }}
            >
              Street:
            </Typography>
            <Typography variant="subtitle2">
              {selectedBoostDevice?.Address?.street}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="body2"
              component="span"
              sx={{ color: "text.secondary" }}
            >
              State:
            </Typography>
            <Typography variant="subtitle2">
              {selectedBoostDevice?.Address?.state}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="body2"
              component="span"
              sx={{ color: "text.secondary" }}
            >
              Zip Code:
            </Typography>
            <Typography variant="subtitle2">
              {selectedBoostDevice?.Address?.zipCode}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="body2"
              component="span"
              sx={{ color: "text.secondary" }}
            >
              Country:
            </Typography>
            <Typography variant="subtitle2">
              {selectedBoostDevice?.Address?.country}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
