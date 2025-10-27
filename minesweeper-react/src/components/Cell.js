"use client";
import React from "react";

export default function Cell({ cell, onClick }) {
  let content = "";
  if (cell.isOpen) {
    content = cell.isMine ? "💣" : cell.adjacentMines > 0 ? String(cell.adjacentMines) : "";
  }

  return (
    <div
      onClick={onClick}
      className="border d-flex align-items-center justify-content-center"
      style={{
        width: 24,
        height: 24,
        backgroundColor: cell.isOpen ? "#ddd" : "#f3f3f3",
        cursor: "pointer",
        fontSize: 12,
        userSelect: "none",
      }}
    >
      {content}
    </div>
  );
}
