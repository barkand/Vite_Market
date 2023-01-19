import React from "react";

import { GetGroups as ApiGetGroups } from "./api";

import { PublicContext } from "../../../core/context";
import { Media, Carousel } from "../../../core/components";

export default function Groups() {
  const { publicCtx } = React.useContext(PublicContext);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [groups, setGroups] = React.useState([]);

  React.useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      return;
    }

    const getGroups = async () => {
      const _result = await ApiGetGroups({
        lang: publicCtx.culture.name,
      });

      if (_result?.code === 200) setGroups(_result?.groups);
    };
    getGroups();
  }, [loaded, publicCtx.culture.name]);

  return (
    <>
      {groups && (
        <Carousel>
          {groups.map((group: any) => (
            <div
              key={group._id.id}
              style={{
                textAlign: "center",
              }}
            >
              <Media
                image={`${import.meta.env.VITE_CLIENT_PATH}/products/groups/${
                  group._id.id
                }.png`}
                alt={group._id.id}
                sx={{
                  maxHeight: "120px",
                  width: "auto",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <p>{group._id.title}</p>
            </div>
          ))}
        </Carousel>
      )}
    </>
  );
}
