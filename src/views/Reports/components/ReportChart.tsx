import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

// Modles
import { Gateway } from "../../../models/gateway";
import { Project } from "../../../models/project";
import { ReportState, ReportChartType, Total } from "../../../models/report";

// Utils
import { bgName } from "../../../utils/style.util";
import { formatNumber } from "../../../utils/number.util";
import { getTotal, DEFAULT_CHART_OPTIONS } from "../../../utils/report.util";

interface ReportChartProps {
  reportState: ReportState;
  projects: Project[];
  gateways: Gateway[];
  type: ReportChartType;
}

const ReportChart = ({
  reportState,
  projects,
  gateways,
  type,
}: ReportChartProps) => {
  const [chartState, setChartState] = useState<any>(DEFAULT_CHART_OPTIONS);

  useEffect(() => {
    let items: any[];
    let itemsTotal: Total;
    let series = [];
    let labels = [];
    if (type === ReportChartType.PROJECT) {
      items = gateways;
      itemsTotal = reportState.gatewaysTotal;
    } else {
      items = projects;
      itemsTotal = reportState.projectsTotal;
    }

    for (const [key, value] of Object.entries(itemsTotal)) {
      const filtered = items.filter((item) => {
        const id =
          type === ReportChartType.PROJECT ? item.gatewayId : item.projectId;
        return id === key;
      });
      labels.push(filtered[0].name);
      series.push(parseFloat(value.toFixed(2)));
    }

    setChartState({
      ...chartState,
      items: items,
      itemsTotal: itemsTotal,
      series: series,
      options: { ...chartState.options, labels: labels },
    });
  }, []);

  return (
    <div className="flex flex-col">
      <div className="card grid grid-cols-4 !px-6">
        {chartState.items.map((item: Project | Gateway, index: number) => {
          return (
            <div key={`tooltip-${index}`} className="flex gap-3 items-center">
              <div className={`w-4 h-4 rounded ${bgName(index + 1)}`}></div>
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
      <div className="grow my-7 mx-auto">
        <Chart
          options={chartState.options}
          series={chartState.series}
          type="donut"
          width={200}
          height={200}
        />
      </div>
      <div className="report-footer-total">
        {type} TOTAL |{" "}
        {reportState.loading
          ? 0
          : formatNumber(getTotal(chartState.itemsTotal))}{" "}
        USD
      </div>
    </div>
  );
};

export default ReportChart;
