import { Category } from "@/types";

type NpcInfo = {
  name: string;
  sub: string;
  image?: string;
  datable: boolean;
};

const npcs: NpcInfo[] = [
  // Bachelors
  { name: "Alex", sub: "Bachelors", image: "/images/villagers/alex.png", datable: true },
  { name: "Elliott", sub: "Bachelors", image: "/images/villagers/elliot.png", datable: true },
  { name: "Harvey", sub: "Bachelors", image: "/images/villagers/harvey.png", datable: true },
  { name: "Sam", sub: "Bachelors", image: "/images/villagers/sam.png", datable: true },
  { name: "Sebastian", sub: "Bachelors", image: "/images/villagers/sebastian.png", datable: true },
  { name: "Shane", sub: "Bachelors", image: "/images/villagers/shane.png", datable: true },
  // Bachelorettes
  { name: "Abigail", sub: "Bachelorettes", image: "/images/villagers/abigail.png", datable: true },
  { name: "Emily", sub: "Bachelorettes", image: "/images/villagers/emily.png", datable: true },
  { name: "Haley", sub: "Bachelorettes", image: "/images/villagers/haley.png", datable: true },
  { name: "Leah", sub: "Bachelorettes", image: "/images/villagers/leah.png", datable: true },
  { name: "Maru", sub: "Bachelorettes", image: "/images/villagers/maru.png", datable: true },
  { name: "Penny", sub: "Bachelorettes", image: "/images/villagers/penny.png", datable: true },
  // Villagers
  { name: "Caroline", sub: "Villagers", image: "/images/villagers/caroline.png", datable: false },
  { name: "Clint", sub: "Villagers", image: "/images/villagers/clint.png", datable: false },
  { name: "Demetrius", sub: "Villagers", image: "/images/villagers/demetrius.png", datable: false },
  { name: "Dwarf", sub: "Villagers", image: "/images/villagers/dwarf.png", datable: false },
  { name: "Evelyn", sub: "Villagers", image: "/images/villagers/evelyn.png", datable: false },
  { name: "George", sub: "Villagers", image: "/images/villagers/george.png", datable: false },
  { name: "Gus", sub: "Villagers", image: "/images/villagers/gus.png", datable: false },
  { name: "Jas", sub: "Villagers", image: "/images/villagers/jas.png", datable: false },
  { name: "Jodi", sub: "Villagers", image: "/images/villagers/jodi.png", datable: false },
  { name: "Kent", sub: "Villagers", image: "/images/villagers/kent.png", datable: false },
  { name: "Krobus", sub: "Villagers", image: "/images/villagers/krobus.png", datable: false },
  { name: "Leo", sub: "Villagers", image: "/images/villagers/leo.png", datable: false },
  { name: "Lewis", sub: "Villagers", image: "/images/villagers/lewis.png", datable: false },
  { name: "Linus", sub: "Villagers", image: "/images/villagers/linus.png", datable: false },
  { name: "Marnie", sub: "Villagers", image: "/images/villagers/marnie.png", datable: false },
  { name: "Pam", sub: "Villagers", image: "/images/villagers/pam.png", datable: false },
  { name: "Pierre", sub: "Villagers", image: "/images/villagers/pierre.png", datable: false },
  { name: "Robin", sub: "Villagers", image: "/images/villagers/robin.png", datable: false },
  { name: "Sandy", sub: "Villagers", image: "/images/villagers/sandy.png", datable: false },
  { name: "Vincent", sub: "Villagers", image: "/images/villagers/vincent.png", datable: false },
  { name: "Willy", sub: "Villagers", image: "/images/villagers/willy.png", datable: false },
  { name: "Wizard", sub: "Villagers", image: "/images/villagers/wizard.png", datable: false },
];

/** Map from item id to whether villager is datable */
export const villagerMeta: Record<string, { datable: boolean }> = {};
npcs.forEach((npc, i) => {
  villagerMeta[`friendship-${i}`] = { datable: npc.datable };
});

export const friendships: Category = {
  id: "friendships",
  name: "Friendships",
  description: "Reach max hearts with all villagers",
  icon: "/images/special-powers/friendship-101.png",
  items: npcs.map((npc, i) => ({
    id: `friendship-${i}`,
    name: npc.name,
    subcategory: npc.sub,
    ...(npc.image && { image: npc.image }),
  })),
};
