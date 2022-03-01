import { BoostDeviceInterface } from "../@types/boost";
import React, { createContext, useState } from "react";
import { defaultRanges } from "../defaults/datePicker";
import { DateRange } from "../@types/datePicker";

interface IDashboardContext {
  selectedBoostDevice?: BoostDeviceInterface;
  updateSelectedBoostDevice: React.Dispatch<any>;
  loadingSummary?: boolean;
  setLoadingSummary: React.Dispatch<React.SetStateAction<any>>;
  dateRange?: DateRange;
  updateDateRange: React.Dispatch<any>;
}

export const DashboardContext = createContext({} as IDashboardContext);

interface IDashboardContextProvider {
  children: any;
}

export const DashboardContextProvider = (props: IDashboardContextProvider) => {
  let [selectedBoostDevice, setSelectedBoostDevice] =
    useState<BoostDeviceInterface>();

  let [dateRange, setDateRange] = useState<DateRange>(defaultRanges[1]);

  let [loadingSummary, setLoadingSummary] = useState<boolean>(false);

  const value = {
    selectedBoostDevice,
    updateSelectedBoostDevice,
    dateRange,
    updateDateRange,
    loadingSummary,
    setLoadingSummary,
  };

  function updateSelectedBoostDevice(newState: BoostDeviceInterface) {
    setSelectedBoostDevice((prevState: BoostDeviceInterface) => {
      return { ...prevState, ...newState };
    });
  }

  function updateDateRange(newState: DateRange) {
    setDateRange((prevState: DateRange) => {
      return { ...prevState, ...newState };
    });
  }

  return (
    <DashboardContext.Provider value={value}>
      {props.children}
    </DashboardContext.Provider>
  );
};
