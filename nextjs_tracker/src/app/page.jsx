"use client";
import "tailwindcss/tailwind.css";
import supabase from "./config/supabaseClient";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error("Login error:", error.message);
      } else {
        console.log("User logged in:", data.user);
        // Redirect to the dashboard or home page upon successful login
        router.push("/pages/home");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="flex justify-around items-center h-screen bg-black flex-col">
      <div className="w-64 h-64 bg-white rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md border border-gray-300"
            placeholder="E-mail"
            value={email}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="w-full px-3 py-2 rounded-md border border-gray-300"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button
          className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="flex justify-center mt-1">
          <button
            className=" text-blue-600"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
