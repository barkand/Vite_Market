const GetBuys = async (params: any) => {
  let _result = await fetch(`${import.meta.env.VITE_SERVER_PATH}market/buys`, {
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

  return { code: 200, items: _result.data };
};

const CheckBuy = async (params: any) => {
  let _result = await fetch(
    `${import.meta.env.VITE_SERVER_PATH}market/check-buy`,
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

export { GetBuys, CheckBuy };
