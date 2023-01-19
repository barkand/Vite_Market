import { LikeButton } from "../favorites/button";
import { ShopButton } from "../buys/button";

import { Card as CardComponent } from "../../../core/components";
import { RoutesTypeEnum } from "../../../core/constant";

export default function Card(props: any) {
  const { product } = props;

  return (
    <>
      <CardComponent
        id={product.id}
        title={product.title}
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
