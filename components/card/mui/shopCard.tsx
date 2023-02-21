import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Divider,
  CardActions,
  Skeleton,
} from "@mui/material";

import ShareButton from "../../../../core/components/toys/share";
import Tilt from "../../../../core/components/effect/tilt";

export default function ShopCard(props: any) {
  const { id, name, price, liked, soled, link, image, LikeButton, ShopButton } =
    props;

  return (
    <>
      <Card>
        <CardActionArea component={Link} to={link}>
          {image ? (
            <Tilt>
              <CardMedia
                component="img"
                height="auto"
                image={image}
                alt={name}
              />
            </Tilt>
          ) : (
            <Skeleton variant="rectangular" height="350px" width="100%" />
          )}
        </CardActionArea>
        <Divider />
        <CardActions disableSpacing sx={{ marginTop: " -50px" }}>
          {LikeButton && (
            <LikeButton
              itemId={id}
              isLiked={liked}
              setLikeChanged={props.setLikeChanged}
            />
          )}
          <div style={{ flexGrow: 1 }} />
          <ShareButton url={link} direction="up" />
        </CardActions>
        <CardContent sx={{ paddingBottom: "16px !important" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography gutterBottom variant="body1" component="span">
              {`${price} eth`}
            </Typography>
            <div style={{ flexGrow: 1 }} />
            {ShopButton && (
              <ShopButton
                itemId={id}
                image={image}
                price={price}
                isSoled={soled}
                forSale={props.forSale}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
