import { useTranslation } from "react-i18next";

import {
  GridHeader,
  GridItem,
  Label,
  Divider,
} from "../../../../core/components";

export default function Details({ product }: any) {
  const { t } = useTranslation(["market"]);

  return (
    <>
      <GridHeader rowSpacing={2}>
        <GridItem sm={12}>
          <Label size="h4">{t("product-item-details")}</Label>
          <Divider style={{ marginTop: "10px" }} />
        </GridItem>
        <GridItem xs={4}>
          <Label size="h7">{t("name")}</Label>
        </GridItem>
        <GridItem xs={8}>{product.name}</GridItem>
        <GridItem xs={4}>
          <Label size="h7">{t("number")}</Label>
        </GridItem>
        <GridItem xs={8}>{product.number}</GridItem>
        <GridItem xs={4}>
          <Label size="h7">{t("position")}</Label>
        </GridItem>
        <GridItem xs={8}>{product.position}</GridItem>
        <GridItem xs={4}>
          <Label size="h7">{t("age")}</Label>
        </GridItem>
        <GridItem xs={8}>{product.age}</GridItem>
        <GridItem xs={4}>
          <Label size="h7">{t("team")}</Label>
        </GridItem>
        <GridItem xs={8}>{product.team}</GridItem>
        <GridItem xs={4}>
          <Label size="h7">{t("country")}</Label>
        </GridItem>
        <GridItem xs={8}>{product.country}</GridItem>
        <Divider style={{ marginTop: "20px" }} />
        <GridItem xs={4}>
          <Label size="h7">{t("price")}</Label>
        </GridItem>
        <GridItem xs={8}>{`${product.price} eth`}</GridItem>
        <Divider style={{ marginTop: "20px" }} />
      </GridHeader>
    </>
  );
}
