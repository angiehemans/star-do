"use client";

import Image from "next/image";
import { RelationshipStatus, VillagerData } from "@/types";
import { getMaxHearts } from "@/hooks/useFriendships";
import { wikiUrl } from "@/utils/wikiUrl";
import styles from "./VillagerCard.module.css";

type Props = {
  id: string;
  name: string;
  image?: string;
  datable: boolean;
  villager: VillagerData;
  onSetHearts: (id: string, hearts: number) => void;
  onSetStatus: (id: string, status: RelationshipStatus) => void;
};

const STATUS_LABELS: { value: RelationshipStatus; label: string }[] = [
  { value: "single", label: "Single" },
  { value: "dating", label: "Dating" },
  { value: "married", label: "Married" },
];

export function VillagerCard({
  id,
  name,
  image,
  datable,
  villager,
  onSetHearts,
  onSetStatus,
}: Props) {
  const maxHearts = getMaxHearts(datable, villager.status);
  const isMaxed = villager.hearts >= maxHearts;

  function handleHeartClick(index: number) {
    // Clicking the current heart count toggles it off (set to index),
    // clicking a higher heart sets to that value
    if (villager.hearts === index + 1) {
      onSetHearts(id, index);
    } else {
      onSetHearts(id, index + 1);
    }
  }

  return (
    <div className={`${styles.card} ${isMaxed ? styles.maxed : ""}`}>
      <div className={styles.top}>
        {image && (
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
            className={styles.portrait}
            unoptimized
          />
        )}
        <div className={styles.info}>
          <span className={styles.name}>{name}</span>
          <a
            href={wikiUrl(name)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.wikiLink}
            title={`${name} on Stardew Valley Wiki`}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8.667v4A1.333 1.333 0 0 1 10.667 14H3.333A1.333 1.333 0 0 1 2 12.667V5.333A1.333 1.333 0 0 1 3.333 4h4" />
              <path d="M10 2h4v4" />
              <path d="M6.667 9.333 14 2" />
            </svg>
          </a>
          <span className={styles.heartCount}>
            {villager.hearts}/{maxHearts}
          </span>
        </div>
      </div>
      <div className={styles.hearts}>
        {Array.from({ length: maxHearts }, (_, i) => (
          <button
            key={i}
            className={`${styles.heart} ${i < villager.hearts ? styles.filled : ""}`}
            onClick={() => handleHeartClick(i)}
            aria-label={`Set ${i + 1} hearts`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 14s-5.5-3.5-5.5-7.5C2.5 4 4 2.5 5.5 2.5c1 0 2 .5 2.5 1.5.5-1 1.5-1.5 2.5-1.5C12 2.5 13.5 4 13.5 6.5 13.5 10.5 8 14 8 14z" />
            </svg>
          </button>
        ))}
      </div>
      {datable && (
        <div className={styles.statusRow}>
          {STATUS_LABELS.map(({ value, label }) => (
            <button
              key={value}
              className={`${styles.statusBtn} ${villager.status === value ? styles.statusActive : ""}`}
              onClick={() => onSetStatus(id, value)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
