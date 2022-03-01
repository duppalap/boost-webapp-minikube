/* eslint-disable jsx-a11y/no-static-element-interactions */

import * as React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core';

import DateRangePicker from './DateRangePicker';

// eslint-disable-next-line no-unused-vars
import { DateRange, DefinedRange } from '../../@types/datePicker';

export interface DateRangePickerWrapperProps {
  open: boolean;
  toggle?: () => void;
  initialDateRange?: DateRange;
  position?: any;
  definedRanges?: DefinedRange[];
  minDate?: Date | string;
  maxDate?: Date | string;
  onChange: (dateRange: DateRange) => void;
  closeOnClickOutside?: boolean;
  wrapperClassName?: string;
}

const DateRangePickerWrapper: React.FunctionComponent<DateRangePickerWrapperProps> = (
  props: DateRangePickerWrapperProps
) => {
  const { position = 'relative' } = props;

  const useStyles = makeStyles(() => ({
    dateRangePickerContainer: {
      position: position
    },
    dateRangePicker: {
      position: position,
      zIndex: 1
    }
  }));

  const classes = useStyles();

  const { closeOnClickOutside, wrapperClassName, toggle, open } = props;

  const wrapperClasses = classNames(classes.dateRangePicker, wrapperClassName);

  return (
    <div className={classes.dateRangePickerContainer}>
      <div className={wrapperClasses}>
        <DateRangePicker {...props} />
      </div>
    </div>
  );
};

export default DateRangePickerWrapper;
