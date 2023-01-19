const GetFavorites = async (params: any) => {
  let _result = await fetch(
    `${import.meta.env.VITE_SERVER_PATH}market/favorites`,
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

const SetFavorite = async (params: any) => {
  let _result = await fetch(
    `${import.meta.env.VITE_SERVER_PATH}market/save-favorite`,
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

  return { code: 200, status: _result.message };
};

export { GetFavorites, SetFavorite };
