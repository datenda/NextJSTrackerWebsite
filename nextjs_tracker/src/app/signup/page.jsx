"use client";
import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import { useRouter } from "next/navigation";

export default function confirm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file); // Store the selected file in state
  };

  const handleUser = async (e) => {
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      // Handle sign-up error
      console.error("Sign-up error:", error.message);
    } else {
      // Sign-up successful, now upload the user-selected image
      if (selectedFile) {
        try {
          const { data, error } = await supabase.storage
            .from("avatar")
            .upload(email + ".png", selectedFile, {
              cacheControl: "1",
              upsert: true,
            });

          if (!error) {
            console.log("Image uploaded successfully.");
          } else {
            console.error("Error uploading image:", error);
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      } else {
        console.error("No file selected.");
      }

      // Insert user data into the Workers table
      const { data: userData, error: insertError } = await supabase
        .from("Workers")
        .insert([
          {
            email: email,
            name: name,
            age: age,
            gender: gender,
          },
        ]);

      if (insertError) {
        console.error("Error inserting user data:", insertError.message);
      } else {
        alert("Verify your account in your email");
        router.push("/");
      }
    }
  };

  return (
    <div className="flex justify-around items-center h-screen bg-black">
      <div className="w-64 h-100 bg-white rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <div className="mb-4">
          <input
            type="email"
            className="w-full px-3 py-2 rounded-md border border-gray-300"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
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
        <div className="mb-4">
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md border border-gray-300"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            className="w-full px-3 py-2 rounded-md border border-gray-300"
            placeholder="Age"
            value={age}
            onChange={handleAgeChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md border border-gray-300"
            placeholder="Gender"
            value={gender}
            onChange={handleGenderChange}
          />
        </div>

        <div className="mb-4">
          <input
            type="file"
            id="file-input"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={() => {
              const fileInput = document.getElementById("file-input");
              if (fileInput) {
                fileInput.click(); // Trigger the file input when the button is clicked
              }
            }}
          >
            Select Image
          </button>
        </div>
        <button
          className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700"
          onClick={handleUser}
        >
          Sign up
        </button>
        <div className="flex justify-center mt-1">
          <button className=" text-blue-600" onClick={() => router.push("/")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
