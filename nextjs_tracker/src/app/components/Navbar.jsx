"use client";
import React, { useEffect, useState, useRef } from "react";
import supabase from "../config/supabaseClient";
import Listusers from "./Listusers";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar({ showNavbar = true, props }) {
  const links = [
    { name: "Dashboard", link: "/pages/home", img: "/images/graph.svg" },
    { name: "Vehicles", link: "", img: "/images/vehicle.svg" },
    { name: "Trips", link: "/pages/trips", img: "/images/travel.svg" },
  ];

  const [iconMode, setIconMode] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState(null);
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  async function fetchData() {
    try {
      const [userData, imageUrlData] = await Promise.all([supabase.from("Workers").select("name, email"), fetchImageUrl(props)]);

      setUsers(userData.data);
      setLoaded(true);

      const user = userData.data.find(user => user.email === props);
      if (user) {
        setName(user.name);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  async function fetchImageUrl(userName) {
    const storagePath = `avatar`;
    const { data, error } = await supabase.storage.from(storagePath).getPublicUrl(userName + ".png");

    if (data) {
      setImageUrl(data.publicUrl);
    } else {
      setImageUrl("/default-avatar.png"); // Provide a default avatar path
    }
  }

  useEffect(() => {
    fetchData();
  }, [props, loaded]);

  const handleImageUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const { data, error } = await supabase.storage.from("avatar/" + props.props).update("avatar.png", file, {
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
    const { error } = await supabase.auth.signOut();

    router.push("/");
  };

  const [scrollTop, setScrollTop] = useState(0);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.pageYOffset || document.documentElement.scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (navbarRef.current) {
      const navbar = navbarRef.current;
      const navbarHeight = navbar.clientHeight;
      const bodyHeight = document.body.clientHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = bodyHeight - windowHeight;

      if (scrollTop > maxScroll - navbarHeight) {
        navbar.style.position = "absolute";
        navbar.style.top = maxScroll - navbarHeight + "px";
      } else {
        navbar.style.position = "fixed";
        navbar.style.top = "0";
      }
    }
  }, [scrollTop]);

  return (
    showNavbar && (
      <div className={`fixed top-0 left-0 right-0 z-50 p-4 `}>
        <button className={`flex ${iconMode ? "w-screen sm:w-1/2 md:w-1/4 h-full" : ""}`} onClick={() => setIconMode(!iconMode)}>
          Toggle Icon Mode
        </button>

        <div className={` h-screen w-screen sm:w-1/2 md:w-1/4 z-100 bg-[#39304f] ${iconMode ? "absolute" : "hidden w-0"}`}>
          <div className={` flex-col h-full ${iconMode ? "flex" : "hidden"}`}>
            <div className="bg-[#413b60] rounded-md">
              <div className="flex flex-row text-white ">
                <div className="relative">
                  <img
                    src={imageUrl} // Provide a placeholder image path
                    alt={"avatar"}
                    className="rounded-full w-10 h-10"
                  />
                  <label htmlFor="image-upload" className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 cursor-pointer hover:bg-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
                <div className="flex justify-center flex-col ml-2">
                  <p>{name}</p>
                  <p>Edit Profile {">"}</p>
                  <button onClick={handleSignout}>sign out</button>
                </div>
              </div>
            </div>
            <div className="bg-[#413b60] rounded-md flex h-full w-full mt-8">
              <div className="flex flex-col w-full my-4">
                <div className="flex justify-center">
                  <div className="flex items-center justify-center pb-4 border-b-2 w-2/3">
                    <div className="text-white font-bold text-2xl">Title</div>
                  </div>
                </div>
                <div className="text-white w-full ">
                  {links.map((linkItem, index) => (
                    <Link href={linkItem.link}>
                      <div key={index} className="hover:bg-gradient-to-r from-[#22f2e4]/50 to-transparent hover:border-l-4 border-[#22f2e4] py-1 first:mt-4">
                        <div className="text-white flex">
                          <img className="pl-2" src={linkItem.img} style={{ filter: "brightness(0) invert(1)" }} />
                          <div className="ml-4">
                            {" "}
                            <p>{linkItem.name}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
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
                      .filter(userItem => userItem.email !== props) // Filter out the user with the same email
                      .map((userItem, index) => (
                        <div key={index}>
                          <Listusers props={userItem} />
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
