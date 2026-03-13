"use client";

import Image from "next/image";
import * as Checkbox from "@radix-ui/react-checkbox";
import { wikiUrl } from "@/utils/wikiUrl";
import styles from "./ChecklistItem.module.css";

type Props = {
  id: string;
  name: string;
  checked: boolean;
  onToggle: (id: string) => void;
  image?: string;
  detail?: string;
};

export function ChecklistItem({ id, name, checked, onToggle, image, detail }: Props) {
  return (
    <div className={`${styles.item} ${checked ? styles.checked : ""}`}>
      <label className={styles.label}>
        <Checkbox.Root
          className={styles.checkbox}
          checked={checked}
          onCheckedChange={() => onToggle(id)}
        >
          <Checkbox.Indicator className={styles.indicator}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
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
        {image && (
          <span className={styles.iconWrapper}>
            <Image
              src={image}
              alt={name}
              width={32}
              height={32}
              className={styles.icon}
              unoptimized
            />
          </span>
        )}
        <span className={styles.textGroup}>
          <span className={styles.name}>{name}</span>
          {detail && <span className={styles.detail}>{detail}</span>}
        </span>
      </label>
      <a
        href={wikiUrl(name)}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.wikiLink}
        title={`${name} on Stardew Valley Wiki`}
        onClick={(e) => e.stopPropagation()}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8.667v4A1.333 1.333 0 0 1 10.667 14H3.333A1.333 1.333 0 0 1 2 12.667V5.333A1.333 1.333 0 0 1 3.333 4h4" />
          <path d="M10 2h4v4" />
          <path d="M6.667 9.333 14 2" />
        </svg>
      </a>
    </div>
  );
}
