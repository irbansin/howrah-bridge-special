"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { menuItems, MenuItem } from "../data/menuItems";
import { MenuCard } from "../components/MenuCard";
import { ItemModal } from "../components/ItemModal";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pick 3 featured items to display on the landing page
  const featuredItems = menuItems.filter((item) =>
    ["egg-roll", "gt-burger", "sandesh-cheesecake"].includes(item.id)
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
            alt="Delicious Kolkata rolls and burgers under the glowing Howrah Bridge"
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
            <span>Kolkata Street-Food & Fusion Classics</span>
          </div>
          
          <h1 className={styles.heroTitle}>
            Where Heritage Meets <span>Fast Food</span>
          </h1>
          
          <p className={styles.heroText}>
            Experience a culinary bridge. Authentically layered Kolkata Kathi rolls and Tangra street wok noodles fused with gourmet spiced burgers and signature lime coolers.
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
          <span className={styles.sectionBadge}>Our Signature Methods</span>
          <h2 className={styles.sectionTitle}>The Bridge Special Secret</h2>
          <p className={styles.sectionSubtitle}>
            We construct every meal with high-quality ingredients using traditional charcoal and wok techniques.
          </p>
        </div>

        <div className={styles.benefitsGrid}>
          {/* Benefit 1 */}
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
            </div>
            <h3 className={styles.benefitTitle}>Hand-Rolled Parathas</h3>
            <p className={styles.benefitText}>
              Every Kathi roll uses layered parathas stretched and griddled on-site for flaky perfection.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            </div>
            <h3 className={styles.benefitTitle}>Charcoal Tandoor</h3>
            <p className={styles.benefitText}>
              Succulent chicken tikka and paneer cubes are marinated overnight and charred in a clay oven.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"></polygon></svg>
            </div>
            <h3 className={styles.benefitTitle}>Tangra Wok Heritage</h3>
            <p className={styles.benefitText}>
              Our street-style noodles are tossed at blistering temperatures in heavy carbon-steel woks.
            </p>
          </div>

          {/* Benefit 4 */}
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <h3 className={styles.benefitTitle}>Gondhoraj Zest</h3>
            <p className={styles.benefitText}>
              We source fragrant, thick-skinned Gondhoraj limes straight from Bengal for our signature juices.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED DISHES */}
      <section style={{ backgroundColor: "#0b0b0f", padding: "100px 0" }}>
        <div className={`${styles.section} container`} style={{ padding: 0 }}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Popular Orders</span>
            <h2 className={styles.sectionTitle}>Featured Culinary Delights</h2>
            <p className={styles.sectionSubtitle}>
              Customer-voted crowd favorites that highlight the unique tastes of our fusion kitchen.
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
          <span className={styles.sectionBadge}>Reviews</span>
          <h2 className={styles.sectionTitle}>What Foodies Say</h2>
          <p className={styles.sectionSubtitle}>
            Honest feedback from local food critics and customers alike.
          </p>
        </div>

        <div className={styles.reviewsGrid}>
          {/* Review 1 */}
          <div className={styles.reviewCard}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"></polygon></svg>
              ))}
            </div>
            <p className={styles.reviewQuote}>
              &quot;The chicken Kathi roll here is a revelation. Flaky paratha griddled beautifully, tandoori spices are spot-on. Tastes exactly like the iconic street spots in Gariahat, Kolkata!&quot;
            </p>
            <div className={styles.reviewer}>
              <div className={styles.reviewerAvatar}>AM</div>
              <div className={styles.reviewerInfo}>
                <h4>Ananya Mukherjee</h4>
                <span>Food Blogger</span>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className={styles.reviewCard}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"></polygon></svg>
              ))}
            </div>
            <p className={styles.reviewQuote}>
              &quot;G.T. Road Lamb Burger is a masterpiece of spice blending. The garam-masala lamb patty fits the brioche perfectly. Sriracha fries are incredibly crunchy and addicting!&quot;
            </p>
            <div className={styles.reviewer}>
              <div className={styles.reviewerAvatar}>VK</div>
              <div className={styles.reviewerInfo}>
                <h4>Vikram Kapoor</h4>
                <span>Google Reviewer</span>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className={styles.reviewCard}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"></polygon></svg>
              ))}
            </div>
            <p className={styles.reviewQuote}>
              &quot;Don&apos;t leave without ordering the Baked Saffron Sandesh Cheesecake. Mixing cardamom and local chhena into a rich New York style dessert is genius. 10/10!&quot;
            </p>
            <div className={styles.reviewer}>
              <div className={styles.reviewerAvatar}>SS</div>
              <div className={styles.reviewerInfo}>
                <h4>Suhail Sen</h4>
                <span>Culinary Critic</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="container" style={{ paddingBottom: 100 }}>
        <div className={styles.ctaBanner}>
          <h2 className={styles.ctaTitle}>Hungry for Heritage?</h2>
          <p className={styles.ctaText}>
            Browse our full fusion menu, customize your spice levels, and order your fresh roll or wok noodles today.
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
