"use client";

import { useState, useEffect, useCallback } from "react";
import { ProgressData } from "@/types";

const STORAGE_KEY = "star-do-progress";

function loadProgress(): ProgressData {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveProgress(data: ProgressData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage full or unavailable
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setLoaded(true);
  }, []);

  const toggle = useCallback((itemId: string) => {
    setProgress((prev) => {
      const next = { ...prev, [itemId]: !prev[itemId] };
      if (!next[itemId]) delete next[itemId];
      saveProgress(next);
      return next;
    });
  }, []);

  const isChecked = useCallback(
    (itemId: string) => !!progress[itemId],
    [progress]
  );

  const countChecked = useCallback(
    (itemIds: string[]) => itemIds.filter((id) => progress[id]).length,
    [progress]
  );

  const checkAll = useCallback((itemIds: string[]) => {
    setProgress((prev) => {
      const next = { ...prev };
      const allChecked = itemIds.every((id) => next[id]);
      for (const id of itemIds) {
        if (allChecked) {
          delete next[id];
        } else {
          next[id] = true;
        }
      }
      saveProgress(next);
      return next;
    });
  }, []);

  const exportData = useCallback(() => {
    return JSON.stringify(progress, null, 2);
  }, [progress]);

  const importData = useCallback((json: string) => {
    try {
      const data = JSON.parse(json);
      setProgress(data);
      saveProgress(data);
      return true;
    } catch {
      return false;
    }
  }, []);

  return { progress, loaded, toggle, isChecked, countChecked, checkAll, exportData, importData };
}
