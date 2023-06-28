import { useTranslation } from "react-i18next";

import { GridItem, Combo } from "@/core/components";

export default function Card(props: any) {
  const { t } = useTranslation(["market"]);

  const handleChange = (event: any) => {
    let value: string = event.target.value as string;
    props.setCard(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <GridItem>
      <Combo
        items={props.cards}
        selected={props.card}
        onChange={handleChange}
        title={t("card")}
        multiple
      />
    </GridItem>
  );
}
