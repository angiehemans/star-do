import { Category } from "@/types";

const skillItems = [
  { name: "Farming Level 10", sub: "Skills" },
  { name: "Fishing Level 10", sub: "Skills" },
  { name: "Foraging Level 10", sub: "Skills" },
  { name: "Mining Level 10", sub: "Skills" },
  { name: "Combat Level 10", sub: "Skills" },
  // Farming Professions
  { name: "Rancher", sub: "Farming Professions" },
  { name: "Tiller", sub: "Farming Professions" },
  { name: "Coopmaster", sub: "Farming Professions" },
  { name: "Shepherd", sub: "Farming Professions" },
  { name: "Artisan", sub: "Farming Professions" },
  { name: "Agriculturist", sub: "Farming Professions" },
  // Mining Professions
  { name: "Miner", sub: "Mining Professions" },
  { name: "Geologist", sub: "Mining Professions" },
  { name: "Blacksmith", sub: "Mining Professions" },
  { name: "Prospector", sub: "Mining Professions" },
  { name: "Excavator", sub: "Mining Professions" },
  { name: "Gemologist", sub: "Mining Professions" },
  // Foraging Professions
  { name: "Forester", sub: "Foraging Professions" },
  { name: "Gatherer", sub: "Foraging Professions" },
  { name: "Lumberjack", sub: "Foraging Professions" },
  { name: "Tapper", sub: "Foraging Professions" },
  { name: "Botanist", sub: "Foraging Professions" },
  { name: "Tracker", sub: "Foraging Professions" },
  // Fishing Professions
  { name: "Fisher", sub: "Fishing Professions" },
  { name: "Trapper", sub: "Fishing Professions" },
  { name: "Angler", sub: "Fishing Professions" },
  { name: "Pirate", sub: "Fishing Professions" },
  { name: "Mariner", sub: "Fishing Professions" },
  { name: "Luremaster", sub: "Fishing Professions" },
  // Combat Professions
  { name: "Fighter", sub: "Combat Professions" },
  { name: "Scout", sub: "Combat Professions" },
  { name: "Brute", sub: "Combat Professions" },
  { name: "Defender", sub: "Combat Professions" },
  { name: "Acrobat", sub: "Combat Professions" },
  { name: "Desperado", sub: "Combat Professions" },
];

export const skills: Category = {
  id: "skills",
  name: "Skills",
  description: "Max all skills and choose professions",
  icon: "/images/special-powers/masteries.png",
  items: skillItems.map((s, i) => ({
    id: `skill-${i}`,
    name: s.name,
    subcategory: s.sub,
  })),
};
