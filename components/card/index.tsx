import LikeButton from "../favorites/button";
import { default as ShopButton } from "../buys/button";

import { default as ShopCardComponent } from "./mui/shopCard";
import { RoutesTypeEnum } from "@/core/constant";

export default function ShopCard(props: any) {
  const { product } = props;

  return (
    <>
      <ShopCardComponent
        id={product.id}
        name={product.nameEn}
        price={product.price}
        liked={product.liked}
        soled={product.soled}
        link={`${RoutesTypeEnum.Item}/${product.id}`}
        image={`${import.meta.env.VITE_CLIENT_PATH}/products/${product.image}`}
        LikeButton={LikeButton}
        ShopButton={ShopButton}
        forSale={product.forSale}
        setLikeChanged={props.setLikeChanged}
      />
    </>
  );
}
