"use client";

import { useState, useMemo } from "react";
import { ChecklistEntry } from "@/types";

export function useSearch(items: ChecklistEntry[]) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const lower = query.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(lower) ||
        item.subcategory?.toLowerCase().includes(lower)
    );
  }, [items, query]);

  return { query, setQuery, filtered };
}
