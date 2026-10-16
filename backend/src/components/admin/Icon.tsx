// Small brand mark used in the admin nav / header.
export function Icon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Sewa Bharti"
      width={28}
      height={28}
      style={{ width: 28, height: 28, objectFit: "contain", display: "block" }}
    />
  );
}
