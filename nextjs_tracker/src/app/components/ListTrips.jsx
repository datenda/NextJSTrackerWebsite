import React from "react";

export default function ListTrips(trips) {
  const trip = trips.trips;
  console.log(trip);
  return (
    <div className="flex flex-row w-full justify-around items-center text-center mt-4">
      <div className="w-8">{trip.driver}</div>
      <div className="w-16 mr-8">{trip.vehicle}</div>
      <div className="w-24 ">{trip.date_starting_point}</div>
      <div className="w-24">{trip.date_arrival}</div>
      <div className="w-16">{trip.arrival}</div>
      <div className="w-16 mr-4">{trip.starting_point}</div>
      <div className="w-16 mr-8">{trip.time_starting_point}</div>
      <div className="w-16">{trip.time_arrival}</div>
    </div>
  );
}
