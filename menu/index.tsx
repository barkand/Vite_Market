import { useTranslation } from "react-i18next";

import { RoutesTypeEnum } from "../../core/constant";
import { ButtonList } from "../../core/components";
import { PlayerIcon } from "../../core/icon";

export default function MenuList(props: any) {
  const { t } = useTranslation(["market"]);

  return (
    <>
      <ButtonList
        to={RoutesTypeEnum.List}
        name={t("list")}
        icon={<PlayerIcon />}
        onclick={props.onClose}
      />
    </>
  );
}
