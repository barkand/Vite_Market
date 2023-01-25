import React from "react";
import { useTranslation } from "react-i18next";

import { PublicContext } from "../../../core/context";
import { Card, StackedBarChart } from "../../../core/components";
import { Colors } from "../../../core/theme";
import { PostApi } from "../../../core/libs";

export default function CntSalesCards() {
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const { publicCtx } = React.useContext(PublicContext);
  const { t } = useTranslation(["public", "market"]);
  const [chart, setCharts] = React.useState([]);

  React.useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      return;
    }

    const getCntPost = async () => {
      const _result: any = await PostApi({}, "market/chart-cnt-sales");

      if (_result.code === 200) setCharts(_result.items);
    };
    getCntPost();
  }, [loaded]);

  return (
    <Card title={t("cnt-sale-cards", { ns: "market" })} height="350px" className="step-chart-Sales">
      {chart && (
        <StackedBarChart
          data={chart}
          fill={
            Colors[publicCtx.theme.color][publicCtx.theme.background.name]
              .primary
          }
        />
      )}
    </Card>
  );
}
