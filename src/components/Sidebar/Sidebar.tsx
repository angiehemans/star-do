"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/data";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import styles from "./Sidebar.module.css";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className={styles.sidebar}>
      <div className={styles.logoRow}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/special-powers/masteries.png"
            alt="star-do"
            width={28}
            height={28}
            className={styles.logoIcon}
            unoptimized
          />
          <span className={styles.logoText}>star-do</span>
        </Link>
        <ThemeToggle />
      </div>
      <ul className={styles.nav}>
        <li>
          <Link
            href="/"
            className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}
          >
            <Image
              src="/images/misc/statue-of-true-perfection.png"
              alt="Dashboard"
              width={20}
              height={20}
              className={styles.linkIcon}
              unoptimized
            />
            Dashboard
          </Link>
        </li>
        {categories.map((cat) => (
          <li key={cat.id}>
            <Link
              href={`/category/${cat.id}`}
              className={`${styles.link} ${
                pathname === `/category/${cat.id}` ? styles.active : ""
              }`}
            >
              <Image
                src={cat.icon}
                alt={cat.name}
                width={20}
                height={20}
                className={styles.linkIcon}
                unoptimized
              />
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
