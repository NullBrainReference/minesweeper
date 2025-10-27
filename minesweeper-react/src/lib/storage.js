export function saveGame(field) {
    try {
      localStorage.setItem("minesweeper", JSON.stringify(field));
    } catch {}
  }
  export function loadGame() {
    try {
      const raw = localStorage.getItem("minesweeper");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
  