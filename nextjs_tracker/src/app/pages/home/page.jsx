"use client";

import Image from "next/image";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";

export default function Dashboard() {
  const [users, setUsers] = useState();
  const [loaded, setLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  async function fetchImageUrl() {
    const { data, error } = await supabase.storage
      .from("avatar/public")
      .getPublicUrl("avatar.png");
    setImageUrl(data.publicUrl);
  }

  useEffect(() => {
    // Call the async function to fetch the image URL
    fetchImageUrl();
  }, [loaded]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const { data, error } = await supabase.storage
      .from("avatar/public")
      .update("avatar.png", file, {
        cacheControl: "1",
        upsert: true,
      });
    console.log(error);
    setImageUrl(URL.createObjectURL(file));
  };

  async function getData() {
    let { data: Users, error } = await supabase.from("Users").select("name");
    setUsers(Users);
    setLoaded(true);
  }
  useEffect(() => {
    getData(); // Call the function to fetch data
  }, [loaded]);

  return (
    <main className="h-screen w-full font-roboto m-8">
      <div className="ecra">
        <div className="coluna 1 w-[15%] h-full">
          <div className="bg-[#413b60] w-full rounded-md">
            <div className="flex flex-row text-white ">
              <div className="relative">
                <img
                  src={imageUrl} // Provide a placeholder image path
                  alt={"avatar"}
                  className="rounded-full w-10 h-10"
                />
                <label
                  htmlFor="image-upload"
                  className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 cursor-pointer hover:bg-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <div className="flex justify-center flex-col ml-2">
                <p>David Tenda</p>
                <p>Edit Profile {">"}</p>
              </div>
            </div>
          </div>
          <div>
            <Navbar />
          </div>
          <div className="bg-[#413b60] rounded-md flex h-full w-full mt-8 ">
            <div className="flex flex-col w-full my-4">
              <div className="flex justify-center">
                <div className="flex items-center justify-center pb-4 border-b-2 w-2/3">
                  <div className="text-white font-bold text-2xl">Users</div>{" "}
                </div>
              </div>
              <div>
                {loaded &&
                  users.map((userItem, index) => (
                    <div
                      key={index}
                      className="hover:bg-gradient-to-r from-[#22f2e4]/50 to-transparent hover:border-l-4 border-[#22f2e4] py-1 first:mt-4"
                    >
                      <div className="text-white flex">
                        <div className="ml-4">{userItem.name}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="coluna 2"></div>
      </div>
    </main>
  );
}
