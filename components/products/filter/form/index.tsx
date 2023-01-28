import React from "react";

import { PublicContext } from "../../../../../core/context";
import { PostApi, PostAuthApi } from "../../../../../core/libs";

import FilterWeb from "./web";
import FilterMobile from "./mobile";

export default function FilterBar({
  setProducts,
  pages,
}: {
  setProducts: any;
  pages: any;
}) {
  const { pageNumber, setPageNumber, perPage, setTotalPage } = pages;
  const { publicCtx } = React.useContext(PublicContext);

  const [loaded, setLoaded] = React.useState<boolean>(false);

  // Filter Items
  const [cards, setCards] = React.useState<string[]>([]);
  const [ages, setAges] = React.useState<string[]>([]);
  const [countries, setCountries] = React.useState<string[]>([]);
  const [teams, setTeams] = React.useState<string[]>([]);
  const [positions, setPositions] = React.useState<string[]>([]);

  // Filter Selected
  const [card, setCard] = React.useState<string[]>([]);
  const [age, setAge] = React.useState<number[]>([]);
  const [country, setCountry] = React.useState<string[]>([]);
  const [team, setTeam] = React.useState<string[]>([]);
  const [position, setPosition] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      return;
    }
    const getFilters = async () => {
      const _result = await PostApi(
        {
          lang: publicCtx.culture.name,
        },
        "market/filters"
      );

      if (_result.code === 200) {
        setCards(_result.items.cards);
        setCountries(_result.items.countries);
        setTeams(_result.items.teams);
        setPositions(_result.items.positions);
        setAges(_result.items.ages);

        setCard([]);
        setCountry([]);
        setTeam([]);
        setPosition([]);
        setAge([20, 35]);
        setPageNumber(1);
      }
    };
    getFilters();
  }, [publicCtx.culture.name, loaded]);

  const getProducts = async () => {
    if (!loaded) return;

    const _result = await PostAuthApi(
      {
        filter: {
          country: country,
          team: team,
          position: position,
          age: age,
          card: card,
        },
        lang: publicCtx.culture.name,
        pages: {
          pageNumber: pageNumber,
          perPage: perPage,
        },
      },
      "market/products"
    );

    if (_result.code === 200) {
      setProducts(_result.items.products);
      setTotalPage(Math.ceil(_result.items.counts / perPage));
    }
  };

  React.useEffect(() => {
    if (!loaded) return;

    setPageNumber(1);
    getProducts();
  }, [age, country, team, position, card]);

  React.useEffect(() => {
    if (!loaded) return;

    getProducts();
  }, [pageNumber]);

  React.useEffect(() => {
    if (!loaded) return;

    getProducts();
  }, [publicCtx.user.connected]);

  return (
    <>
      {loaded && (
        <>
          {publicCtx.device.isMobile ? (
            <FilterMobile
              items={{ cards, countries, teams, positions, ages }}
              selectedItem={{
                card,
                setCard,
                age,
                setAge,
                country,
                setCountry,
                team,
                setTeam,
                position,
                setPosition,
              }}
            />
          ) : (
            <FilterWeb
              items={{ cards, countries, teams, positions, ages }}
              selectedItem={{
                card,
                setCard,
                age,
                setAge,
                country,
                setCountry,
                team,
                setTeam,
                position,
                setPosition,
              }}
            />
          )}
        </>
      )}
    </>
  );
}
