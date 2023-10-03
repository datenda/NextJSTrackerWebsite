import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Doughnutchart(title) {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ["On site", "Resting"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19],
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
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

      maintainAspectRatio: false,
      responsive: true,
    });
  }, []);
  return (
    <div className="bg-[#413b60] rounded-md ml-4 text-white pb-4 h-full text-xl">
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
}
