"use client";
import React, { useEffect, useState } from "react";
import FieldGrid from "../components/FieldGrid";
import SettingsForm from "../components/SettingsForm";
import { createField } from "../models/field";
import { saveGame, loadGame } from "../lib/storage";

export default function Home() {
  const [field, setField] = useState(null);
  const [isOver, setIsOver] = useState(false);

  // Initialize field client-side
  useEffect(() => {
    const saved = loadGame();
    if (saved) {
      setField(saved);
    } else {
      setField(createField(24, 24, 50));
    }
  }, []);

  // Save game whenever field changes
  useEffect(() => {
    if (field) {
      saveGame(field);
    }
  }, [field]);

  function revealCell(copy, r, c) {
    const rows = copy.length, cols = copy[0].length;
    const inBounds = (x, y) => x >= 0 && x < rows && y >= 0 && y < cols;
    const stack = [[r, c]];

    while (stack.length) {
      const [x, y] = stack.pop();
      const cell = copy[x][y];
      if (cell.isOpen) continue;
      cell.isOpen = true;

      if (!cell.isMine && cell.adjacentMines === 0) {
        const dirs = [
          [-1, -1], [-1, 0], [-1, 1],
          [0, -1],           [0, 1],
          [1, -1], [1, 0], [1, 1],
        ];
        for (const [dx, dy] of dirs) {
          const nx = x + dx, ny = y + dy;
          if (inBounds(nx, ny) && !copy[nx][ny].isOpen && !copy[nx][ny].isMine) {
            stack.push([nx, ny]);
          }
        }
      }
    }
  }

  function handleNewGame(rows, cols, mines) {
    setIsOver(false);
    setField(createField(rows, cols, mines));
  }

  function handleCellClick(r, c) {
    if (isOver) return;

    setField((prev) => {
      const copy = prev.map((row) => row.map((cell) => ({ ...cell })));
      const cell = copy[r][c];

      if (cell.isOpen) return copy;

      if (cell.isMine) {
        cell.isOpen = true;
        setIsOver(true);
        alert("Game Over! You clicked on a mine.");
        return copy;
      }

      revealCell(copy, r, c);

      // Win check
      const total = copy.length * copy[0].length;
      const open = copy.flat().filter((c) => c.isOpen).length;
      const minesCount = copy.flat().filter((c) => c.isMine).length;
      if (open === total - minesCount) {
        alert("Congratulations! You win!");
        setIsOver(true);
      }

      return copy;
    });
  }

  // Don’t render grid until field is ready
  if (!field) {
    return (
      <div className="container py-4">
        <h1 className="mb-4 text-body">Minesweeper</h1>
        <p>Loading game…</p>
      </div>
    );
  }

  const total = field.length * field[0].length;
  const open = field.flat().filter((c) => c.isOpen).length;
  const minesCount = field.flat().filter((c) => c.isMine).length;
  const leftToOpen = total - open - minesCount;

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-body">Minesweeper</h1>
      <div className="row">
        <div className="col-lg-8">
          <FieldGrid field={field} onCellClick={handleCellClick} />
          <p className="fw-bold mt-3">Left to open: {leftToOpen}</p>
        </div>
        <div className="col-lg-4">
          <SettingsForm onNewGame={handleNewGame} />
        </div>
      </div>
    </div>
  );
}
