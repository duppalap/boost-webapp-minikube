import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { Box } from "@mui/material";
import BaseOptionChart from "./BaseOptionChart";

// ----------------------------------------------------------------------

export interface ChartBarProps {
  categories: string[];
  data: number[];
  title: string;
  name: string;
}

export default function BoostBarChart(props: ChartBarProps) {
  const { categories, data, title, name } = props;
  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: "35%" } },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
    },
    legend: { align: "end" as "end" },
    xaxis: {
      categories: categories,
    },
    fill: { type: ["solid", "gradient", "solid"] },
    title: {
      text: title,
      align: "center",
    },
  });
  const series = [
    {
      name: name,
      data: data,
    },
  ];

  return (
    <Box sx={{ p: 3, pb: 1 }} dir="ltr">
      <ReactApexChart
        type="bar"
        series={series}
        options={chartOptions}
        height={400}
      />
    </Box>
  );
}
