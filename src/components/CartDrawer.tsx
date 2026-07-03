"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import styles from "../styles/Cart.module.css";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    cartTotal,
    cartCount
  } = useCart();

  const dialogRef = useRef<HTMLDialogElement>(null);
  
  // Checkout simulation states
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [timelineStep, setTimelineStep] = useState(0);

  // Sync dialog visibility
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isCartOpen) {
      if (!dialog.open) {
        dialog.showModal();
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
  }, [isCartOpen]);

  // Order Timeline simulation
  useEffect(() => {
    if (!orderPlaced) return;

    // Reset timeline step
    setTimelineStep(0);

    const stepIntervals = [3000, 7000, 11000]; // Times at which steps change
    const timers = stepIntervals.map((time, idx) =>
      setTimeout(() => {
        setTimelineStep(idx + 1);
      }, time)
    );

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [orderPlaced]);

  const handleClose = () => {
    setIsCartOpen(false);
    // If order was successfully completed, clear state on close
    if (orderPlaced) {
      setTimeout(() => {
        clearCart();
        setOrderPlaced(false);
        setTimelineStep(0);
      }, 300);
    }
  };

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    // Simulate API request delay
    setTimeout(() => {
      setIsPlacingOrder(false);
      setOrderPlaced(true);
    }, 2000);
  };

  // Light dismiss clicks (clicking outside the drawer content area)
  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (e.target !== dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isClickInside =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (!isClickInside) {
      handleClose();
    }
  };

  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
    handleClose();
  };

  // Pricing calculations
  const deliveryFee = cartTotal > 0 ? 40 : 0;
  const gstTax = Math.round(cartTotal * 0.18);
  const grandTotal = cartTotal + deliveryFee + gstTax;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClick={handleDialogClick}
      onCancel={handleCancel}
      aria-labelledby="cart-title"
    >
      <div className={styles.wrapper}>
        {/* Drawer Header */}
        <div className={styles.header}>
          <h3 id="cart-title">
            <span>Shopping Bag</span>
            {!orderPlaced && <span className={styles.itemCount}>{cartCount} items</span>}
          </h3>
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Close cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* 1. ORDER SUCCESS SCREEN */}
        {orderPlaced ? (
          <div className={styles.successArea}>
            <div className={styles.successIconWrapper}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h4 className={styles.successTitle}>Order Placed!</h4>
            <p className={styles.successText}>
              Your order from Howrah Bridge Special has been received. Our chefs are preparing your hot meal.
            </p>

            {/* Simulated Live Order Tracker */}
            <div className={styles.orderTimeline}>
              <div
                className={`${styles.timelineNode} ${
                  timelineStep > 0 ? styles.nodeCompleted : timelineStep === 0 ? styles.nodeActive : ""
                }`}
              >
                <span className={styles.nodeTitle}>Order Confirmed</span>
                <span className={styles.nodeDesc}>We have received your order</span>
              </div>
              <div
                className={`${styles.timelineNode} ${
                  timelineStep > 1 ? styles.nodeCompleted : timelineStep === 1 ? styles.nodeActive : ""
                }`}
              >
                <span className={styles.nodeTitle}>Preparing Feast</span>
                <span className={styles.nodeDesc}>Our tandoor chefs are rolling parathas</span>
              </div>
              <div
                className={`${styles.timelineNode} ${
                  timelineStep > 2 ? styles.nodeCompleted : timelineStep === 2 ? styles.nodeActive : ""
                }`}
              >
                <span className={styles.nodeTitle}>Out for Delivery</span>
                <span className={styles.nodeDesc}>A hot meal is heading to your bridge</span>
              </div>
              <div
                className={`${styles.timelineNode} ${
                  timelineStep > 3 ? styles.nodeCompleted : timelineStep === 3 ? styles.nodeActive : ""
                }`}
              >
                <span className={styles.nodeTitle}>Delivered</span>
                <span className={styles.nodeDesc}>Enjoy your street food specialties!</span>
              </div>
            </div>

            <button className={`${styles.successBtn} btn-primary`} onClick={handleClose}>
              Continue Shopping
            </button>
          </div>
        ) : cart.length === 0 ? (
          /* 2. EMPTY STATE */
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <h4 className={styles.emptyTitle}>Your bag is empty</h4>
            <p className={styles.emptyText}>
              Looks like you haven&apos;t added any delicious Kolkata Kathi rolls or tandoor burgers to your order yet.
            </p>
            <button className="btn-primary" onClick={() => setIsCartOpen(false)}>
              Browse Our Menu
            </button>
          </div>
        ) : (
          /* 3. ACTIVE ITEMS LIST */
          <>
            <div className={styles.itemList}>
              {cart.map((item, index) => (
                <div key={`${item.id}-${index}`} className={styles.itemCard}>
                  {/* Item Image */}
                  <div style={{ position: "relative", width: 70, height: 70 }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={70}
                      height={70}
                      className={styles.itemImage}
                    />
                  </div>

                  {/* Item Details */}
                  <div className={styles.itemDetails}>
                    <div>
                      <h4 className={styles.itemTitle}>{item.name}</h4>
                      
                      {/* Selected Customizations */}
                      {(item.spiceLevel || (item.extras && item.extras.length > 0)) && (
                        <div className={styles.customizationDetails}>
                          {item.spiceLevel && <span>Spice: {item.spiceLevel}</span>}
                          {item.extras && item.extras.map((ex) => <span key={ex}>+ {ex}</span>)}
                        </div>
                      )}
                    </div>

                    <div className={styles.itemFooter}>
                      {/* Quantity Toggles */}
                      <div className={styles.quantityControls}>
                        <button
                          type="button"
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          &minus;
                        </button>
                        <span className={styles.qtyVal}>{item.quantity}</span>
                        <button
                          type="button"
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          &#43;
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className={styles.itemPrice}>₹{item.price * item.quantity}</span>
                    </div>

                    <button
                      className={styles.removeBtn}
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Summary Sticky Panel */}
            <div className={styles.summary}>
              <button className={styles.clearBtn} onClick={clearCart}>
                Clear All Items
              </button>

              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Taxes & GST (18%)</span>
                <span>₹{gstTax}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Delivery Charge</span>
                <span>₹{deliveryFee}</span>
              </div>

              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>

              <button
                type="button"
                className={`${styles.checkoutBtn} btn-primary`}
                disabled={isPlacingOrder}
                onClick={handlePlaceOrder}
              >
                {isPlacingOrder ? (
                  <>
                    <span>Placing Order...</span>
                  </>
                ) : (
                  <>
                    <span>Place Order</span>
                    <span>&bull;</span>
                    <span>₹{grandTotal}</span>
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
};
