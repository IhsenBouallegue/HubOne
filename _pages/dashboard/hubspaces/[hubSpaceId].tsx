import { useRouter } from "next/router";

export default function HubSpace() {
  const router = useRouter();
  const { hubSpaceId } = router.query;
  if (!hubSpaceId) return <div>No HubSpaceId</div>;
  return <div>{hubSpaceId}</div>;
}
