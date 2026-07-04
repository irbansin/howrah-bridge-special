import React from "react";
import { ContactForm } from "../../components/ContactForm";
import styles from "../../styles/Contact.module.css";

export default function Contact() {
  return (
    <div className={`${styles.contactPage} container`}>
      {/* Page Title */}
      <div className={styles.titleArea}>
        <h1>Get in Touch</h1>
        <p>
          We would love to hear from you! Drop by, call us to place a quick order, or send us a message below.
        </p>
      </div>

      <div className={styles.grid}>
        {/* Left Side: Information & Timing */}
        <div className={styles.infoPanel}>
          {/* Opening Hours */}
          <div className={styles.infoSection}>
            <h2>Opening Hours</h2>
            <p>Our tandoor fires are burning and woks are screaming during these hours:</p>
            <ul className={styles.hoursList}>
              <li className={styles.hoursRow}>
                <span>Monday &minus; Thursday</span>
                <span>12:00 PM &minus; 11:00 PM</span>
              </li>
              <li className={styles.hoursRow}>
                <span>Friday &minus; Saturday</span>
                <span>12:00 PM &minus; 12:00 AM</span>
              </li>
              <li className={styles.hoursRow}>
                <span>Sunday</span>
                <span>01:00 PM &minus; 10:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Quick Contact Cards */}
          <div className={styles.contactCards}>
            {/* Phone */}
            <div className={styles.card}>
              <div className={styles.iconBox}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className={styles.cardDetails}>
                <h3>Call for Orders & Bookings</h3>
                <p>+91 87590 73055</p>
              </div>
            </div>

            {/* Address */}
            <div className={styles.card}>
              <div className={styles.iconBox}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className={styles.cardDetails}>
                <h3>Our Location</h3>
                <p>Kolkata-Howrah Bridge Approach Road, Strand Road,</p>
                <p>Kolkata, West Bengal 700001</p>
              </div>
            </div>

            {/* Support */}
            <div className={styles.card}>
              <div className={styles.iconBox}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className={styles.cardDetails}>
                <h3>Email Support</h3>
                <p>orders@kolkata-howrahbridgespecial.com</p>
                <p>info@kolkata-howrahbridgespecial.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <ContactForm />
      </div>
    </div>
  );
}
