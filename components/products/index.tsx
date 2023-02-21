import React from "react";

import ShopCard from "../card";

import { PublicContext } from "../../../core/context";
import {
  GridHeader,
  GridItem,
  Box,
  Pagination,
  RSkeleton,
} from "../../../core/components";

export default function ProductsList(props: any) {
  const { products, pages }: any = props;
  const { publicCtx } = React.useContext(PublicContext);
  const ChangePage = (e: any, value: any) => pages.setPageNumber(value);

  return (
    <Box
      style={{
        marginTop: "20px",
        alignItems: "center",
        direction: "ltr",
        width: publicCtx.device.isMobile ? "100%" : "80%",
      }}
    >
      <GridHeader
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        style={{ padding: "40px" }}
        spacing={{ xl: 4, lg: 3, md: 2, sm: 2, xs: 1 }}
        rowSpacing={{ xl: 10, lg: 5, sm: 2, xs: 5 }}
      >
        {products ? (
          <>
            {products.map((item: any) => (
              <GridItem key={item.id} xl={3} lg={4} md={6} sm={12}>
                <ShopCard
                  product={item}
                  setLikeChanged={props.setLikeChanged}
                />
              </GridItem>
            ))}
            {products.length % 4 !== 0 &&
              Array(4 - (products.length % 4))
                .fill(0)
                .map((_, i) => (
                  <GridItem key={i} xl={3} lg={4} md={6} sm={12}>
                    <div />
                  </GridItem>
                ))}
          </>
        ) : (
          <>
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <GridItem key={i} lg={3} md={4} sm={6} xs={12}>
                  <RSkeleton width={250} height={350} />
                </GridItem>
              ))}
          </>
        )}
      </GridHeader>
      <Pagination
        count={pages.totalPage}
        onChange={ChangePage}
        page={pages.pageNumber}
      />
    </Box>
  );
}
