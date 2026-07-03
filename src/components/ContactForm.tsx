"use client";

import React, { useState } from "react";
import styles from "../styles/Contact.module.css";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Feedback",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "Feedback",
      message: ""
    });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className={`${styles.successCard} glass-panel`}>
        <div className={styles.successIcon}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h2>Message Sent!</h2>
        <p>
          Thank you for reaching out to Howrah Bridge Special. We have received your query and our team will get back to you shortly.
        </p>
        <button className="btn-primary" onClick={handleReset}>
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles.formContainer} glass-panel`}>
      <h2>Send us a Message</h2>
      <p className={styles.formSub}>Have a question about our menu, catering, or reservations? Write to us.</p>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          {/* Name Field */}
          <div className={styles.formGroup}>
            <label htmlFor="form-name" className={styles.formLabel}>Full Name</label>
            <input
              id="form-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className={styles.input}
              required
            />
          </div>

          {/* Email Field */}
          <div className={styles.formGroup}>
            <label htmlFor="form-email" className={styles.formLabel}>Email Address</label>
            <input
              id="form-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. rahul@example.com"
              className={styles.input}
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          {/* Phone Field */}
          <div className={styles.formGroup}>
            <label htmlFor="form-phone" className={styles.formLabel}>Phone Number</label>
            <input
              id="form-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +91 98765 43210"
              className={styles.input}
              pattern="^[+]?[0-9\s\-()]{10,15}$"
              title="Please enter a valid phone number"
            />
          </div>

          {/* Subject Selector (custom styling inherits formGroup outline) */}
          <div className={styles.formGroup}>
            <label htmlFor="form-subject" className={styles.formLabel}>Subject</label>
            <select
              id="form-subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={styles.input}
              style={{ background: "#111116", cursor: "pointer" }}
            >
              <option value="Feedback" style={{ background: "#111116" }}>Feedback / Review</option>
              <option value="Catering" style={{ background: "#111116" }}>Catering Services</option>
              <option value="Reservation" style={{ background: "#111116" }}>Table Booking</option>
              <option value="Jobs" style={{ background: "#111116" }}>Career Opportunities</option>
            </select>
          </div>
        </div>

        {/* Message Textarea */}
        <div className={styles.formGroup}>
          <label htmlFor="form-message" className={styles.formLabel}>Your Message</label>
          <textarea
            id="form-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            className={styles.textarea}
            required
          ></textarea>
        </div>

        {/* CTA Button */}
        <button
          type="submit"
          className={`${styles.submitBtn} btn-primary`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span>Sending Message...</span>
          ) : (
            <>
              <span>Send Message</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
