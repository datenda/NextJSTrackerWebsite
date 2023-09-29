"use client";

import "./globals.css";
import { serialize } from "cookie";
import { usePathname } from "next/navigation";
import supabase from "./config/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";

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
    } else {
      router.push("/pages/home");
    }
    console.log(user);
    if (user.session.user.email !== undefined) {
      setUser(user.session.user.email);
    }
  };

  useEffect(() => {
    if (!redirect) {
      handleUser();
      console.log(User);
      setLoading(true);
    }
  }, [loading]);
  const shouldShowNavbar = !exceptions.includes(currentPathname);

  return (
    <html lang="en">
      <body
        className={` ${
          shouldShowNavbar ? "overflow-hidden bg-[#39304f] flex p-8 " : "p-0"
        }`}
      >
        {shouldShowNavbar && <Navbar props={User} />}
        <div className="w-full">{children}</div>
      </body>
    </html>
  );
}
