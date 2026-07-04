"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/Footer.module.css";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simulate API call
    setSubmitted(true);
    setEmail("");
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <footer className={styles.footer}>
      <div className={`${styles.grid} container`}>
        {/* Brand Information */}
        <div className={styles.brandColumn}>
          <h3>Kolkata-Howrah Bridge Special</h3>
          <p>
            Bringing the rich street-food heritage of Kolkata to a modern fusion dining experience.
            Savor Kathi Rolls, Gourmet Burgers, and authentic Tangra Chinese.
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialLink} aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.column}>
          <h4>Explore</h4>
          <ul className={styles.links}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/menu">Menu</Link></li>
            <li><Link href="/about">Our Story</Link></li>
            <li><Link href="/contact">Contact & Support</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className={styles.column}>
          <h4>Contact Us</h4>
          <ul className={styles.contactInfo}>
            <li>
              <svg className={styles.contactIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>Kolkata-Howrah Bridge Approach, Kolkata, WB 700001</span>
            </li>
            <li>
              <svg className={styles.contactIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span>+91 33 2262 0000</span>
            </li>
            <li>
              <svg className={styles.contactIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span>info@kolkata-howrahbridgespecial.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className={styles.column}>
          <h4>Stay Updated</h4>
          <p className={styles.newsletterDesc}>
            Subscribe to get notifications about weekly food specials, recipe secrets, and exciting events.
          </p>
          <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email address"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address for newsletter"
            />
            <button type="submit" className={styles.newsletterBtn} aria-label="Subscribe">
              {submitted ? "Subscribed!" : "Join"}
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className={`${styles.bottom} container`}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Kolkata-Howrah Bridge Special. All rights reserved.
        </p>
        <p className={styles.copyright}>
          Designed for excellence by <a href="https://github.com/irbansin">Anirban Sinha</a>.
        </p>
      </div>
    </footer>
  );
};
