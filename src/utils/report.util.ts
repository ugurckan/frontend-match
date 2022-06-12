// Models
import { Payment } from "../models/payment";
import { Total } from "../models/report";

// Utils
import { BG_COLORS } from "./style.util";

export const DEFAULT_CHART_OPTIONS = {
  items: [],
  itemsTotal: {},
  options: {
    chart: {
      animations: {
        speed: 400,
        animateGradually: {
          enabled: false,
        },
      },
      fontFamily: "inherit",
      foreColor: "inherit",
      type: "donut",
      sparkline: {
        enabled: true,
      },
    },
    colors: BG_COLORS,
    dataLabels: {
      enabled: true,
      enabledOnSeries: true,
      style: {
        fontSize: 12,
        fontFamily: "inherit",
        fontWeight: 500,
      },
    },
    plotOptions: {
      pie: {
        customScale: 0.9,
        expandOnClick: false,
        donut: { size: "50%" },
      },
    },
  },
  series: [],
};

export const calculateProjectTotal = (
  projectId: string,
  reportPayments: Payment[]
): number => {
  const payments = reportPayments.filter(
    (payment: Payment) => payment.projectId === projectId
  );
  if (payments.length === 0) return 0;

  return payments
    .map((payment: Payment) => payment.amount)
    .reduce((a: number, b: number) => a + b);
};

export const calculateGatewayTotal = (
  gatewayId: string,
  reportPayments: Payment[]
): number => {
  if (gatewayId === null) {
    return reportPayments
      .map((payment: Payment) => payment.amount)
      .reduce((a: number, b: number) => a + b);
  }

  const payments = reportPayments.filter(
    (payment: Payment) => payment.gatewayId === gatewayId
  );
  if (payments.length === 0) return 0;

  return payments
    .map((payment: Payment) => payment.amount)
    .reduce((a: number, b: number) => a + b);
};

export const getItemsName = (
  id: string | null,
  name: string,
  nameAll: string,
  items: any[]
): string => {
  if (!id) {
    return nameAll;
  }

  const filtered = items.filter((item: any) => item[name] === id);
  return filtered[0].name;
};

export const getTotal = (total: Total): number => {
  if (!Object.values(total).length) return 0;
  return Object.values(total).reduce((a, b) => a + b);
};

export const getProjectPayments = (
  payments: Payment[],
  projectId: string | null
): Payment[] => {
  if (!projectId) return [];
  return payments.filter((payment) => payment.projectId === projectId);
};

export const getGatewayPayments = (
  payments: Payment[],
  gatewayId: string | null
): Payment[] => {
  if (!gatewayId) return [];
  return payments.filter((payment) => payment.gatewayId === gatewayId);
};
