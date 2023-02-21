import React from "react";
import { useTranslation } from "react-i18next";

import { default as FilterList } from "../../list";

import { PublicContext } from "../../../../../../core/context";
import { Background } from "../../../../../../core/theme";
import {
  GridHeader,
  IconButton,
  Dialog,
} from "../../../../../../core/components";
import { FilterIcon } from "../../../../../../core/icon";

export default function FilterMobile(props: any) {
  const { publicCtx } = React.useContext(PublicContext);
  const { t } = useTranslation(["market"]);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);

  return (
    <div
      style={{
        marginTop: "15px",
        padding: "1% 1% 1% 1%",
        height: "50px",
        borderRadius: "40px",
        background: Background[publicCtx.theme.background.name].secondary,
        position: "sticky",
        top: "0px",
        zIndex: "99",
      }}
    >
      <>
        <IconButton
          onClick={handleClickOpen}
          style={{ position: "absolute", right: "15px" }}
        >
          <FilterIcon />
        </IconButton>
      </>
      <Dialog
        title={t("filter")}
        open={open}
        setOpen={setOpen}
        fullscreen={publicCtx.device.isMobile}
      >
        <GridHeader style={{ mt: 1, mb: 1, p: 2 }} rowSpacing={5}>
          <FilterList {...props} />
        </GridHeader>
      </Dialog>
    </div>
  );
}
