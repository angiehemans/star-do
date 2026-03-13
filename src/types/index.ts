export type ChecklistEntry = {
  id: string;
  name: string;
  subcategory?: string;
  image?: string;
  detail?: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  icon: string;
  items: ChecklistEntry[];
  collectionOrder?: string[];
};

export type ProgressData = Record<string, boolean>;

export type RelationshipStatus = "single" | "dating" | "married";

export type VillagerData = {
  hearts: number;
  status: RelationshipStatus;
};

export type FriendshipData = Record<string, VillagerData>;
