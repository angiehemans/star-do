"use client";

import { useRef } from "react";
import { categories } from "@/data";
import { villagerMeta } from "@/data/friendships";
import { useProgress } from "@/hooks/useProgress";
import { useFriendships } from "@/hooks/useFriendships";
import { Header } from "@/components/Header/Header";
import { ProgressBar } from "@/components/ProgressBar/ProgressBar";
import { CategoryCard } from "@/components/CategoryCard/CategoryCard";
import styles from "./page.module.css";

export default function Dashboard() {
  const progress = useProgress();
  const { countChecked, loaded } = progress;
  const friendship = useFriendships();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function getCatChecked(cat: (typeof categories)[0]): number {
    if (cat.id === "friendships") {
      const meta = cat.items.map((i) => ({
        id: i.id,
        datable: villagerMeta[i.id]?.datable ?? false,
      }));
      return friendship.countMaxed(meta);
    }
    return countChecked(cat.items.map((i) => i.id));
  }

  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
  const totalChecked = categories.reduce((sum, cat) => sum + getCatChecked(cat), 0);

  function handleExport() {
    const data = {
      progress: JSON.parse(progress.exportData()),
      friendships: JSON.parse(friendship.exportData()),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `star-do-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        if (data.progress) progress.importData(JSON.stringify(data.progress));
        if (data.friendships) friendship.importData(JSON.stringify(data.friendships));
        alert("Progress restored successfully!");
      } catch {
        alert("Invalid backup file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  if (!loaded || !friendship.loaded) return null;

  return (
    <>
      <Header
        title="Dashboard"
        description="Track your Stardew Valley completion progress"
      />

      <div className={styles.overall}>
        <h2 className={styles.overallLabel}>Overall Progress</h2>
        <ProgressBar value={totalChecked} max={totalItems} />
      </div>

      <div className={styles.grid}>
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            id={cat.id}
            name={cat.name}
            icon={cat.icon}
            description={cat.description}
            checked={getCatChecked(cat)}
            total={cat.items.length}
          />
        ))}
      </div>

      <div className={styles.backupSection}>
        <h2 className={styles.overallLabel}>Backup &amp; Restore</h2>
        <p className={styles.backupDesc}>
          Download your progress as a JSON file or restore from a previous backup.
        </p>
        <div className={styles.backupButtons}>
          <button className={styles.backupBtn} onClick={handleExport}>
            Download Backup
          </button>
          <button className={styles.backupBtn} onClick={() => fileInputRef.current?.click()}>
            Restore Backup
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            hidden
          />
        </div>
      </div>
    </>
  );
}
