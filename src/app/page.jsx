// app/page.jsx
"use client";

import { useState, useEffect } from "react";
import CrudForm from "./crud/CrudForm";
import CrudTable from "./crud/CrudTable";

export default function Home() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch("/api/items");
    const data = await res.json();
    setItems(data);
  };

  const addOrUpdateItem = async (name) => {
    if (currentItem) {
      await fetch("/api/items", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: currentItem.id, name }),
      });
      setCurrentItem(null);
    } else {
      await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
    }
    fetchItems();
  };

  const deleteItem = async (id) => {
    await fetch("/api/items", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchItems();
  };

  const editItem = (item) => {
    setCurrentItem(item);
  };

  return (
    <div>
      <h1>CRUD App with Next.js 14</h1>
      <CrudForm
        addOrUpdateItem={addOrUpdateItem}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
      />
      <CrudTable items={items} deleteItem={deleteItem} editItem={editItem} />
    </div>
  );
}
