import React from "react";
import { useTranslation } from "react-i18next";

import { PublicContext } from "../../../core/context";
import { Card, PieChart } from "../../../core/components";
import { PostApi } from "../../../core/libs";

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
      const _result: any = await PostApi(
        {
          lang: publicCtx.culture.name,
        },
        "market/chart-cnt-position"
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
