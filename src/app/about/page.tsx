import React from "react";
import Image from "next/image";
import styles from "../../styles/About.module.css";

export default function About() {
  return (
    <div className={`${styles.aboutPage} container`}>
      {/* Page Header */}
      <div className={styles.header}>
        <h1>Our Story</h1>
        <p>
          Bridging the authentic, raw, and vibrant flavors of Kolkata street lanes with high-quality, modern fast-food dining.
        </p>
      </div>

      {/* Origin Story Grid */}
      <section className={styles.storyGrid}>
        <div className={styles.storyContent}>
          <h2>A Bridge Over Flavors</h2>
          <p>
            Founded in 2024 by two childhood friends from North Kolkata, <span>Kolkata-Howrah Bridge Special</span> was born out of a simple longing: to find an authentic, layered Kathi roll that carried the real charcoal smoke and tang of the street side.
          </p>
          <p>
            Named after the iconic cantilever Kolkata-Howrah Bridge that spans the Hooghly River, our joint serves as a culinary link. We connect traditional street griddling, roaring Indo-Chinese wok techniques, and clay tandoor bakes with modern brioche burger formats and crisp fries.
          </p>
          <p>
            We don&apos;t compromise on heritage. Our parathas are stretched on heavy iron tawas, our spice blends are hand-pounded weekly, and our Gondhoraj limes are shipped straight from Bengal to give that fragrant citrus punch you won&apos;t find anywhere else.
          </p>
        </div>

        {/* Visual Showcase */}
        <div className={styles.storyVisual}>
          <Image
            src="/images/hero.png"
            alt="Inside Kolkata-Howrah Bridge Special Kitchen"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
      </section>

      {/* Quote Panel */}
      <div className={styles.quotePanel}>
        <p className={styles.quoteText}>
          &quot;Food in Kolkata is not just sustenance; it is a conversation, an emotion, and a legacy. We wanted to build a bridge that carries that legacy forward.&quot;
        </p>
        <span className={styles.quoteAuthor}>&mdash; Joydeep & Amit, Founders</span>
      </div>

      {/* Core Pillars */}
      <div className={styles.header} style={{ marginBottom: 50 }}>
        <h2>Our Three Pillars</h2>
        <p>What makes our kitchen distinct and our menu special.</p>
      </div>

      <section className={styles.philGrid}>
        {/* Pillar 1 */}
        <div className={styles.philCard}>
          <div className={styles.philNumber}>01</div>
          <h3 className={styles.philTitle}>No Shortcuts</h3>
          <p className={styles.philText}>
            We never use pre-packaged doughs or liquid smoke. Everything from our green chutneys to our paneer and chicken marinates is prepared from scratch daily in our kitchen.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className={styles.philCard}>
          <div className={styles.philNumber}>02</div>
          <h3 className={styles.philTitle}>Clay Tandoors</h3>
          <p className={styles.philText}>
            Our meats and cheeses are griddled only after a deep char in our high-temperature clay tandoors, fueled by real hardwood charcoal for that signature smoky depth.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className={styles.philCard}>
          <div className={styles.philNumber}>03</div>
          <h3 className={styles.philTitle}>Gondhoraj Citrus Sourcing</h3>
          <p className={styles.philText}>
            Traditional limeades use standard key limes. We import Bengal&apos;s native Gondhoraj limes, famous for their thick rinds and unmatched floral fragrance, for all beverages.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.teamSection}>
        <h2>Our Culinary Masters</h2>
        <p className={styles.teamSubtitle}>Meet the skilled hands and experienced palates behind our popular specialties.</p>

        <div className={styles.teamGrid}>
          {/* Chef 1 */}
          <div className={styles.teamCard}>
            <div className={styles.teamVisual} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--primary-gold)" strokeWidth="1" opacity="0.6">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className={styles.teamInfo}>
              <h3 className={styles.teamName}>Chef Biswajit Das</h3>
              <span className={styles.teamRole}>Head Chef & Tandoor Specialist</span>
              <p className={styles.teamDesc}>
                Over 18 years of experience griddling parathas and grilling skewered meats in Kolkata&apos;s historic Park Street cabinets.
              </p>
            </div>
          </div>

          {/* Chef 2 */}
          <div className={styles.teamCard}>
            <div className={styles.teamVisual} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--primary-gold)" strokeWidth="1" opacity="0.6">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className={styles.teamInfo}>
              <h3 className={styles.teamName}>Arindam Sinha</h3>
              <span className={styles.teamRole}>Co-Founder & Wok Master</span>
              <p className={styles.teamDesc}>
                Trained in Kolkata&apos;s Tangra Chinatown district, specializing in roaring wok mechanics and dark-soy street Hakka noodle seasoning.
              </p>
            </div>
          </div>

          {/* Chef 3 */}
          <div className={styles.teamCard}>
            <div className={styles.teamVisual} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--primary-gold)" strokeWidth="1" opacity="0.6">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className={styles.teamInfo}>
              <h3 className={styles.teamName}>Joydeep Dey</h3>
              <span className={styles.teamRole}>Co-Founder & Beverage Innovator</span>
              <p className={styles.teamDesc}>
                Oversees sourcing fresh mint, Gondhoraj limes, and spices. Architect of the Baked Saffron Sandesh Cheesecake.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
