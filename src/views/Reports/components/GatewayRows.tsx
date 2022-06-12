import React, { useState } from "react";

// Components
import ReportTable from "./ReportTable";

// Models
import { Gateway } from "../../../models/gateway";
import { ReportState } from "../../../models/report";

// Utils
import { formatNumber } from "../../../utils/number.util";
import { getGatewayPayments } from "../../../utils/report.util";

interface GatewayRowsProps {
  reportState: ReportState;
  gateways: Gateway[];
}

const GatewayRows = ({ reportState, gateways }: GatewayRowsProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const getGatewayTotal = (gatewayId: string): number => {
    if (reportState.loading) return 0;
    return reportState.gatewaysTotal[gatewayId];
  };

  return (
    <>
      {gateways?.length > 0 &&
        gateways.map((gateway: Gateway, index: number) => {
          const gatewayPayments = getGatewayPayments(
            reportState.payments,
            gateway.gatewayId
          );
          if (!gatewayPayments.length) {
            return <div key={`gateway-${index}`}></div>;
          }

          return (
            <div key={`gateway-${index}`}>
              <div className="row-info" onClick={() => setSelectedIndex(index)}>
                <div>{gateway.name}</div>
                <div>
                  TOTAL: {formatNumber(getGatewayTotal(gateway.gatewayId))} USD
                </div>
              </div>
              <div className="hidden">space 2</div>
              {selectedIndex === index && (
                <ReportTable
                  payments={gatewayPayments}
                  gatewayId={reportState.gatewayId}
                />
              )}
            </div>
          );
        })}
    </>
  );
};

export default GatewayRows;
