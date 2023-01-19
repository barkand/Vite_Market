export default function Image({ name, image }: any) {
  return (
    <>
      <img
        src={`/products/${image}`}
        alt={name}
        style={{ width: "100%", maxWidth: "40vh", height: "auto" }}
      />
    </>
  );
}
