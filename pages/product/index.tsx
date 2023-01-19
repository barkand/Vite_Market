import React from "react";

import { PublicContext } from "../../../core/context";
import ProductsList from "../../components/products";
import FilterBar from "../../components/products/filter/form";

export default function List() {
  const { publicCtx } = React.useContext(PublicContext);

  const [products, setProducts] = React.useState();
  // Pages
  const perPage = 12;
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(10);

  return (
    <div
      style={
        publicCtx.device.isMobile
          ? {}
          : { display: "flex", marginLeft: "10%", marginRight: "10%" }
      }
    >
      <FilterBar
        setProducts={setProducts}
        pages={{ pageNumber, setPageNumber, perPage, setTotalPage }}
      />
      <ProductsList
        products={products}
        pages={{ pageNumber, setPageNumber, perPage, totalPage }}
      />
    </div>
  );
}
