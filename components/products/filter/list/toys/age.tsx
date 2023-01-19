import { useTranslation } from "react-i18next";

import { GridItem, SliderRange } from "../../../../../../core/components";

export default function Age(props: any) {
  const { t } = useTranslation(["market"]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    props.setAge(newValue as number[]);
  };

  return (
    <GridItem>
      <SliderRange
        min={props.ages[0]}
        max={props.ages[1]}
        selected={props.age}
        onChange={handleChange}
        title={t("age-range")}
      />
    </GridItem>
  );
}
