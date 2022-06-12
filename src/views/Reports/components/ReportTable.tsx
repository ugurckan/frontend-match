import React from "react";

// Models
import { Payment } from "../../../models/payment";

// Utils
import { formatDate } from "../../../utils/date.util";

const ReportTable = ({
  payments,
  gatewayId,
}: {
  payments: Payment[];
  gatewayId: string | null;
}) => {
  return (
    <div className="p-4 max-h-[11rem] overflow-auto">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            {!gatewayId && <th className="!text-center">Gateway</th>}
            <th className="!text-center">Transaction ID</th>
            <th className="!text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => {
            return (
              <tr key={`payment-${index}`}>
                <td>{formatDate(payment.created)}</td>
                {!gatewayId && (
                  <td className="text-center">{payment.gatewayId}</td>
                )}
                <td className="text-center">{payment.paymentId}</td>
                <td className="text-right">
                  {payment.amount ? payment.amount.toFixed(0) : 0} USD
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
