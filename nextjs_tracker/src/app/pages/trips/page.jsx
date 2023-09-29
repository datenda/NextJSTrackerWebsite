"use client";

import React, { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import ListTrips from "@/app/components/ListTrips";

const DataCollectionForm = () => {
  const [formData, setFormData] = useState({
    vehicle: "",
    startingPoint: "",
    arrival: "",
    driver: "",
    date_arrival: "",
    date_starting_point: "",
    timeFromStart: "",
    timeFromArrival: "",
  });
  const [trips, setTrips] = useState({
    vehicle: "",
    startingPoint: "",
    arrival: "",
    driver: "",
    date_arrival: "",
    date_starting_point: "",
    timeFromStart: "",
    timeFromArrival: "",
  });

  let table = [
    "driver",
    "vehicle",
    "date of starting point",
    "date of arrival",
    "arrival",
    "starting point",
    "time start",
    "time of arrival",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [workers, setWorkers] = useState([{ name: "No workers" }]);
  const [vehicle, setVehicle] = useState([{ vehicle: "no vehicle" }]);
  const [loading, setLoading] = useState(false);

  async function handleList() {
    let { data: Workers, error } = await supabase.from("Workers").select("*");
    setWorkers(Workers);

    let { data: Travels, error1 } = await supabase.from("Travels").select("*");
    setTrips(Travels);

    let { data: Vehicles, error2 } = await supabase
      .from("Vehicles")
      .select("car");
    setVehicle(Vehicles);
    setLoading(true);
  }

  useEffect(() => {
    handleList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("Travels")
      .insert([
        {
          vehicle: "Mercedes Benz",
          driver: formData.driver,
          arrival: formData.arrival,
          date_arrival: formData.date_arrival,
          time_arrival: formData.timeFromArrival,
          date_starting_point: formData.date_starting_point,
          time_starting_point: formData.timeFromStart,
          starting_point: formData.startingPoint,
        },
      ])
      .select();
    setTrips([...trips, formData]);
    console.log(error);
  };

  return (
    <div className=" flex font-roboto justify-end flex-col text-white">
      <div className="text-white text-center uppercase">
        <p className="text-6xl">Trips</p>
      </div>

      <div className=" ml-8 flex w-full">
        <div className="bg-[#413b60] w-3/4 rounded-lg">
          <div className="flex flex-row w-full justify-around mt-4 border-b ">
            {table.map((item, index) => (
              <div key={index} className="">
                {item}
              </div>
            ))}
          </div>
          {loading &&
            trips.map((trip) => (
              <div className="" key={trip.id}>
                <ListTrips trips={trip} />
              </div>
            ))}
        </div>
        <div className="flex w-1/5 ml-8 ">
          <div className="p-6 rounded-lg shadow-lg text-white bg-[#413b60]">
            <h1 className="text-2xl font-semibold mb-4">
              Data Collection Form
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="startingPoint"
                  className="block mb-2 font-medium"
                >
                  Starting Point:
                </label>
                <input
                  type="text"
                  id="startingPoint"
                  name="startingPoint"
                  value={formData.startingPoint}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-black"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="arrival" className="block mb-2 font-medium">
                  Arrival:
                </label>
                <input
                  type="text"
                  id="arrival"
                  name="arrival"
                  value={formData.arrival}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-black"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="driver" className="block mb-2 font-medium">
                  Driver:
                </label>
                <select
                  id="driver"
                  name="driver"
                  value={formData.driver}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-black"
                  required
                >
                  {vehicle.map((vehicle, index) => (
                    <option key={index} value={vehicle.car}>
                      {vehicle.car}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="driver" className="block mb-2 font-medium">
                  Driver:
                </label>
                <select
                  id="driver"
                  name="driver"
                  value={formData.driver}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-black"
                  required
                >
                  {workers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="date" className="block mb-2 font-medium">
                  Date of starting point:
                </label>
                <input
                  type="date"
                  id="date_starting_point"
                  name="date_starting_point"
                  value={formData.date_starting_point}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-black"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="date" className="block mb-2 font-medium">
                  Date of arrival:
                </label>
                <input
                  type="date"
                  id="date_arrival"
                  name="date_arrival"
                  value={formData.date_arrival}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-black"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="timeFromStart"
                  className="block mb-2 font-medium"
                >
                  Time from Starting Point:
                </label>
                <input
                  type="time"
                  id="timeFromStart"
                  name="timeFromStart"
                  value={formData.timeFromStart}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-black"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="timeFromArrival"
                  className="block mb-2 font-medium"
                >
                  Time from Arrival:
                </label>
                <input
                  type="time"
                  id="timeFromArrival"
                  name="timeFromArrival"
                  value={formData.timeFromArrival}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-black"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCollectionForm;
