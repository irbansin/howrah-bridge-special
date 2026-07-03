"use client";

import React from "react";
import Image from "next/image";
import { MenuItem } from "../data/menuItems";
import { useCart } from "../context/CartContext";
import styles from "../styles/Menu.module.css";

interface MenuCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onSelect }) => {
  const { addItem } = useCart();

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering card details select
    
    if (item.customizable) {
      // Trigger customization dialog
      onSelect(item);
    } else {
      // Directly add to cart since no customization is needed
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1
      });
    }
  };

  return (
    <article className={styles.card} onClick={() => onSelect(item)}>
      {/* Food Image with Rating & Chef Tags */}
      <div className={styles.cardImageContainer}>
        <Image
          src={item.image}
          alt={item.name}
          className={styles.cardImage}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        
        {/* Rating Badge */}
        <div className={styles.ratingBadge}>
          <svg className={styles.starIcon} width="12" height="12" viewBox="0 0 24 24">
            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"></polygon>
          </svg>
          <span>{item.rating}</span>
        </div>

        {/* Highlight Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className={styles.tagRow}>
            {item.tags.slice(0, 1).map((tag) => (
              <span key={tag} className={styles.cardTag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Details */}
      <div className={styles.cardBody}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{item.name}</h3>
          <span className={styles.cardPrice}>₹{item.price}</span>
        </div>
        
        <p className={styles.cardDesc}>{item.description}</p>
        
        {/* Call to action */}
        <div className={styles.cardFooter}>
          <button
            type="button"
            className={`${styles.cardBtn} ${item.customizable ? "btn-secondary" : "btn-primary"}`}
            onClick={handleActionClick}
          >
            {item.customizable ? (
              <>
                <span>Customize</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </>
            ) : (
              <>
                <span>Add to Bag</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
