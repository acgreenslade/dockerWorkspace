import { useEffect, useState } from "react";

const API_URI = "http://localhost:3000/api/items";

export default function Demo() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch(API_URI)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);

  const addItem = async () => {
    const res = await fetch(API_URI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });

    const newItem = await res.json();
    setItems([...items, newItem]);
    setName("");
  };

  const deleteItem = async (id) => {
    await fetch(`${API_URI}/${id}`, {
      method: "DELETE"
    });

    setItems(items.filter(i => i._id !== id));
  };

  return (
    <section style={{ padding: 20 }}>
      <h1>Mongo CRUD Demo</h1>

      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Item name"
      />
      <button onClick={addItem}>Add</button>

      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name}
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
