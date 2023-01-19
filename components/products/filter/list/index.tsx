import Card from "./toys/card";
import Country from "./toys/country";
import Team from "./toys/team";
import Position from "./toys/position";
import Age from "./toys/age";

export default function List({
  items,
  selectedItem,
}: {
  items: any;
  selectedItem: any;
}) {
  return (
    <>
      <Card
        cards={items.cards}
        card={selectedItem.card}
        setCard={selectedItem.setCard}
      />
      <Team
        teams={items.teams}
        team={selectedItem.team}
        setTeam={selectedItem.setTeam}
      />
      <Country
        countries={items.countries}
        country={selectedItem.country}
        setCountry={selectedItem.setCountry}
      />
      <Position
        positions={items.positions}
        position={selectedItem.position}
        setPosition={selectedItem.setPosition}
      />
      <Age
        ages={items.ages}
        age={selectedItem.age}
        setAge={selectedItem.setAge}
      />
    </>
  );
}
