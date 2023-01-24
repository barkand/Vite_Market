import React from "react";
import { useTranslation } from "react-i18next";

import { GetHistory as ApiGetHistory } from "../api";

import { PublicContext } from "../../../../core/context";
import { Background, Colors } from "../../../../core/theme";
import {
  GridHeader,
  GridItem,
  Divider,
  Label,
  Table,
  LineChart,
} from "../../../../core/components";

export default function NftChart({ productId }: { productId: number }) {
  const { publicCtx } = React.useContext(PublicContext);
  const { t } = useTranslation(["market"]);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [chart, setChart] = React.useState<any>();

  React.useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      return;
    }

    const getHistory = async () => {
      if (!loaded) {
        setLoaded(true);
        return;
      }
      const _result: any = await ApiGetHistory({
        productId: productId,
      });

      if (_result.code === 200 && _result.items.length > 0) {
        let res: any = [];
        _result.items.map((r: any) => {
          res.push({ ...r, value: r.price });
        });
        setChart(res);
      }
    };
    getHistory();
  }, [loaded]);

  return (
    <>
      {chart && (
        <GridHeader rowSpacing={3} sx={{ marginTop: "10px" }}>
          <GridItem sm={12}>
            <Label size="h4">{t("nft-history")}</Label>
            <Divider sx={{ marginTop: "10px" }} />
          </GridItem>
          <GridItem lg={6} md={12}>
            <div style={{ height: 250 }}>
              <LineChart
                data={chart}
                color={
                  Colors[publicCtx.theme.color][publicCtx.theme.background.name]
                    .primary
                }
              />
            </div>
          </GridItem>
          <GridItem lg={6} md={12}>
            <div
              style={{
                height: "250px",
                overflow: "auto",
                marginRight: "5px",
                marginLeft: "30px",
                direction: "ltr",
                background:
                  Background[publicCtx.theme.background.name].tertiary,
              }}
            >
              {chart
                .slice(0)
                .reverse()
                .map((item: any, i: number) => (
                  <Table
                    key={`table-${i}`}
                    text={`${item.price} eth`}
                    button={item.user_id}
                  />
                ))}
            </div>
          </GridItem>
        </GridHeader>
      )}
    </>
  );
}
