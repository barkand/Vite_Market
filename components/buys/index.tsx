import React from "react";

import ProductsList from "../products";
import { PostAuthApi } from "../../../core/libs";

export default function Buys() {
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [products, setProducts] = React.useState<any>([]);

  // Pages
  const perPage = 8;
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);

  React.useEffect(() => {
    const getBuys = async () => {
      if (!loaded) {
        setLoaded(true);
        return;
      }
      const _result: any = await PostAuthApi(
        {
          pages: {
            pageNumber: pageNumber,
            perPage: perPage,
          },
        },
        "market/buys"
      );

      if (_result.code === 200) {
        setProducts(_result.items.products);
        setTotalPage(Math.ceil(_result.items.counts / perPage));
      }
    };
    getBuys();
  }, [pageNumber, loaded]);

  return (
    <ProductsList
      products={products}
      pages={{ pageNumber, setPageNumber, perPage, totalPage }}
    />
  );
}
