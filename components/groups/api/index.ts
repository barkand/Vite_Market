const GetGroups = async (params: any) => {
  let _result = await fetch(
    `${import.meta.env.VITE_SERVER_PATH}market/get-groups`,
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

  return { code: 200, groups: _result.data };
};

export { GetGroups };
