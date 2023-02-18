import React from "react";
import { useTranslation } from "react-i18next";
import _debounce from "lodash/debounce";

import ShopButton from "../../buys/button";

import { PublicContext } from "../../../../core/context";
import { EditTypeEnum, RoutesTypeEnum } from "../../../../core/constant";
import {
  GridHeader,
  GridItem,
  Textbox,
  Switch,
} from "../../../../core/components";
import { PostAuthApi } from "../../../../core/libs";
import {
  CheckCircleIcon,
  CancelIcon,
  EmptyCircleIcon,
} from "../../../../core/icon";
import { NotificationButton } from "../../../../admin/components";

export default function SaleBox({ product }: any) {
  const { publicCtx }: any = React.useContext(PublicContext);
  const { t } = useTranslation(["market"]);
  const [editPrice, setEditPrice] = React.useState(EditTypeEnum.None);
  const [forSale, setForSale] = React.useState(product.forSale);

  const debounceFn = React.useCallback(_debounce(handleDebounceFn, 1000), []);

  async function handleDebounceFn(inputValue: any) {
    let _inputValue = inputValue.trim();
    if (_inputValue === "") return;

    let _result: any = await PostAuthApi(
      {
        product_id: product.id,
        price: _inputValue,
      },
      "market/update-price"
    );

    switch (_result.code) {
      case 200:
        setEditPrice(EditTypeEnum.Edited);
        break;
      case 500:
        setEditPrice(EditTypeEnum.Error);
        break;
      default:
        setEditPrice(EditTypeEnum.None);
        break;
    }
  }

  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    debounceFn(event.target.value);
    setEditPrice(EditTypeEnum.None);
  };

  const handleChangeSale = async () => {
    let _newStateForSale = !forSale;
    setForSale(_newStateForSale);

    let _result: any = await PostAuthApi(
      {
        product_id: product.id,
        for_sale: _newStateForSale,
      },
      "market/save-sale"
    );

    if (_result.code !== 200) setForSale(!_newStateForSale);
  };

  return (
    <>
      {product.owner === publicCtx.user.user_id ? (
        <GridHeader rowSpacing={2} sx={{ marginTop: "10px" }}>
          <GridItem xs={4}>{t("your-price")}</GridItem>
          <GridItem xs={6}>
            <div style={{ direction: "ltr", float: publicCtx.culture.align }}>
              <Textbox
                autoComplete="off"
                sx={{ width: "16ch", marginTop: "-20px" }}
                label={product.price}
                onChange={handleChangePrice}
              />
              {" eth"}
            </div>
          </GridItem>
          <GridItem xs={2}>
            {editPrice === EditTypeEnum.Edited ? (
              <CheckCircleIcon color="primary" />
            ) : editPrice === EditTypeEnum.Error ? (
              <CancelIcon color="primary" />
            ) : (
              <EmptyCircleIcon color="primary" />
            )}
          </GridItem>
          <GridItem xs={4}>{t("active-sale")}</GridItem>
          <GridItem xs={6}>
            <Switch checked={forSale} handleChange={handleChangeSale} />
          </GridItem>
        </GridHeader>
      ) : product.forSale ? (
        <ShopButton
          itemId={product.id}
          image={product.image}
          price={product.price}
          isSoled={product.soled}
          forSale={product.forSale}
          sx={{ marginTop: "-50px", float: publicCtx.culture.revertAlign }}
        />
      ) : (
        <NotificationButton
          id={product.id}
          message={`${product.name} (${product.card}) ${t(
            "notify-active-title"
          )}`}
          link={`${RoutesTypeEnum.Item}/${product.id}`}
          notified={product.notified}
          sx={{ marginTop: "-50px", float: publicCtx.culture.revertAlign }}
        />
      )}
    </>
  );
}
