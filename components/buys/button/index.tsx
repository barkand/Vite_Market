import React from "react";
import { useTranslation } from "react-i18next";

import Buy, { Transfer } from "../../../contracts/lib";

import { PublicContext } from "../../../../core/context";
import { Button } from "../../../../core/components";
import { StatusTypeEnum } from "../../../../core/constant";
import { PostAuthApi } from "../../../../core/libs";

export default function Shop(props: any) {
  const { publicCtx, setPublicCtx }: any = React.useContext(PublicContext);
  const { t } = useTranslation(["admin", "market"]);
  const {
    itemId,
    price,
    isSoled,
    forSale,
  }: {
    itemId: any;
    price: any;
    isSoled: boolean;
    forSale: boolean;
  } = props;
  const [soled, setSoled] = React.useState(isSoled);
  const [owner, setOwner] = React.useState(false);

  const buyHandle = () => {
    if (!publicCtx.user.connected) {
      setPublicCtx({
        ...publicCtx,
        alert: {
          ...publicCtx.alert,
          open: true,
          message: t("need-login"),
          severity: StatusTypeEnum.Warning,
        },
      });
      return;
    }

    const BuySuccess = () => {
      setPublicCtx({
        ...publicCtx,
        alert: {
          open: true,
          message: t("success-buy", { ns: "market" }),
          severity: StatusTypeEnum.Success,
        },
      });
    };

    const BuyFail = (message: string) => {
      setPublicCtx({
        ...publicCtx,
        alert: {
          open: true,
          message: t(message, { ns: "market" }),
          severity: StatusTypeEnum.Error,
        },
      });
    };

    const buyProduct = async () => {
      if (soled) {
        const _result: any = await Transfer(
          itemId,
          price,
          publicCtx.user.user_id
        );

        if (_result.code === 200) {
          setOwner(true);
          BuySuccess();
        } else {
          BuyFail(_result.message);
        }
      } else {
        const _result_check: any = await PostAuthApi(
          {},
          "market/validate-buys"
        );
        if (_result_check.code === 300) {
          setPublicCtx({
            ...publicCtx,
            alert: {
              open: true,
              message: t("full-buys", { ns: "market" }),
              severity: StatusTypeEnum.Warning,
            },
          });
        } else {
          const _result: any = await Buy(itemId, price, publicCtx.user.user_id);

          if (_result.code === 200) {
            setOwner(true);
            setSoled(true);
            BuySuccess();
          } else BuyFail(_result.message);
        }
      }
    };
    buyProduct();
  };

  return (
    <>
      {!owner && forSale && (
        <Button
          title={t("buy", { ns: "market" })}
          sx={{ ...props.sx, color: soled ? "#9a70ff" : "#5fb987" }}
          onClick={buyHandle}
        />
      )}
    </>
  );
}
