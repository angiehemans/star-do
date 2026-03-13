import Image from "next/image";
import Link from "next/link";
import { ProgressBar } from "@/components/ProgressBar/ProgressBar";
import styles from "./CategoryCard.module.css";

type Props = {
  id: string;
  name: string;
  icon: string;
  description: string;
  checked: number;
  total: number;
};

export function CategoryCard({ id, name, icon, description, checked, total }: Props) {
  const complete = checked === total && total > 0;

  return (
    <Link href={`/category/${id}`} className={`${styles.card} ${complete ? styles.complete : ""}`}>
      <div className={styles.header}>
        <Image
          src={icon}
          alt={name}
          width={28}
          height={28}
          className={styles.icon}
          unoptimized
        />
        <h3 className={styles.name}>{name}</h3>
      </div>
      <p className={styles.description}>{description}</p>
      <ProgressBar value={checked} max={total} size="sm" />
    </Link>
  );
}
