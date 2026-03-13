import { Category } from "@/types";

const walnutLocations = [
  // Volcano
  { name: "Volcano chest (5)", sub: "Volcano" },
  { name: "Volcano entrance (1)", sub: "Volcano" },
  { name: "Volcano floor 5 (1)", sub: "Volcano" },
  { name: "Volcano floor 10 (1)", sub: "Volcano" },
  // Dig Sites
  { name: "Dig Site - south of bridge (3)", sub: "Dig Sites" },
  { name: "Dig Site - center (3)", sub: "Dig Sites" },
  { name: "Dig Site - near bones (3)", sub: "Dig Sites" },
  { name: "Island North dig spot (1)", sub: "Dig Sites" },
  // Field Office
  { name: "Large Animal - complete skeleton (6)", sub: "Field Office" },
  { name: "Snake - complete skeleton (3)", sub: "Field Office" },
  { name: "Frog - complete skeleton (3)", sub: "Field Office" },
  { name: "Bat - complete skeleton (3)", sub: "Field Office" },
  { name: "Survey - complete all (5)", sub: "Field Office" },
  // Bush/Hidden
  { name: "Bush near farmhouse (1)", sub: "Hidden" },
  { name: "Bush near tiger slime (1)", sub: "Hidden" },
  { name: "Gem Birds - 4 shrines (4)", sub: "Hidden" },
  { name: "Banana shrine (3)", sub: "Hidden" },
  { name: "Simon Says shrine (3)", sub: "Hidden" },
  { name: "Darts shrine (3)", sub: "Hidden" },
  // Farming
  { name: "Harvesting crops on island (5)", sub: "Farming" },
  { name: "Fishing on island (5)", sub: "Farming" },
  { name: "Mining in volcano (5)", sub: "Farming" },
  { name: "Mussel Rock (5)", sub: "Farming" },
  // NPC
  { name: "Give Leo items (1)", sub: "NPCs" },
  { name: "Birdie's Quest (5)", sub: "NPCs" },
  { name: "Pirate Cove - darts (1)", sub: "NPCs" },
];

export const walnuts: Category = {
  id: "walnuts",
  name: "Golden Walnuts",
  description: "Find all Golden Walnuts on Ginger Island",
  icon: "/images/Golden_Walnut.png",
  items: walnutLocations.map((w, i) => ({
    id: `walnut-${i}`,
    name: w.name,
    subcategory: w.sub,
  })),
};
