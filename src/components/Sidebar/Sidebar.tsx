"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/data";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import styles from "./Sidebar.module.css";

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        className={styles.hamburger}
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)} />
      )}

      <nav className={`${styles.sidebar} ${open ? styles.sidebarOpen : ""}`}>
        <div className={styles.logoRow}>
          <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
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
              onClick={() => setOpen(false)}
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
                onClick={() => setOpen(false)}
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
    </>
  );
}
