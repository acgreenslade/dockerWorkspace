import React from "react";
import Demo from "./Demo";
import Weather from "./Weather";

const API_URI = "http://localhost:3000/api/items";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <Demo />
      <Weather />
    </div>
  );
}
