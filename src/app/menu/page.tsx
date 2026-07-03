"use client";

import React, { useState, useMemo } from "react";
import { menuItems, MenuItem } from "../../data/menuItems";
import { MenuCard } from "../../components/MenuCard";
import { ItemModal } from "../../components/ItemModal";
import styles from "../../styles/Menu.module.css";

type CategoryFilter = "all" | "rolls" | "burgers" | "chinese" | "drinks";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories: { label: string; value: CategoryFilter }[] = [
    { label: "All Items", value: "all" },
    { label: "Kathi Rolls", value: "rolls" },
    { label: "Burgers & Sides", value: "burgers" },
    { label: "Tangra Chinese", value: "chinese" },
    { label: "Sweets & Mojitos", value: "drinks" }
  ];

  // Memoize filtered items for speed
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleSelectItem = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  return (
    <div className={`${styles.menuPage} container`}>
      {/* Page Heading */}
      <div className={styles.intro}>
        <h1>Our Specialties</h1>
        <p>
          Crafted from heritage family recipes, using authentic tandoor spices, hand-layered flatbreads, and aromatic fresh herbs.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className={styles.filterPanel}>
        {/* Search */}
        <div className={styles.searchWrapper}>
          <svg
            className={styles.searchIcon}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="search"
            placeholder="Search for Kathi rolls, spicy noodles, burgers..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search food items"
          />
        </div>

        {/* Categories */}
        <ul className={styles.tabs}>
          {categories.map((cat) => (
            <li
              key={cat.value}
              className={`${styles.tabItem} ${activeCategory === cat.value ? styles.active : ""}`}
            >
              <button onClick={() => setActiveCategory(cat.value)} type="button">
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Dishes Grid */}
      {filteredItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-secondary)" }}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{ marginBottom: 16, opacity: 0.5 }}
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#fff", marginBottom: 8 }}>
            No items matched your search
          </h3>
          <p>Try searching for a different keyword or checking other categories.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} onSelect={handleSelectItem} />
          ))}
        </div>
      )}

      {/* Detail overlay dialog */}
      <ItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
