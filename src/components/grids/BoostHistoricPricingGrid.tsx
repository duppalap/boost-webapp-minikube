import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IPricingModel from '../../components/BoostAccordian';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}

export interface IPricingModel {
  pricingId?: string;
  rate?: number;
  pricingName?: string;
  pricingTypeId?: number;
  preAuthAmount?: number;
  minimumPayment?: number;
  dischargingTypeId?: number | undefined;
  dischargingLowerLimit?: number | undefined;
  dischargingHigherLimit?: number | undefined;
  // This turns into a component icon
  status?: any;
  createdAt?: any;
  updatedAt?: any;
}

const columns: readonly Column[] = [
  { id: 'pricingName', label: 'Pricing Name' },
  { id: 'createdAt', label: 'Created' },
  {
    id: 'updatedAt',
    label: 'Updated'
  },
  {
    id: 'dischargingHigherLimit',
    label: 'Discharging Higher Limit'
  },
  {
    id: 'dischargingLowerLimit',
    label: 'Discharging Lower Limit'
  },
  {
    id: 'status',
    label: 'Status'
  },
  {
    id: 'preAuthAmount',
    label: 'Pre Auth Amount'
  },
  {
    id: 'rate',
    label: 'Rate'
  }
];

interface BoostHistoricPricingGridProps {
  historicData: IPricingModel[];
}

export function BoostHistoricPricingGrid({ historicData }: BoostHistoricPricingGridProps) {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {historicData.map((row: IPricingModel) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.pricingId}>
                  {columns.map((column: Column) => {
                    const value: any = row[column.id as keyof typeof IPricingModel];
                    return (
                      <TableCell key={`${column.id}_${column.label}`}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
