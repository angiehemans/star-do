import { Category } from "@/types";

const fish: { name: string; sub: string; image?: string }[] = [
  // Spring
  { name: "Smallmouth Bass", sub: "Spring", image: "/images/fishing/smallmouth-bass.png" },
  { name: "Sunfish", sub: "Spring", image: "/images/fishing/sunfish.png" },
  { name: "Catfish", sub: "Spring", image: "/images/fishing/catfish.png" },
  { name: "Shad", sub: "Spring", image: "/images/fishing/shad.png" },
  { name: "Eel", sub: "Spring", image: "/images/fishing/eel.png" },
  { name: "Herring", sub: "Spring", image: "/images/fishing/herring.png" },
  { name: "Sardine", sub: "Spring", image: "/images/fishing/sardine.png" },
  { name: "Halibut", sub: "Spring", image: "/images/fishing/halibut.png" },
  { name: "Flounder", sub: "Spring", image: "/images/fishing/flounder.png" },
  // Summer
  { name: "Red Snapper", sub: "Summer", image: "/images/fishing/red-snapper.png" },
  { name: "Red Mullet", sub: "Summer", image: "/images/fishing/red-mullet.png" },
  { name: "Tilapia", sub: "Summer", image: "/images/fishing/tilapia.png" },
  { name: "Dorado", sub: "Summer", image: "/images/fishing/dorado.png" },
  { name: "Pike", sub: "Summer", image: "/images/fishing/pike.png" },
  { name: "Rainbow Trout", sub: "Summer", image: "/images/fishing/rainbow-trout.png" },
  { name: "Pufferfish", sub: "Summer", image: "/images/fishing/pufferfish.png" },
  { name: "Super Cucumber", sub: "Summer", image: "/images/fishing/super-cucumber.png" },
  { name: "Tuna", sub: "Summer", image: "/images/fishing/tuna.png" },
  { name: "Octopus", sub: "Summer", image: "/images/fishing/octopus.png" },
  // Fall
  { name: "Salmon", sub: "Fall", image: "/images/fishing/salmon.png" },
  { name: "Walleye", sub: "Fall", image: "/images/fishing/walleye.png" },
  { name: "Tiger Trout", sub: "Fall", image: "/images/fishing/tiger-trout.png" },
  { name: "Albacore", sub: "Fall", image: "/images/fishing/albacore.png" },
  { name: "Midnight Carp", sub: "Fall", image: "/images/fishing/midnight-carp.png" },
  // Winter
  { name: "Squid", sub: "Winter", image: "/images/fishing/squid.png" },
  { name: "Perch", sub: "Winter", image: "/images/fishing/perch.png" },
  { name: "Lingcod", sub: "Winter", image: "/images/fishing/lingcod.png" },
  // All Seasons
  { name: "Largemouth Bass", sub: "Any Season", image: "/images/fishing/largemouth-bass.png" },
  { name: "Carp", sub: "Any Season", image: "/images/fishing/carp.png" },
  { name: "Bullhead", sub: "Any Season", image: "/images/fishing/bullhead.png" },
  { name: "Sturgeon", sub: "Any Season", image: "/images/fishing/sturgeon.png" },
  { name: "Woodskip", sub: "Any Season", image: "/images/fishing/woodskip.png" },
  { name: "Ghostfish", sub: "Any Season", image: "/images/fishing/ghostfish.png" },
  { name: "Stonefish", sub: "Any Season", image: "/images/fishing/stonefish.png" },
  { name: "Ice Pip", sub: "Any Season", image: "/images/fishing/ice-pip.png" },
  { name: "Lava Eel", sub: "Any Season", image: "/images/fishing/lava-eel.png" },
  { name: "Sandfish", sub: "Any Season", image: "/images/fishing/sandfish.png" },
  { name: "Scorpion Carp", sub: "Any Season", image: "/images/fishing/scorpion-carp.png" },
  { name: "Blobfish", sub: "Any Season", image: "/images/fishing/blobfish.png" },
  { name: "Midnight Squid", sub: "Any Season", image: "/images/fishing/midnight-squid.png" },
  { name: "Spook Fish", sub: "Any Season", image: "/images/fishing/spook-fish.png" },
  // Crab Pot
  { name: "Lobster", sub: "Crab Pot", image: "/images/fishing/lobster.png" },
  { name: "Crab", sub: "Crab Pot", image: "/images/fishing/crab.png" },
  { name: "Shrimp", sub: "Crab Pot", image: "/images/fishing/shrimp.png" },
  { name: "Crayfish", sub: "Crab Pot", image: "/images/fishing/crayfish.png" },
  { name: "Snail", sub: "Crab Pot", image: "/images/fishing/snail.png" },
  { name: "Periwinkle", sub: "Crab Pot", image: "/images/fishing/periwinkle.png" },
  { name: "Oyster", sub: "Crab Pot", image: "/images/fishing/oyster.png" },
  { name: "Mussel", sub: "Crab Pot", image: "/images/fishing/mussel.png" },
  { name: "Cockle", sub: "Crab Pot", image: "/images/fishing/cockle.png" },
  // Legendary
  { name: "Crimsonfish", sub: "Legendary", image: "/images/fishing/crimsonfish.png" },
  { name: "Angler", sub: "Legendary", image: "/images/fishing/angler.png" },
  { name: "Legend", sub: "Legendary", image: "/images/fishing/legend.png" },
  { name: "Glacierfish", sub: "Legendary", image: "/images/fishing/glacierfish.png" },
  { name: "Mutant Carp", sub: "Legendary", image: "/images/fishing/mutant-carp.png" },
  // Ginger Island
  { name: "Lionfish", sub: "Ginger Island", image: "/images/fishing/lionfish.png" },
  { name: "Blue Discus", sub: "Ginger Island", image: "/images/fishing/blue-discus.png" },
  { name: "Stingray", sub: "Ginger Island", image: "/images/fishing/stingray.png" },
  { name: "Goby", sub: "Ginger Island", image: "/images/fishing/goby.png" },
];

export const fishing: Category = {
  id: "fishing",
  name: "Fishing",
  description: "Catch every fish",
  icon: "/images/fishing/pufferfish.png",
  items: fish.map((f, i) => ({
    id: `fishing-${i}`,
    name: f.name,
    subcategory: f.sub,
    ...(f.image && { image: f.image }),
  })),
};
