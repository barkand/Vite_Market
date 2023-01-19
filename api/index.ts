const SetBuy = async (params: any) => {
  let _result = await fetch(
    `${import.meta.env.VITE_SERVER_PATH}market/save-buy`,
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

  return { code: 200, status: _result.data };
};

export { SetBuy };
