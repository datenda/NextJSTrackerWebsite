"use client";
import Link from "next/link";

export default function Navbar({ showNavbar = true }) {
  const links = [
    { name: "Dashboard", link: "", img: "/images/graph.svg" },
    { name: "Workers", link: "", img: "/images/worker.svg" },
    { name: "Vehicles", link: "", img: "/images/vehicle.svg" },
    { name: "Trips", link: "", img: "/images/travel.svg" },
  ];

  return (
    showNavbar && (
      <div className="bg-[#413b60] rounded-md flex h-full w-full mt-8">
        <div className="flex flex-col w-full my-4">
          <div className="flex justify-center">
            <div className="flex items-center justify-center pb-4 border-b-2 w-2/3">
              <div className="text-white font-bold text-2xl">Title</div>
            </div>
          </div>
          <div className="text-white w-full ">
            {links.map((linkItem, index) => (
              <div
                key={index}
                className="hover:bg-gradient-to-r from-[#22f2e4]/50 to-transparent hover:border-l-4 border-[#22f2e4] py-1 first:mt-4"
              >
                <div className="text-white flex">
                  <img
                    className="pl-2"
                    src={linkItem.img}
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                  <div className="ml-4">{linkItem.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
