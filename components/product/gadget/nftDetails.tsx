import React from "react";
import { useTranslation } from "react-i18next";

import { GetOwnerToken, GetTokenURI } from "../../../contracts/lib";

import {
  GridHeader,
  GridItem,
  Divider,
  Label,
} from "../../../../core/components";
import { PublicContext } from "../../../../core/context";
import { PostAuthApi } from "../../../../core/libs";

export default function NftDetails({ productId }: { productId: number }) {
  const { publicCtx } = React.useContext(PublicContext);
  const { t } = useTranslation(["market"]);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [nft, setNft] = React.useState<any>();

  React.useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      return;
    }

    if (publicCtx.user.connected) {
      const getNFT = async () => {
        const _ownerToken: any = await GetOwnerToken(productId);
        const _tokenURI: any = await GetTokenURI(productId);
        const _result: any = await PostAuthApi(
          { productId: productId },
          "market/buy"
        );
        const _buy: any = _result?.items;

        if (_ownerToken.code !== 300 || _tokenURI.code !== 300) {
          setNft({
            owner: _ownerToken?.result ?? "",
            uri: _tokenURI?.result ?? "",
            etherscan: _buy?.txn,
          });
        }
      };
      getNFT();
    }
  }, [loaded]);

  return (
    <>
      {nft && (
        <>
          <GridHeader
            rowSpacing={2}
            sx={{ marginTop: "30px", wordWrap: "break-word" }}
          >
            <GridItem sm={12}>
              <Label size="h4">{t("nft-details")}</Label>
              <Divider sx={{ marginTop: "10px" }} />
            </GridItem>
            <GridItem xs={4}>
              <Label size="h7"> Owner:</Label>
            </GridItem>
            <GridItem xs={8}>{nft.owner}</GridItem>
            <GridItem xs={4}>
              <Label size="h7">URI:</Label>
            </GridItem>
            <GridItem xs={8}>{nft.uri}</GridItem>
            <GridItem xs={4}>
              <Label size="h7">Transaction Hash:</Label>
            </GridItem>
            <GridItem xs={8}>{nft.etherscan}</GridItem>
            <GridItem xs={4}>
              <Label size="h7">EtherScan:</Label>
            </GridItem>
            <GridItem xs={8}>
              <a
                href={`https://goerli.etherscan.io/tx/${nft.etherscan}`}
                target="_blank"
                rel="noreferrer"
              >
                https://goerli.etherscan.io/tx/{nft.etherscan}
              </a>
            </GridItem>
          </GridHeader>
        </>
      )}
    </>
  );
}
