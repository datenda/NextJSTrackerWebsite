"use client";
import "tailwindcss/tailwind.css";
import supabase from "./config/supabaseClient";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className="flex justify-around items-center h-screen bg-black">
      <div className="w-64 h-64 bg-white rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md border border-gray-300"
            placeholder="Username"
            value={username}
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
        <button className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700">
          Log In
        </button>
      </div>
    </div>
  );
}
