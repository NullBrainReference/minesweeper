"use client";
import React, { useState } from "react";

export default function SettingsForm({ onNewGame }) {
  const [rows, setRows] = useState(24);
  const [cols, setCols] = useState(24);
  const [mines, setMines] = useState(50);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNewGame(rows, cols, mines);
      }}
      className="card p-3 shadow-sm"
    >
      <div className="mb-3">
        <label className="form-label">Height (rows)</label>
        <input type="number" className="form-control" value={rows} onChange={(e) => setRows(+e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Width (cols)</label>
        <input type="number" className="form-control" value={cols} onChange={(e) => setCols(+e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Mines</label>
        <input type="number" className="form-control" value={mines} onChange={(e) => setMines(+e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary w-100">New Game</button>
    </form>
  );
}
