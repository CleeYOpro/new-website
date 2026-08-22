export default function TsaBadge({ place, logo = '/tsa.png' }: { place: string; logo?: string }) {
  return (
    <span className="tsa-badge" title={place}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo} alt="" className="tsa-badge-logo" />
      <span className="tsa-badge-place">{place}</span>
    </span>
  );
}
