// app/crud/CrudForm.jsx
"use client";

import { useState, useEffect } from "react";

const CrudForm = ({ addOrUpdateItem, currentItem, setCurrentItem }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (currentItem) {
      setInput(currentItem.name);
    } else {
      setInput("");
    }
  }, [currentItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;

    await addOrUpdateItem(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter item name"
      />
      <button type="submit">{currentItem ? "Update" : "Add"}</button>
    </form>
  );
};

export default CrudForm;
