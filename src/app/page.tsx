"use client";

import { useRef } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { categories } from "@/data";
import { villagerMeta } from "@/data/friendships";
import { useProgress } from "@/hooks/useProgress";
import { useFriendships } from "@/hooks/useFriendships";
import { getMaxHearts } from "@/hooks/useFriendships";
import { Header } from "@/components/Header/Header";
import { ProgressBar } from "@/components/ProgressBar/ProgressBar";
import { CategoryCard } from "@/components/CategoryCard/CategoryCard";
import styles from "./page.module.css";

const PERFECTION_ITEMS = [
  { id: "perfection-obelisk-earth", name: "Earth Obelisk" },
  { id: "perfection-obelisk-water", name: "Water Obelisk" },
  { id: "perfection-obelisk-desert", name: "Desert Obelisk" },
  { id: "perfection-obelisk-island", name: "Island Obelisk" },
  { id: "perfection-golden-clock", name: "Golden Clock" },
];

const OBELISK_IDS = PERFECTION_ITEMS.filter((i) => i.id.includes("obelisk")).map((i) => i.id);
const GOLDEN_CLOCK_ID = "perfection-golden-clock";

function getCat(id: string) {
  return categories.find((c) => c.id === id);
}

export default function Dashboard() {
  const progress = useProgress();
  const { countChecked, isChecked, toggle, loaded } = progress;
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

  // Perfection calculation
  function catPercent(id: string): number {
    const cat = getCat(id);
    if (!cat) return 0;
    if (id === "friendships") {
      // Great Friends: percentage of hearts earned vs max possible
      let totalHearts = 0;
      let maxHearts = 0;
      for (const item of cat.items) {
        const meta = villagerMeta[item.id];
        const datable = meta?.datable ?? false;
        const v = friendship.getVillager(item.id);
        const max = getMaxHearts(datable, v.status);
        totalHearts += v.hearts;
        maxHearts += max;
      }
      return maxHearts > 0 ? totalHearts / maxHearts : 0;
    }
    const checked = countChecked(cat.items.map((i) => i.id));
    return cat.items.length > 0 ? checked / cat.items.length : 0;
  }

  function catCounts(id: string): { checked: number; total: number } {
    const cat = getCat(id);
    if (!cat) return { checked: 0, total: 0 };
    return { checked: countChecked(cat.items.map((i) => i.id)), total: cat.items.length };
  }

  function calcPerfection(): { total: number; breakdown: { label: string; checked: number; total: number }[] } {
    const shippingC = catCounts("shipping");
    const shippingPts = (shippingC.total > 0 ? shippingC.checked / shippingC.total : 0) * 15;

    const obeliskChecked = countChecked(OBELISK_IDS);
    const obeliskPts = obeliskChecked;

    const clockChecked = isChecked(GOLDEN_CLOCK_ID) ? 1 : 0;
    const clockPts = clockChecked * 10;

    // Monster Slayer: only the 12 eradication goals
    const monsterCat = getCat("monsters");
    const eradicationIds = monsterCat ? monsterCat.items.slice(0, 12).map((i) => i.id) : [];
    const monsterChecked = countChecked(eradicationIds);
    const monsterPts = (monsterChecked / 12) * 10;

    // Great Friends: hearts earned vs max possible
    const friendCat = getCat("friendships");
    let friendHearts = 0;
    let friendMaxHearts = 0;
    if (friendCat) {
      for (const item of friendCat.items) {
        const meta = villagerMeta[item.id];
        const datable = meta?.datable ?? false;
        const v = friendship.getVillager(item.id);
        const max = getMaxHearts(datable, v.status);
        friendHearts += v.hearts;
        friendMaxHearts += max;
      }
    }
    const friendPts = friendMaxHearts > 0 ? (friendHearts / friendMaxHearts) * 11 : 0;

    // Farmer level: first 5 items in skills
    const skillsCat = getCat("skills");
    const skillLevelIds = skillsCat ? skillsCat.items.slice(0, 5).map((i) => i.id) : [];
    const skillChecked = countChecked(skillLevelIds);
    const skillPts = skillChecked;

    const stardropsCat = getCat("stardrops");
    const stardropIds = stardropsCat ? stardropsCat.items.map((i) => i.id) : [];
    const stardropChecked = countChecked(stardropIds);
    const stardropTotal = stardropsCat ? stardropsCat.items.length : 0;
    const stardropPts = stardropTotal > 0 ? (stardropChecked / stardropTotal) * 10 : 0;

    const cookingC = catCounts("cooking");
    const cookingPts = (cookingC.total > 0 ? cookingC.checked / cookingC.total : 0) * 10;

    const craftingC = catCounts("crafting");
    const craftingPts = (craftingC.total > 0 ? craftingC.checked / craftingC.total : 0) * 10;

    const fishingC = catCounts("fishing");
    const fishingPts = (fishingC.total > 0 ? fishingC.checked / fishingC.total : 0) * 10;

    // Golden Walnuts: parse count from each item name, e.g. "Volcano chest (5)" = 5 walnuts
    const walnutCat = getCat("walnuts");
    let walnutsFound = 0;
    if (walnutCat) {
      for (const item of walnutCat.items) {
        if (isChecked(item.id)) {
          const match = item.name.match(/\((\d+)\)/);
          walnutsFound += match ? parseInt(match[1], 10) : 1;
        }
      }
    }
    const walnutPts = (walnutsFound / 130) * 5;

    const total = shippingPts + obeliskPts + clockPts + monsterPts + friendPts + skillPts + stardropPts + cookingPts + craftingPts + fishingPts + walnutPts;

    const breakdown = [
      { label: "Shipping", checked: shippingC.checked, total: shippingC.total },
      { label: "Obelisks", checked: obeliskChecked, total: 4 },
      { label: "Golden Clock", checked: clockChecked, total: 1 },
      { label: "Monster Slayer", checked: monsterChecked, total: 12 },
      { label: "Great Friends", checked: friendHearts, total: friendMaxHearts },
      { label: "Farmer Level", checked: skillChecked, total: 5 },
      { label: "Stardrops", checked: stardropChecked, total: stardropTotal },
      { label: "Cooking", checked: cookingC.checked, total: cookingC.total },
      { label: "Crafting", checked: craftingC.checked, total: craftingC.total },
      { label: "Fishing", checked: fishingC.checked, total: fishingC.total },
      { label: "Golden Walnuts", checked: walnutsFound, total: 130 },
    ];

    return { total, breakdown };
  }

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

  const perfection = calcPerfection();
  const perfectionPercent = Math.round(perfection.total * 10) / 10;

  return (
    <>
      <Header
        title="Dashboard"
        description="Track your Stardew Valley completion progress"
      />

      <div className={styles.progressRow}>
        <div className={styles.overall}>
          <h2 className={styles.overallLabel}>Completionist</h2>
          <ProgressBar value={totalChecked} max={totalItems} />
        </div>
        <div className={styles.overall}>
          <h2 className={styles.overallLabel}>Perfection</h2>
          <ProgressBar value={Math.round(perfection.total)} max={100} />
        </div>
      </div>

      <details className={styles.perfectionDetails}>
        <summary className={styles.perfectionSummary}>
          Perfection Breakdown — {perfectionPercent}%
        </summary>
        <div className={styles.perfectionGrid}>
          {perfection.breakdown.map((row) => (
            <div key={row.label} className={styles.perfectionRow}>
              <span className={styles.perfectionLabel}>{row.label}</span>
              <span className={styles.perfectionValue}>
                {row.checked}/{row.total}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.perfectionChecks}>
          {PERFECTION_ITEMS.map((item) => (
            <label key={item.id} className={styles.perfectionCheck}>
              <Checkbox.Root
                className={styles.perfectionCheckbox}
                checked={isChecked(item.id)}
                onCheckedChange={() => toggle(item.id)}
              >
                <Checkbox.Indicator className={styles.perfectionIndicator}>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M11.5 3.5L5.5 10L2.5 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Checkbox.Indicator>
              </Checkbox.Root>
              <span>{item.name}</span>
            </label>
          ))}
        </div>
      </details>

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
