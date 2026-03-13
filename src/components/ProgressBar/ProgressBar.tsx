"use client";

import * as Progress from "@radix-ui/react-progress";
import styles from "./ProgressBar.module.css";

type Props = {
  value: number;
  max: number;
  showLabel?: boolean;
  size?: "sm" | "md";
};

export function ProgressBar({ value, max, showLabel = true, size = "md" }: Props) {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className={styles.wrapper}>
      <Progress.Root
        className={`${styles.root} ${styles[size]}`}
        value={percentage}
        max={100}
      >
        <Progress.Indicator
          className={styles.indicator}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </Progress.Root>
      {showLabel && (
        <span className={styles.label}>
          {value}/{max} ({percentage}%)
        </span>
      )}
    </div>
  );
}
