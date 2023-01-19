import React from "react";
import { useTranslation } from "react-i18next";

import Buy, { Transfer } from "../../../contracts/lib";

import { PublicContext } from "../../../../core/context";
import { IconButton } from "../../../../core/components";
import { ShoppingCartIcon } from "../../../../core/icon";
import { StatusTypeEnum } from "../../../../core/constant";

export default function Shop(props: any) {
  const { publicCtx, setPublicCtx }: any = React.useContext(PublicContext);
  const { t } = useTranslation(["admin", "market"]);
  const {
    itemId,
    image,
    price,
    isSoled,
    forSale,
  }: {
    itemId: any;
    image: string;
    price: any;
    isSoled: boolean;
    forSale: boolean;
  } = props;
  const [soled, setSoled] = React.useState(isSoled);
  const [owner, setOwner] = React.useState(false);

  const buyHandle = () => {
    if (!publicCtx.wallet.connected) {
      setPublicCtx({
        ...publicCtx,
        alert: {
          ...publicCtx.alert,
          open: true,
          message: t("NeedLogin"),
          severity: StatusTypeEnum.Warning,
        },
      });
      return;
    }

    const LoginSuccess = () => {
      setPublicCtx({
        ...publicCtx,
        alert: {
          open: true,
          message: t("success-buy", { ns: "market" }),
          severity: StatusTypeEnum.Success,
        },
      });
    };
    const LoginFail = (message: string) => {
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
          publicCtx.wallet.account
        );

        if (_result.code === 200) {
          setOwner(true);
          LoginSuccess();
        } else {
          LoginFail(_result.message);
        }
      } else {
        const _result: any = await Buy(
          itemId,
          price,
          publicCtx.wallet.account,
          `${import.meta.env.VITE_CLIENT_PATH}/products/${image}`
        );

        if (_result.code === 200) {
          setOwner(true);
          setSoled(true);
          LoginSuccess();
        } else LoginFail(_result.message);
      }
    };
    buyProduct();
  };

  return (
    <>
      {!owner && forSale && (
        <IconButton
          label="add to cart"
          sx={{ ...props.sx, color: soled ? "#9a70ff" : "#5fb987" }}
          onClick={buyHandle}
        >
          <ShoppingCartIcon />
        </IconButton>
      )}
    </>
  );
}
