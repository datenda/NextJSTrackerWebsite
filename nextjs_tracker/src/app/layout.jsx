"use client";
import "./globals.css";
import Navbar from "./components/Navbar";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const currentPathname = usePathname();
  const showNavbar = currentPathname !== "/"; // Show the navbar for all paths except "/"

  return (
    <html lang="en">
      <body className="overflow-hidden bg-[#39304f]">{children}</body>
    </html>
  );
}
