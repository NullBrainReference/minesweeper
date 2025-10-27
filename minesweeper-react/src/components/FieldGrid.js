"use client";
import React from "react";
import Cell from "./Cell";

export default function FieldGrid({ field, onCellClick }) {
  const cols = field[0]?.length || 0;
  return (
    <div
      className="d-grid gap-1 border p-2"
      style={{
        gridTemplateColumns: `repeat(${cols}, 24px)`,
        gridAutoRows: "24px",
      }}
    >
      {field.map((row, r) =>
        row.map((cell, c) => (
          <Cell key={`${r}-${c}`} cell={cell} onClick={() => onCellClick(r, c)} />
        ))
      )}
    </div>
  );
}
