import React from "react";

import { GetProductItem as ApiGetProductItem } from "./api";
import { Image, Details, NftDetails, NftChart } from "./gadget";
import { LikeButton } from "../favorites/button";
import SaleBox from "./gadget/sale";

import { PublicContext } from "../../../core/context";
import {
  GridHeader,
  GridItem,
  ShareButton,
  Tilt,
} from "../../../core/components";
import { RoutesTypeEnum } from "../../../core/constant";

export default function ProductItem({ id }: { id: any }) {
  const { publicCtx } = React.useContext(PublicContext);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [product, setProduct] = React.useState<any>();

  React.useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      return;
    }

    const getProduct = async () => {
      const _result = await ApiGetProductItem({
        lang: publicCtx.culture.name,
        id: id,
      });

      if (_result.code === 200) setProduct(_result.product);
    };
    getProduct();
  }, [publicCtx.culture.name, loaded]);

  return (
    <>
      <GridHeader
        sx={{ padding: publicCtx.device.isMobile ? "15px" : "40px" }}
        spacing={3}
        rowSpacing={2}
      >
        {product && (
          <>
            <GridItem lg={4} xs={12} sx={{ textAlign: "center" }}>
              <div>
                <Tilt>
                  <Image name={product.name} image={product.image} />
                </Tilt>
              </div>
              <LikeButton itemId={product.id} isLiked={product.liked} />
            </GridItem>
            <GridItem lg={7} xs={11}>
              <Details product={product} />
              <SaleBox product={product} />
            </GridItem>
            <GridItem lg={1} xs={1}>
              <ShareButton
                url={`${RoutesTypeEnum.Item}/${product.id}`}
                direction="down"
              />
            </GridItem>
            <GridItem xs={12}>
              <NftChart productId={product.id} />
            </GridItem>
            {product && product.soled && (
              <GridItem xs={12}>
                <NftDetails productId={product.id} />
              </GridItem>
            )}
          </>
        )}
      </GridHeader>
    </>
  );
}
