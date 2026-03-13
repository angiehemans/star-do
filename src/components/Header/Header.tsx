"use client";

import Image from "next/image";
import styles from "./Header.module.css";

type Props = {
  title: string;
  description?: string;
  icon?: string;
  children?: React.ReactNode;
};

export function Header({ title, description, icon, children }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.text}>
        <h1 className={styles.title}>
          {icon && (
            <Image
              src={icon}
              alt=""
              width={32}
              height={32}
              className={styles.titleIcon}
              unoptimized
            />
          )}
          {title}
        </h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {children && <div className={styles.actions}>{children}</div>}
    </header>
  );
}
