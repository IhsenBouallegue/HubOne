import { useHubOneStore } from "@/lib/Store";
import { CompactHero } from "./compact-hero";
import { FullHero } from "./full-hero";

export function Hero() {
  const compactMode = useHubOneStore((state) => state.compactMode);
  return compactMode ? <CompactHero /> : <FullHero />;
}
