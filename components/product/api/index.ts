const GetProductItem = async (params: any) => {
  let _result = await fetch(`${import.meta.env.VITE_SERVER_PATH}market/item`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ params }),
  })
    .then((res) => res.json())
    .then((d) => d)
    .catch((err) => {
      return { code: 500 };
    });

  return { code: 200, product: _result.data };
};

const GetHistory = async (params: any) => {
  let _result = await fetch(
    `${import.meta.env.VITE_SERVER_PATH}market/history`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ params }),
    }
  )
    .then((res) => res.json())
    .then((d) => d)
    .catch((err) => {
      return { code: 500 };
    });

  return { code: 200, items: _result.data };
};

const GetBuyDetails = async (params: any) => {
  let _result = await fetch(`${import.meta.env.VITE_SERVER_PATH}market/buy`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ params }),
  })
    .then((res) => res.json())
    .then((d) => d)
    .catch((err) => {
      return { code: 500 };
    });

  return _result.data;
};

const UpdateNftPrice = async (params: any) => {
  let _result = await fetch(
    `${import.meta.env.VITE_SERVER_PATH}market/update-price`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ params }),
    }
  )
    .then((res) => res.json())
    .then((d) => d)
    .catch((err) => {
      return { code: 500 };
    });

  return { code: _result.code, status: _result.data };
};

const UpdateForSale = async (params: any) => {
  let _result = await fetch(
    `${import.meta.env.VITE_SERVER_PATH}market/save-sale`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ params }),
    }
  )
    .then((res) => res.json())
    .then((d) => d)
    .catch((err) => {
      return { code: 500 };
    });

  return { code: _result.code, status: _result.data };
};

export {
  GetProductItem,
  GetHistory,
  GetBuyDetails,
  UpdateNftPrice,
  UpdateForSale,
};
