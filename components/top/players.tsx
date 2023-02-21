import { GridHeader, GridItem, Media } from "../../../core/components";

export default function Players() {
  return (
    <GridHeader
      direction="row"
      justifyContent="center"
      textAlign="-webkit-center"
      columns={10}
    >
      <GridItem lg={2} md={3} sm={4} xs={12}>
        <div data-aos="flip-down" data-aos-duration="1000">
          <MediaComponent name="133" type="bronze" />
        </div>
      </GridItem>
      <GridItem lg={2} md={3} sm={4} xs={12}>
        <div data-aos="flip-down" data-aos-delay="300" data-aos-duration="2000">
          <MediaComponent name="64" type="silver" />
        </div>
      </GridItem>
      <GridItem lg={2} md={3} sm={4} xs={12}>
        <div data-aos="flip-down" data-aos-delay="600" data-aos-duration="3000">
          <MediaComponent name="243" type="golden" />
        </div>
      </GridItem>
      <GridItem lg={2} md={3} sm={4} xs={12}>
        <div data-aos="flip-down" data-aos-delay="300" data-aos-duration="2000">
          <MediaComponent name="15" type="silver" />
        </div>
      </GridItem>
      <GridItem lg={2} md={3} sm={4} xs={12}>
        <div data-aos="flip-down" data-aos-duration="1000">
          <MediaComponent name="259" type="bronze" />
        </div>
      </GridItem>
    </GridHeader>
  );
}

function MediaComponent({ name, type }: any) {
  return (
    <>
      <Media
        image={`${
          import.meta.env.VITE_CLIENT_PATH
        }/products/${type}/${name}.png`}
        alt={name}
        style={{ height: "320px", width: "auto" }}
      />
    </>
  );
}
