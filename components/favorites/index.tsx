import React from "react";

import { PostAuthApi } from "../../../core/libs";

import ProductsList from "../products";

export default function Favorites() {
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [products, setProducts] = React.useState<any>([]);
  const [likeChanged, setLikeChanged] = React.useState<any>(0);

  // Pages
  const perPage = 8;
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);

  React.useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      return;
    }

    const getFavorites = async () => {
      const _result: any = await PostAuthApi(
        {
          pages: {
            pageNumber: pageNumber,
            perPage: perPage,
          },
        },
        "market/favorites"
      );

      if (_result.code === 200) {
        setProducts(_result.items.products);
        setTotalPage(Math.ceil(_result.items.counts / perPage));
      }
    };
    getFavorites();
  }, [pageNumber, likeChanged, loaded]);

  return (
    <ProductsList
      products={products}
      setLikeChanged={setLikeChanged}
      pages={{ pageNumber, setPageNumber, perPage, totalPage }}
    />
  );
}
