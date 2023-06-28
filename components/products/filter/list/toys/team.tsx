import { useTranslation } from "react-i18next";

import { GridItem, Combo } from "@/core/components";

export default function Country(props: any) {
  const { t } = useTranslation(["market"]);

  const handleChange = (event: any) => {
    let value: string = event.target.value as string;
    props.setTeam(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <GridItem>
      <Combo
        items={props.teams}
        selected={props.team}
        onChange={handleChange}
        title={t("team")}
        multiple
      />
    </GridItem>
  );
}
