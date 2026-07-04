"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { menuItems, MenuItem } from "../data/menuItems";
import { MenuCard } from "../components/MenuCard";
import { ItemModal } from "../components/ItemModal";
import styles from "../styles/Home.module.css";
import homeContent from "../data/homeContent.json";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pick featured items to display on the landing page
  const featuredItems = menuItems.filter((item) =>
    homeContent.featured.featuredIds.includes(item.id)
  );

  const handleSelectItem = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300); // delay resetting for fade out
  };

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image
            src="/images/hero.png"
            alt="Delicious Kolkata food under the glowing Kolkata-Howrah Bridge"
            fill
            sizes="100vw"
            priority // Next.js triggers high fetch priority and preloading
          />
        </div>
        <div className={styles.heroOverlay}></div>

        <div className={`${styles.heroContent} container`}>
          <div className={styles.badge}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span>{homeContent.hero.badgeText}</span>
          </div>

          <h1 className={styles.heroTitle}>
            {homeContent.hero.titlePrefix}<span>{homeContent.hero.titleHighlighted}</span>
          </h1>

          <p className={styles.heroText}>
            {homeContent.hero.description}
          </p>

          <div className={styles.heroActions}>
            <Link href="/menu" className="btn-primary">
              Order Online
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
            <Link href="/about" className="btn-secondary">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SPECIALTIES / WHY CHOOSE US */}
      <section className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>{homeContent.benefits.sectionBadge}</span>
          <h2 className={styles.sectionTitle}>{homeContent.benefits.sectionTitle}</h2>
          <p className={styles.sectionSubtitle}>
            {homeContent.benefits.sectionSubtitle}
          </p>
        </div>

        <div className={styles.benefitsGrid}>
          {homeContent.benefits.items.map((benefit) => {
            const getIcon = (id: string) => {
              switch (id) {
                case "wok-heritage":
                  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"></polygon></svg>;
                case "crispy-starters":
                  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>;
                case "sunday-special":
                  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
                case "street-spices":
                  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
                default:
                  return null;
              }
            };

            return (
              <div key={benefit.id} className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  {getIcon(benefit.id)}
                </div>
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                <p className={styles.benefitText}>{benefit.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED DISHES */}
      <section style={{ backgroundColor: "#0b0b0f", padding: "100px 0" }}>
        <div className={`${styles.section} container`} style={{ padding: 0 }}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>{homeContent.featured.sectionBadge}</span>
            <h2 className={styles.sectionTitle}>{homeContent.featured.sectionTitle}</h2>
            <p className={styles.sectionSubtitle}>
              {homeContent.featured.sectionSubtitle}
            </p>
          </div>

          <div className={styles.featuredGrid}>
            {featuredItems.map((item) => (
              <MenuCard key={item.id} item={item} onSelect={handleSelectItem} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. REVIEWS */}
      <section className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>{homeContent.reviewsSection.sectionBadge}</span>
          <h2 className={styles.sectionTitle}>{homeContent.reviewsSection.sectionTitle}</h2>
          <p className={styles.sectionSubtitle}>
            {homeContent.reviewsSection.sectionSubtitle}
          </p>
        </div>

        <div className={styles.reviewsGrid}>
          {homeContent.reviewsSection.reviews.map((rev, idx) => (
            <div key={idx} className={styles.reviewCard}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"></polygon></svg>
                ))}
              </div>
              <p className={styles.reviewQuote}>
                &quot;{rev.quote}&quot;
              </p>
              <div className={styles.reviewer}>
                <div className={styles.reviewerAvatar}>{rev.avatar}</div>
                <div className={styles.reviewerInfo}>
                  <h4>{rev.author}</h4>
                  <span>{rev.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="container" style={{ paddingBottom: 100 }}>
        <div className={styles.ctaBanner}>
          <h2 className={styles.ctaTitle}>{homeContent.cta.title}</h2>
          <p className={styles.ctaText}>
            {homeContent.cta.text}
          </p>
          <Link href="/menu" className={`${styles.ctaBtn} btn-primary`}>
            Explore Full Menu
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </section>

      {/* Detail overlay dialog */}
      <ItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
