"use client";

import { use, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import * as Accordion from "@radix-ui/react-accordion";
import { getCategoryById } from "@/data";
import { villagerMeta } from "@/data/friendships";
import { ChecklistEntry } from "@/types";
import { useProgress } from "@/hooks/useProgress";
import { useFriendships } from "@/hooks/useFriendships";
import { useSearch } from "@/hooks/useSearch";
import { Header } from "@/components/Header/Header";
import { ProgressBar } from "@/components/ProgressBar/ProgressBar";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { ChecklistItem } from "@/components/ChecklistItem/ChecklistItem";
import { VillagerCard } from "@/components/VillagerCard/VillagerCard";
import styles from "./page.module.css";

type ViewMode = "grouped" | "collection";

type Props = {
  params: Promise<{ id: string }>;
};

function sortByCollectionOrder(
  items: ChecklistEntry[],
  order: string[]
): ChecklistEntry[] {
  const indexMap = new Map(order.map((name, i) => [name, i]));
  return [...items].sort((a, b) => {
    const ai = indexMap.get(a.name) ?? Infinity;
    const bi = indexMap.get(b.name) ?? Infinity;
    return ai - bi;
  });
}

export default function CategoryPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const category = getCategoryById(id);
  const { toggle, isChecked, countChecked, checkAll, loaded } = useProgress();
  const friendship = useFriendships();
  const [viewMode, setViewMode] = useState<ViewMode>("grouped");
  const [hideCompleted, setHideCompleted] = useState(false);

  const isFriendships = id === "friendships";
  const hasCollectionOrder = !!category?.collectionOrder;

  if (!category) {
    router.push("/");
    return null;
  }

  const { query, setQuery, filtered } = useSearch(category.items);

  // Sort items by collection order when in collection mode, then apply hide-completed filter
  const displayItems = useMemo(() => {
    let items = filtered;
    if (viewMode === "collection" && category.collectionOrder) {
      items = sortByCollectionOrder(items, category.collectionOrder);
    }
    if (hideCompleted) {
      if (isFriendships) {
        items = items.filter((i) => {
          const datable = villagerMeta[i.id]?.datable ?? false;
          return !friendship.isMaxed(i.id, datable);
        });
      } else {
        items = items.filter((i) => !isChecked(i.id));
      }
    }
    return items;
  }, [filtered, viewMode, category.collectionOrder, hideCompleted, isFriendships, isChecked, friendship]);

  // Progress counting
  let checked: number;
  const total = category.items.length;

  if (isFriendships) {
    const meta = category.items.map((i) => ({
      id: i.id,
      datable: villagerMeta[i.id]?.datable ?? false,
    }));
    checked = friendship.countMaxed(meta);
  } else {
    const allIds = category.items.map((i) => i.id);
    checked = countChecked(allIds);
  }

  // Group items by subcategory
  const subcategories = new Map<string, typeof displayItems>();
  for (const item of displayItems) {
    const sub = item.subcategory || "Items";
    if (!subcategories.has(sub)) subcategories.set(sub, []);
    subcategories.get(sub)!.push(item);
  }

  const subcatKeys = Array.from(subcategories.keys());
  const hasSubcategories = !(subcatKeys.length === 1 && subcatKeys[0] === "Items");
  const showGrouped = viewMode === "grouped" && hasSubcategories;

  if (!loaded || !friendship.loaded) return null;

  function renderItem(item: (typeof displayItems)[0]) {
    if (isFriendships) {
      const meta = villagerMeta[item.id];
      return (
        <VillagerCard
          key={item.id}
          id={item.id}
          name={item.name}
          image={item.image}
          datable={meta?.datable ?? false}
          villager={friendship.getVillager(item.id)}
          onSetHearts={friendship.setHearts}
          onSetStatus={friendship.setStatus}
        />
      );
    }
    return (
      <ChecklistItem
        key={item.id}
        id={item.id}
        name={item.name}
        checked={isChecked(item.id)}
        onToggle={toggle}
        image={item.image}
        detail={item.detail}
      />
    );
  }

  return (
    <>
      <Header title={category.name} description={category.description} icon={category.icon} />

      <div className={styles.progressSection}>
        <ProgressBar value={checked} max={total} />
      </div>

      <div className={styles.toolbar}>
        <SearchBar value={query} onChange={setQuery} />
        {hasCollectionOrder && hasSubcategories && (
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewBtn} ${viewMode === "grouped" ? styles.viewActive : ""}`}
              onClick={() => setViewMode("grouped")}
            >
              Grouped
            </button>
            <button
              className={`${styles.viewBtn} ${viewMode === "collection" ? styles.viewActive : ""}`}
              onClick={() => setViewMode("collection")}
            >
              Collection
            </button>
          </div>
        )}
        {!isFriendships && !showGrouped && displayItems.length > 0 && (
          <button
            className={`${styles.completeAllBtn} ${checked === total ? styles.completeAllUndo : ""}`}
            onClick={() => checkAll(displayItems.map((i) => i.id))}
          >
            {checked === total ? "Uncheck All" : "Complete All"}
          </button>
        )}
        <button
          className={`${styles.viewBtn} ${hideCompleted ? styles.viewActive : ""}`}
          onClick={() => setHideCompleted((h) => !h)}
        >
          Hide Completed
        </button>
      </div>

      {displayItems.length === 0 ? (
        <p className={styles.empty}>No items match your search.</p>
      ) : !showGrouped ? (
        <div className={isFriendships ? styles.villagerGrid : styles.flatList}>
          {displayItems.map(renderItem)}
        </div>
      ) : (
        <Accordion.Root
          type="multiple"
          defaultValue={subcatKeys}
          className={styles.accordion}
        >
          {subcatKeys.map((sub) => {
            const items = subcategories.get(sub)!;
            let subChecked: number;
            if (isFriendships) {
              const meta = items.map((i) => ({
                id: i.id,
                datable: villagerMeta[i.id]?.datable ?? false,
              }));
              subChecked = friendship.countMaxed(meta);
            } else {
              subChecked = items.filter((i) => isChecked(i.id)).length;
            }
            const allDone = !isFriendships && subChecked === items.length;
            return (
              <Accordion.Item key={sub} value={sub} className={styles.accordionItem}>
                <div className={styles.accordionHeader}>
                  <Accordion.Header className={styles.accordionHeaderInner}>
                    <Accordion.Trigger className={styles.accordionTrigger}>
                      <span className={styles.subName}>{sub}</span>
                      <span className={styles.subCount}>
                        {subChecked}/{items.length}
                      </span>
                      <svg
                        className={styles.chevron}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M4 6l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  {!isFriendships && (
                    <button
                      className={`${styles.completeAllBtn} ${allDone ? styles.completeAllUndo : ""}`}
                      onClick={() => checkAll(items.map((i) => i.id))}
                    >
                      {allDone ? "Uncheck All" : "Complete All"}
                    </button>
                  )}
                </div>
                <Accordion.Content className={styles.accordionContent}>
                  <div className={isFriendships ? styles.villagerGrid : styles.itemList}>
                    {items.map(renderItem)}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
      )}
    </>
  );
}
