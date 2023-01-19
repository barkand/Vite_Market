import { useTranslation } from "react-i18next";

import { GridItem, Combo } from "../../../../../../core/components";

export default function Position(props: any) {
  const { t } = useTranslation(["market"]);

  const handleChange = (event: any) => {
    let value: string = event.target.value as string;
    props.setPosition(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <GridItem>
      <Combo
        items={props.positions}
        selected={props.position}
        onChange={handleChange}
        title={t("position")}
        multiple
      />
    </GridItem>
  );
}
