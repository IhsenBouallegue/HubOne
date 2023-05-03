import { useHubOneStore } from "../../../lib/Store";
import CompactHero from "./CompactHero";
import FullHero from "./FullHero";

export function Hero() {
  const compactMode = useHubOneStore((state) => state.compactMode);
  return compactMode ? <CompactHero /> : <FullHero />;
}

export default Hero;
