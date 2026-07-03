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

        {/* Modal Action Footer */}
        <div className={styles.modalFooter}>
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

          {/* Add to Cart CTA */}
          <button type="button" className={`${styles.submitBtn} btn-primary`} onClick={handleAddToCart}>
            <span>Add to Cart</span>
            <span>&bull;</span>
            <span>₹{totalPrice}</span>
          </button>
        </div>
      </div>
    </dialog>
  );
};
