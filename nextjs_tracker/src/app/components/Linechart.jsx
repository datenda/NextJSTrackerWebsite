import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Linechart(title) {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  useEffect(() => {
    setChartData({
      labels,
      datasets: [
        {
          label: "Dataset 1",
          data: labels.map(() =>
            faker.datatype.number({ min: -1000, max: 1000 })
          ),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Dataset 2",
          data: labels.map(() =>
            faker.datatype.number({ min: -1000, max: 1000 })
          ),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    });
    setChartOptions({
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: "white", // Set legend text color to white
          },
        },
        title: {
          display: true,
          text: title.title,
          color: "white", // Set title text color to white
        },
      },
      scales: {
        x: {
          ticks: {
            color: "white", // Set x-axis label text color to white
          },
        },
        y: {
          ticks: {
            color: "white", // Set y-axis label text color to white
          },
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, []);

  return (
    <div className="w-full bg-[#413b60] rounded-md ml-4 h-full">
      <Line options={chartOptions} data={chartData} />
    </div>
  );
}
