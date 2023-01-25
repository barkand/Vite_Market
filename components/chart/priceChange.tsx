import React from "react";
import { useTranslation } from "react-i18next";

import { PublicContext } from "../../../core/context";
import { Card, LineChart } from "../../../core/components";
import { Colors } from "../../../core/theme";

const lineData = [
  { name: "Page A", value: 1.0, value2: 1.5 },
  { name: "Page B", value: 2.0, value2: 2.0 },
  { name: "Page C", value: 3.0, value2: 2.5 },
  { name: "Page D", value: 2.0, value2: 1.6 },
  { name: "Page E", value: 3.0, value2: 3.0 },
  { name: "Page F", value: 1.0, value2: 2.0 },
  { name: "Page G", value: 2.5, value2: 3.6 },
  { name: "Page H", value: 4.0, value2: 3.2 },
];

export default function priceChange() {
  const { publicCtx } = React.useContext(PublicContext);
  const { t } = useTranslation(["public", "market"]);

  return (
    <>
      <Card title={t("change-prices", { ns: "market" })} height="350px">
        <LineChart
          data={lineData}
          yAxis={!publicCtx.device.isMobile}
          color={
            Colors[publicCtx.theme.color][publicCtx.theme.background.name]
              .primary
          }
          color2="#220135"
        />
      </Card>
    </>
  );
}
