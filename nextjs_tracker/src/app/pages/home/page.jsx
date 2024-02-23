"use client";

import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import { useRouter } from "next/navigation";
import Listusers from "@/app/components/Listusers";
import Barchart from "@/app/components/Barchart";
import Doughnutchart from "@/app/components/Doughnutchart";

import { DateRangePicker, DateRangePickerItem, DateRangePickerValue } from "@tremor/react";
import Linechart from "@/app/components/Linechart";

export default function Dashboard(props) {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState();
  const router = useRouter();
  const DateRangePickerValue = {
    from: new Date(2023, 1, 1),
    to: new Date(),
  };
  const [value, setValue] = useState(DateRangePickerValue);

  let table = ["random", "random", "random", "random", "random", "random"];

  async function fetchImageUrl(userName) {
    const storagePath = `avatar`;
    const { data, error } = await supabase.storage.from(storagePath).getPublicUrl(userName + ".png");

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

  useEffect(() => {
    const user = users.find(user => user.email === props.props);
    console.log(users);
    if (user) {
      // If a matching user is found, set the name state to the user's name
      setName(user.name);
    } else {
      // If no matching user is found, you can handle it as per your requirement
      setName("User not found");
    }
  }, [users]);

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
    <main className=" flex h-full w-full font-roboto justify-end flex-col mt-8">
      <div className="ecra flex">
        <div className="flex w-full flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="">
              <Barchart title={"Done trips"} />
            </div>
            <div className="bg-[#413b60] rounded-md flex">
              <div className="flex flex-col w-full my-4">
                <div className="flex justify-center">
                  <div className="flex items-center justify-center border-b w-full flex-col text-white">
                    <div className="font-bold text-2xl">Trips</div>
                    <div className="flex flex-row w-full justify-around">
                      {table.map((item, index) => (
                        <div className="flex justify-around" key={index}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  {loaded &&
                    users
                      .filter(userItem => userItem.email !== props.props) // Filter out the user with the same email
                      .map((userItem, index) => (
                        <div key={index}>
                          <Listusers props={userItem} />
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row w-full mt-10">
            <div className="w-full lg:w-1/2 flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 mb-4 lg:mb-0 lg:mr-4">
                <Doughnutchart title={"How many are working"} />
              </div>
              <div className="bg-[#413b60] rounded-lg flex flex-col w-full lg:w-1/2">
                <div className="flex justify-center">
                  <div className="font-bold text-2xl text-white">Working people</div>
                </div>
                <div>
                  {loaded &&
                    users
                      .filter(userItem => userItem.email !== props.props) // Filter out the user with the same email
                      .map((userItem, index) => (
                        <div key={index}>
                          <Listusers props={userItem} />
                        </div>
                      ))}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 mt-4 lg:mt-0 lg:ml-4">
              <Linechart title={"Fuel consumed"} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
