import React from "react";

import { useParams } from "react-router-dom";

import { PublicContext } from "../../../../core/context";
import { Box } from "../../../../core/components";

import ProductItem from "../../../components/product";

export default function Item() {
  const { id } = useParams();
  const { publicCtx } = React.useContext(PublicContext);

  return (
    <Box
      sx={{
        marginTop: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        alignItems: "center",
        width: publicCtx.device.isMobile ? "100%" : "80%",
      }}
    >
      <ProductItem id={id} />
    </Box>
  );
}
