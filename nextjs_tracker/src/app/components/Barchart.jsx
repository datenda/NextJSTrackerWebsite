import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Barchart(title) {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Trips made",
          data: [18127, 22201, 19490, 17938, 24182, 17842, 22475],
          borderColor: "rgb(3, 194, 252)",
          backgroundColor: "rgb(3, 194, 252, 0.7)",
          textColor: "rgb(255, 255, 255)",
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
        tooltip: {
          enabled: true,
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Set tooltip background color
          titleColor: "white", // Set tooltip title text color to white
          bodyColor: "white", // Set tooltip body text color to white
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
    <div className="bg-[#413b60] w-full rounded-md ml-4 text-white">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
