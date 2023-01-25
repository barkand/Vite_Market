import React from "react";
import { useTranslation } from "react-i18next";

import { PublicContext } from "../../../../core/context";
import { StatusTypeEnum } from "../../../../core/constant";
import { IconButton } from "../../../../core/components";
import { PostAuthApi } from "../../../../core/libs";
import { FavoriteIcon, FavoriteBorderIcon } from "../../../../core/icon";

export default function Like(props: any) {
  const { publicCtx, setPublicCtx }: any = React.useContext(PublicContext);
  const { t } = useTranslation(["admin", "market"]);
  const { itemId, isLiked }: { itemId: any; isLiked: boolean } = props;
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [liked, setLiked] = React.useState(isLiked);

  React.useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      return;
    }

    setLiked(isLiked);
  }, [isLiked]);

  const likeHandle = () => {
    if (!publicCtx.wallet.connected) {
      setPublicCtx({
        ...publicCtx,
        alert: {
          ...publicCtx.alert,
          open: true,
          message: t("NeedLogin"),
          severity: StatusTypeEnum.Warning,
        },
      });
      return;
    }

    const likeProduct = async () => {
      const _result = await PostAuthApi(
        {
          product: itemId,
        },
        "market/save-favorite"
      );

      if (_result.code === 200) {
        setLiked(_result.message === "liked");
        if (props.setLikeChanged)
          props.setLikeChanged(Math.floor(Math.random() * 1000));
      }
    };
    likeProduct();
  };

  return (
    <>
      <IconButton
        label="add to favorites"
        sx={{ ...props.sx, color: "#cc0202" }}
        onClick={likeHandle}
      >
        {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </>
  );
}
