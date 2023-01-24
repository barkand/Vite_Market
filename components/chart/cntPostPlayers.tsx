import React from "react";
import { useTranslation } from "react-i18next";

import { Get } from "../../api";

import { PublicContext } from "../../../core/context";
import { Card, PieChart } from "../../../core/components";

export default function CntPostPlayers() {
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
      const _result: any = await Get(
        {
          lang: publicCtx.culture.name,
        },
        "chart-cnt-position"
      );

      if (_result.code === 200) setCharts(_result.items);
      console.log(_result);
    };
    getCntPost();
  }, [loaded]);

  return (
    <Card title={t("cnt-post-players", { ns: "market" })} height="350px">
      {chart && <PieChart data={chart} />}
    </Card>
  );
}
