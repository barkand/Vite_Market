import {
  Utils,
  GetContract,
} from "../../../admin/components/security/Authentication/wallet/libs/web3";
import { logger } from "../../../core/libs";

import { Set as ApiSet } from "../../api";
import Market from "../Market.json";

const path = "Market>Contracts>lib>";

const Buy = async (
  productId: number,
  price: any,
  account: any,
  image: string
) => {
  let txn = "";
  try {
    let contract = await GetContract(Market);
    let _gas = await contract.methods.buy(image, productId).estimateGas({
      from: account,
      value: Utils.toWei(price.toString(), "ether"),
    });

    let _result = await contract.methods.buy(image, productId).send({
      from: account,
      value: Utils.toWei(price.toString(), "ether"),
      gas: _gas,
      gasLimit: import.meta.env.VITE_GAS_LIMIT,
    });
    txn = _result.transactionHash;
  } catch (e: any) {
    if (e.code === -32000) return { code: 300, message: "buy-money" };

    logger.error(`${path}Buy: ${e.message}`);
    return { code: 300, message: "unsuccess-buy" };
  }

  let _result = await ApiSet(
    {
      product: productId,
      price: price,
      txn: txn,
    },
    "save-buy"
  );

  return _result;
};

const Transfer = async (productId: number, price: any, account: any) => {
  try {
    let contract = await GetContract(Market);
    let _gas = await contract.methods.transferNft(productId).estimateGas({
      from: account,
      value: Utils.toWei(price.toString(), "ether"),
    });

    await contract.methods.transferNft(productId).send({
      from: account,
      value: Utils.toWei(price.toString(), "ether"),
      gas: _gas,
      gasLimit: import.meta.env.VITE_GAS_LIMIT,
    });
  } catch (e: any) {
    logger.error(`${path}Transfer: ${e}`);
    if (e.code === -32000) return { code: 300, message: "buy-money" };

    return { code: 300, message: "unsuccess-buy" };
  }

  let _result = await ApiSet(
    {
      product: productId,
      price: price,
    },
    "save-buy"
  );

  return _result;
};

const GetTokenURI = async (productId: number) => {
  try {
    let contract = await GetContract(Market);
    let uri = await contract.methods.getURI(productId).call();

    return { code: 200, status: "success", result: uri };
  } catch (e) {
    logger.error(`${path}GetTokenURI: ${e}`);
    return { code: 300, status: "error", result: "" };
  }
};

const GetOwnerToken = async (productId: number) => {
  try {
    let contract = await GetContract(Market);
    let owner = await contract.methods.getOwnerToken(productId).call();

    return { code: 200, status: "success", result: owner };
  } catch (e) {
    logger.error(`${path}GetOwnerToken: ${e}`);
    return { code: 300, status: "error", result: "" };
  }
};

export default Buy;
export { Transfer, GetTokenURI, GetOwnerToken };
