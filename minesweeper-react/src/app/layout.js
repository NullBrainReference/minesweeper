// app/layout.js
import "bootstrap/dist/css/bootstrap.min.css"; // import bootstrap globally
import "./globals.css";

export const metadata = {
  title: "Minesweeper",
  description: "React/Next.js Minesweeper game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* If you want Bootstrap JS (for modals, dropdowns, etc.), include the bundle */}
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
          defer
        />
      </head>
      <body className="bg-light">
        <div className="container py-4">{children}</div>
      </body>
    </html>
  );
}
