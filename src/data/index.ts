import { Category } from "@/types";
import { shipping } from "./shipping";
import { museum } from "./museum";
import { cooking } from "./cooking";
import { crafting } from "./crafting";
import { fishing } from "./fishing";
import { bundles } from "./bundles";
import { friendships } from "./friendships";
import { skills } from "./skills";
import { stardropList } from "./stardrops";
import { monsters } from "./monsters";
import { walnuts } from "./walnuts";
import { quests } from "./quests";
import { notes } from "./notes";
import {
  fishingCollectionOrder,
  cookingCollectionOrder,
  shippingCollectionOrder,
  craftingCollectionOrder,
  mineralsCollectionOrder,
  artifactsCollectionOrder,
} from "./collectionOrders";

// Attach collection orders to categories that have them
fishing.collectionOrder = fishingCollectionOrder;
cooking.collectionOrder = cookingCollectionOrder;
shipping.collectionOrder = shippingCollectionOrder;
crafting.collectionOrder = craftingCollectionOrder;
museum.collectionOrder = [...mineralsCollectionOrder, ...artifactsCollectionOrder];

export const categories: Category[] = [
  shipping,
  museum,
  cooking,
  crafting,
  fishing,
  bundles,
  friendships,
  skills,
  stardropList,
  monsters,
  walnuts,
  quests,
  notes,
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
