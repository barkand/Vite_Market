import { Utils, GetContract } from "../../../admin/components";
import { logger, PostAuthApi } from "../../../core/libs";

import Market from "../Market.json";

const path = "Market>Contracts>lib>";

const GetTokenId = (productId: number) =>
  import.meta.env.VITE_NFT_CODE + productId;

const Buy = async (ItemId: number, price: any, account: any) => {
  let txn = "";
  const NFT_id = GetTokenId(ItemId);
  const NFT_Metadata: any = `${
    import.meta.env.VITE_SERVER_PATH
  }/metadata/${NFT_id}.json`;

  try {
    let contract = await GetContract(Market);
    let _gas = await contract.methods.buy(NFT_Metadata, NFT_id).estimateGas({
      from: account,
      value: Utils.toWei(`${price}`, "ether"),
    });

    let _result = await contract.methods.buy(NFT_Metadata, NFT_id).send({
      from: account,
      value: Utils.toWei(`${price}`, "ether"),
      gas: _gas,
      gasLimit: import.meta.env.VITE_GAS_LIMIT,
    });
    txn = _result.transactionHash;
  } catch (e: any) {
    if (e.code === -32000) return { code: 300, message: "buy-money" };

    logger.error(`${path}Buy: ${e.message}`);
    return { code: 300, message: "unsuccess-buy" };
  }

  let _result = await PostAuthApi(
    {
      product: ItemId,
      NFT_id: NFT_id,
      price: price,
      txn: txn,
    },
    "market/save-buy"
  );

  return _result;
};

const Transfer = async (productId: number, price: any, account: any) => {
  const NFT_id = GetTokenId(productId);

  try {
    let contract = await GetContract(Market);
    let _gas = await contract.methods.transferNft(NFT_id).estimateGas({
      from: account,
      value: Utils.toWei(`${price}`, "ether"),
    });

    await contract.methods.transferNft(NFT_id).send({
      from: account,
      value: Utils.toWei(`${price}`, "ether"),
      gas: _gas,
      gasLimit: import.meta.env.VITE_GAS_LIMIT,
    });
  } catch (e: any) {
    logger.error(`${path}Transfer: ${e}`);
    if (e.code === -32000) return { code: 300, message: "buy-money" };

    return { code: 300, message: "unsuccess-buy" };
  }

  let _result = await PostAuthApi(
    {
      product: productId,
      price: price,
    },
    "market/save-buy"
  );

  return _result;
};

const GetTokenURI = async (productId: number) => {
  const NFT_id = GetTokenId(productId);

  try {
    let contract = await GetContract(Market);
    let uri = await contract.methods.getURI(NFT_id).call();

    return { code: 200, status: "success", result: uri };
  } catch (e) {
    logger.error(`${path}GetTokenURI: ${e}`);
    return { code: 300, status: "error", result: "" };
  }
};

const GetOwnerToken = async (productId: number) => {
  const NFT_id = GetTokenId(productId);

  try {
    let contract = await GetContract(Market);
    let owner = await contract.methods.getOwnerToken(NFT_id).call();

    return { code: 200, status: "success", result: owner };
  } catch (e) {
    logger.error(`${path}GetOwnerToken: ${e}`);
    return { code: 300, status: "error", result: "" };
  }
};

export default Buy;
export { Transfer, GetTokenURI, GetOwnerToken };
