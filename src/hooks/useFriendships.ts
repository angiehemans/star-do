"use client";

import { useState, useEffect, useCallback } from "react";
import { FriendshipData, VillagerData, RelationshipStatus } from "@/types";

const STORAGE_KEY = "star-do-friendships";

const DEFAULT_VILLAGER: VillagerData = { hearts: 0, status: "single" };

function load(): FriendshipData {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function save(data: FriendshipData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage full or unavailable
  }
}

export function getMaxHearts(datable: boolean, status: RelationshipStatus): number {
  if (datable && status === "married") return 14;
  return 10;
}

export function useFriendships() {
  const [data, setData] = useState<FriendshipData>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setData(load());
    setLoaded(true);
  }, []);

  const getVillager = useCallback(
    (id: string): VillagerData => data[id] || DEFAULT_VILLAGER,
    [data]
  );

  const setHearts = useCallback((id: string, hearts: number) => {
    setData((prev) => {
      const current = prev[id] || DEFAULT_VILLAGER;
      const next = { ...prev, [id]: { ...current, hearts } };
      save(next);
      return next;
    });
  }, []);

  const setStatus = useCallback((id: string, status: RelationshipStatus) => {
    setData((prev) => {
      const current = prev[id] || DEFAULT_VILLAGER;
      const maxHearts = getMaxHearts(true, status);
      const hearts = Math.min(current.hearts, maxHearts);
      const next = { ...prev, [id]: { ...current, status, hearts } };
      save(next);
      return next;
    });
  }, []);

  const isMaxed = useCallback(
    (id: string, datable: boolean): boolean => {
      const v = data[id] || DEFAULT_VILLAGER;
      return v.hearts >= getMaxHearts(datable, v.status);
    },
    [data]
  );

  const countMaxed = useCallback(
    (ids: { id: string; datable: boolean }[]): number =>
      ids.filter(({ id, datable }) => isMaxed(id, datable)).length,
    [isMaxed]
  );

  const exportData = useCallback(() => {
    return JSON.stringify(data, null, 2);
  }, [data]);

  const importData = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json);
      setData(parsed);
      save(parsed);
      return true;
    } catch {
      return false;
    }
  }, []);

  return { loaded, getVillager, setHearts, setStatus, isMaxed, countMaxed, exportData, importData };
}
