const GetProductsFilter = async (params: any) => {
  let _result = await fetch(
    `${import.meta.env.VITE_SERVER_PATH}market/filters`,
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

  return { code: 200, filters: _result.data };
};

const GetProducts = async (params: any) => {
  let _result = await fetch(
    `${import.meta.env.VITE_SERVER_PATH}market/products`,
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

  return { code: 200, items: _result.data };
};

export { GetProductsFilter, GetProducts };
