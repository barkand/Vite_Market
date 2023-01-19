import React from "react";

import { default as FilterList } from "../../list";

import { PublicContext } from "../../../../../../core/context";
import { GridHeader } from "../../../../../../core/components";
import { Background } from "../../../../../../core/theme";

export default function FilterWeb(props: any) {
  const { publicCtx } = React.useContext(PublicContext);

  return (
    <>
      <GridHeader
        direction="column"
        alignItems="center"
        rowSpacing={5}
        sx={{
          borderRadius: "40px",
          padding: "5% 1% 5% 1%",
          marginTop: "20px",
          marginBottom: "20px",
          marginRight: publicCtx.culture.direction === "ltr" ? "10px" : "0px",
          marginLeft: publicCtx.culture.direction === "ltr" ? "0px" : "10px",
          background: Background[publicCtx.theme.background.name].secondary,
          top: "20px",
          position: "sticky",
          height: "fit-content",
          minWidth: "150px",
          maxWidth: "220px",
        }}
      >
        <FilterList {...props} />
      </GridHeader>
    </>
  );
}
