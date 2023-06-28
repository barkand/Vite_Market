import { useTranslation } from "react-i18next";

import { GridItem, Combo } from "@/core/components";

export default function Country(props: any) {
  const { t } = useTranslation(["market"]);

  const handleChange = (event: any) => {
    let value: string = event.target.value as string;
    props.setCountry(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <GridItem>
      <Combo
        items={props.countries}
        selected={props.country}
        onChange={handleChange}
        title={t("country")}
        multiple
      />
    </GridItem>
  );
}
