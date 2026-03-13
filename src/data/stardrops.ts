import { Category } from "@/types";

const stardrops = [
  "Buy from Krobus in the Sewers (20,000g)",
  "Mine Treasure Floor (Floor 100)",
  "Old Master Cannoli (Sweet Gem Berry)",
  "Stardew Valley Fair (2,000 Star Tokens)",
  "Spouse or Roommate (at 12.5 hearts)",
  "Master Angler (catch every fish)",
  "Museum Complete (donate all items)",
];

export const stardropList: Category = {
  id: "stardrops",
  name: "Stardrops",
  description: "Collect all 7 Stardrops",
  icon: "/images/index/stardrop.png",
  items: stardrops.map((name, i) => ({
    id: `stardrop-${i}`,
    name,
  })),
};
