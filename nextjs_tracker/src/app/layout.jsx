"use client";
import "./globals.css";
import Navbar from "./components/Navbar";
import { usePathname } from "next/navigation";
import supabase from "./config/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "./pages/home/page";

export default function RootLayout({ children }) {
  const currentPathname = usePathname();
  const exceptions = ["/", "/signup"];
  const [User, setUser] = useState();
  const redirect = exceptions.includes(currentPathname);
  // Show the navbar for all paths except "/"
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleUser = async (e) => {
    const { data, error } = await supabase.auth.getSession();
    const user = data;
    if (!user.session) {
      // Redirect to the login page if the user is not authenticated
      router.push("/");
    }
    if (user.session.user.email !== undefined) {
      setUser(user.session.user.email);
    }
  };

  useEffect(() => {
    if (!redirect) {
      handleUser();
      setLoading(true);
    }
  }, [loading]);
  return (
    <html lang="en">
      <body className="overflow-hidden bg-[#39304f]">{children}</body>
    </html>
  );
}
