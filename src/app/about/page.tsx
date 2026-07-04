import React from "react";
import Image from "next/image";
import styles from "../../styles/About.module.css";
import aboutContent from "../../data/aboutContent.json";

export default function About() {
  return (
    <div className={`${styles.aboutPage} container`}>
      {/* Page Header */}
      <div className={styles.header}>
        <h1>{aboutContent.header.title}</h1>
        <p>{aboutContent.header.description}</p>
      </div>

      {/* Origin Story Grid */}
      <section className={styles.storyGrid}>
        <div className={styles.storyContent}>
          <h2>{aboutContent.story.title}</h2>
          {aboutContent.story.paragraphs.map((p, idx) => (
            <p key={idx} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
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
          &quot;{aboutContent.quote.text}&quot;
        </p>
        <span className={styles.quoteAuthor}>&mdash; {aboutContent.quote.author}</span>
      </div>

      {/* Core Pillars */}
      <div className={styles.header} style={{ marginBottom: 50 }}>
        <h2>{aboutContent.pillarsSection.title}</h2>
        <p>{aboutContent.pillarsSection.subtitle}</p>
      </div>

      <section className={styles.philGrid}>
        {aboutContent.pillarsSection.items.map((pillar) => (
          <div key={pillar.number} className={styles.philCard}>
            <div className={styles.philNumber}>{pillar.number}</div>
            <h3 className={styles.philTitle}>{pillar.title}</h3>
            <p className={styles.philText}>{pillar.text}</p>
          </div>
        ))}
      </section>

      {/* Team Section */}
      <section className={styles.teamSection}>
        <h2>{aboutContent.teamSection.title}</h2>
        <p className={styles.teamSubtitle}>{aboutContent.teamSection.subtitle}</p>

        <div className={styles.teamGrid}>
          {aboutContent.teamSection.members.map((member, idx) => (
            <div key={idx} className={styles.teamCard}>
              <div className={styles.teamVisual} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--primary-gold)" strokeWidth="1" opacity="0.6">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className={styles.teamInfo}>
                <h3 className={styles.teamName}>{member.name}</h3>
                <span className={styles.teamRole}>{member.role}</span>
                <p className={styles.teamDesc}>{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
