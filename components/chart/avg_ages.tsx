import React from "react";
import { useTranslation } from "react-i18next";

import { Card, BarChart } from "../../../core/components";
import { PostApi } from "../../../core/libs";

export default function AvgAges() {
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const { t } = useTranslation(["public", "market"]);
  const [chart, setCharts] = React.useState([]);

  React.useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      return;
    }

    const getCntPost = async () => {
      const _result: any = await PostApi({}, "market/chart-avg-ages");

      if (_result.code === 200) setCharts(_result.items);
    };
    getCntPost();
  }, [loaded]);

  return (
    <Card title={t("avg-age-players", { ns: "market" })} height="350px">
      {chart && <BarChart data={chart} />}
    </Card>
  );
}
