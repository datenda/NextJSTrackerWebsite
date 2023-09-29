"use client";

import { usePathname } from "next/navigation";
import supabase from "../../config/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Trips from "./page";

export default function RootLayout() {
  return (
    <div className="overflow-hidden bg-[#39304f]">
      <Trips />
    </div>
  );
}
