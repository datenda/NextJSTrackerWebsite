"use client";

import Image from "next/image";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import { useRouter } from "next/navigation";
import Listusers from "@/app/components/Listusers";

export default function Dashboard(props) {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState();
  const router = useRouter();

  async function fetchImageUrl(userName) {
    const storagePath = `avatar`;
    const { data, error } = await supabase.storage
      .from(storagePath)
      .getPublicUrl(userName + ".png");

    setImageUrl(data.publicUrl);
  }

  useEffect(() => {
    fetchImageUrl(props.props);
  }, [props]);

  async function getData() {
    let { data: Users } = await supabase.from("Workers").select("name, email");
    setUsers(Users);
    setLoaded(true);
  }

  useEffect(() => {
    getData();
  }, []);

  async function getName() {
    const user = users.find((user) => user.email === props.props);
    console.log(user);
  }
  useEffect(() => {
    const user = users.find((user) => user.email === props.props);
    if (user) {
      setName(user.name);
    }
  }, [users]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const { data, error } = await supabase.storage
        .from("avatar/" + props.props)
        .update("avatar.png", file, {
          cacheControl: "1",
          upsert: true,
        });

      if (!error) {
        setImageUrl(URL.createObjectURL(file));
      } else {
        console.error("Error uploading image:", error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleSignout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        router.push("/");
      } else {
        console.error("Error signing out:", error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

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
                <p>{name}</p>
                <p>Edit Profile {">"}</p>
                <button onClick={handleSignout}>sign out</button>
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
                  users
                    .filter((userItem) => userItem.email !== props.props) // Filter out the user with the same email
                    .map((userItem, index) => (
                      <div key={index}>
                        <Listusers props={userItem} />
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
