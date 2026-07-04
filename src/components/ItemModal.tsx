"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { MenuItem } from "../data/menuItems";
import { useCart } from "../context/CartContext";
import styles from "../styles/Modal.module.css";

interface ItemModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ item, isOpen, onClose }) => {
  const { addItem } = useCart();
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Customization States
  const [selectedSpice, setSelectedSpice] = useState<string>("");
  const [selectedExtras, setSelectedExtras] = useState<{ name: string; price: number }[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  // Sync dialog visibility with isOpen prop
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      // Reset customization selections when opening
      if (item) {
        setSelectedSpice(item.spiceLevels ? item.spiceLevels[1] || item.spiceLevels[0] : "");
        setSelectedExtras([]);
        setQuantity(1);
      }

      // Open modal natively
      if (!dialog.open) {
        dialog.showModal();
        // Prevent body scroll
        document.body.style.overflow = "hidden";
      }
    } else {
      if (dialog.open) {
        dialog.close();
        document.body.style.overflow = "";
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, item]);

  if (!item) return null;

  const handleSpiceSelect = (spice: string) => {
    setSelectedSpice(spice);
  };

  const handleExtraToggle = (extra: { name: string; price: number }) => {
    setSelectedExtras((prev) => {
      const exists = prev.find((e) => e.name === extra.name);
      if (exists) {
        return prev.filter((e) => e.name !== extra.name);
      } else {
        return [...prev, extra];
      }
    });
  };

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  // Calculate current item total including extras
  const extrasTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  const singleItemTotal = item.price + extrasTotal;
  const totalPrice = singleItemTotal * quantity;

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: singleItemTotal,
      image: item.image,
      spiceLevel: selectedSpice || undefined,
      extras: selectedExtras.length > 0 ? selectedExtras.map((e) => e.name) : undefined,
      quantity: quantity
    });
    onClose();
  };

  // Handle Backdrop clicks (Light Dismiss Fallback)
  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Check if the click target is the dialog element itself
    if (e.target !== dialog) return;

    // Check if coordinates fall outside the bounding box (dialog box itself)
    const rect = dialog.getBoundingClientRect();
    const isClickInside =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (!isClickInside) {
      onClose();
    }
  };

  // Listen to native cancel events (like pressing the Esc key)
  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClick={handleDialogClick}
      onCancel={handleCancel}
      aria-labelledby="modal-title"
    >
      {/* Hero Image */}
      <div className={styles.imageContainer}>
        <Image
          src={item.image}
          alt={item.name}
          className={styles.image}
          fill
          sizes="(max-width: 600px) 100vw, 580px"
          priority
        />
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className={styles.content}>
        {/* Title and Pricing */}
        <div className={styles.titleArea}>
          <div>
            <h3 id="modal-title">{item.name}</h3>
          </div>
          <span className={styles.price}>₹{item.price}</span>
        </div>

        {/* Rating and Tags */}
        <div className={styles.ratingRow}>
          <div className={styles.rating}>
            <svg className={styles.starIcon} width="16" height="16" viewBox="0 0 24 24">
              <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"></polygon>
            </svg>
            <span>{item.rating}</span>
          </div>
          {item.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        {/* Product Description */}
        <p className={styles.description}>{item.description}</p>

        {/* Spice Level selection (if customizable) */}
        {item.customizable && item.spiceLevels && (
          <div className={styles.customizationSection}>
            <h4 className={styles.sectionTitle}>Select Spice Level</h4>
            <div className={styles.spiceGrid}>
              {item.spiceLevels.map((spice) => (
                <button
                  key={spice}
                  type="button"
                  className={`${styles.spiceOption} ${selectedSpice === spice ? styles.selected : ""}`}
                  onClick={() => handleSpiceSelect(spice)}
                >
                  {spice}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Extras / Toppings selection (if customizable) */}
        {item.customizable && item.extras && (
          <div className={styles.customizationSection}>
            <h4 className={styles.sectionTitle}>Add Extras</h4>
            <div className={styles.extrasList}>
              {item.extras.map((extra) => {
                const isSelected = !!selectedExtras.find((e) => e.name === extra.name);
                return (
                  <label key={extra.name} className={styles.extraItem}>
                    <div className={styles.checkboxContainer}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={isSelected}
                        onChange={() => handleExtraToggle(extra)}
                      />
                      <span className={styles.extraName}>{extra.name}</span>
                    </div>
                    <span className={styles.extraPrice}>+₹{extra.price}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal Action Footer - Commented Out
        <div className={styles.modalFooter}>
          <div className={styles.quantitySelector}>
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={() => handleQuantityChange(-1)}
              aria-label="Decrease quantity"
            >
              &minus;
            </button>
            <span className={styles.qtyValue}>{quantity}</span>
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={() => handleQuantityChange(1)}
              aria-label="Increase quantity"
            >
              &#43;
            </button>
          </div>

          <button type="button" className={`${styles.submitBtn} btn-primary`} onClick={handleAddToCart}>
            <span>Add to Cart</span>
            <span>&bull;</span>
            <span>₹{totalPrice}</span>
          </button>
        </div>
        */}

        {/* Modal Footer with Close and WhatsApp Order Buttons */}
        <div className={styles.modalFooter} style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", marginTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            {/* Quantity Selector */}
            <div className={styles.quantitySelector}>
              <button
                type="button"
                className={styles.qtyBtn}
                onClick={() => handleQuantityChange(-1)}
                aria-label="Decrease quantity"
              >
                &minus;
              </button>
              <span className={styles.qtyValue}>{quantity}</span>
              <button
                type="button"
                className={styles.qtyBtn}
                onClick={() => handleQuantityChange(1)}
                aria-label="Increase quantity"
              >
                &#43;
              </button>
            </div>

            <div style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--primary-gold)", fontFamily: "var(--font-serif)" }}>
              Total: ₹{totalPrice}
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", width: "100%" }}>
            <button type="button" className="btn-secondary" style={{ flex: 1, justifyContent: "center" }} onClick={onClose}>
              Close
            </button>

            <a
              href={`https://wa.me/918759073055?text=${encodeURIComponent(
                `Hi! I would like to order:\n\n*${item.name}* (Qty: ${quantity})\n` +
                (item.customizable && selectedSpice ? `- Spice Level: ${selectedSpice}\n` : "") +
                (selectedExtras.length > 0 ? `- Extras: ${selectedExtras.map((e) => e.name).join(", ")}\n` : "") +
                `- Total Price: ₹${totalPrice}\n\nPlease confirm my order!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                flex: 2,
                justifyContent: "center",
                background: "linear-gradient(135deg, #25d366, #128c7e)",
                boxShadow: "0 4px 15px rgba(37, 211, 102, 0.25)"
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 6 }}>
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846l.395.234c1.61.957 3.705 1.463 5.85 1.464 5.544 0 10.057-4.515 10.06-10.06.002-2.686-1.037-5.21-2.93-7.104C18.13 1.796 15.602.75 12.916.75 7.37.75 2.859 5.265 2.856 10.81c-.001 2.054.502 4.062 1.464 5.69l.257.435-1.01 3.685 3.774-.989zm11.306-6.425c-.29-.145-1.716-.847-1.98-.942-.266-.096-.459-.145-.653.146-.194.29-.75.942-.919 1.135-.169.194-.338.217-.628.072-.29-.145-1.226-.452-2.336-1.442-.864-.77-1.447-1.722-1.617-2.012-.17-.29-.018-.447.127-.59.13-.13.29-.339.435-.508.145-.169.193-.29.29-.483.097-.193.048-.362-.024-.507-.072-.145-.653-1.57-.893-2.15-.233-.56-.47-.483-.653-.492-.169-.009-.362-.01-.555-.01-.193 0-.507.072-.773.362-.266.29-1.014.99-1.014 2.415 0 1.425 1.038 2.802 1.182 2.995.145.193 2.043 3.12 4.949 4.373.692.298 1.233.477 1.655.61.695.22 1.33.19 1.83.115.558-.08 1.716-.7 1.96-1.374.246-.676.246-1.256.173-1.375-.072-.119-.266-.193-.556-.339z" />
              </svg>
              <span>Order on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
};
