const Set = async (params: any, name: string) => {
  let _result = await fetch(
    `${import.meta.env.VITE_SERVER_PATH}market/${name}`,
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

const Get = async (params: any, name: string) => {
  let _result = await fetch(
    `${import.meta.env.VITE_SERVER_PATH}market/${name}`,
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

export { Set, Get };
