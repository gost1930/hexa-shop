import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "../../context/ThemeProvider";
import { useMemo } from "react";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LineChart = () => {
  const { isDarkMode } = useTheme();

  const textColor = isDarkMode ? "#fff" : "#333";
  const gridColor = isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)";

  const data = useMemo(() => ({
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [10, 20, 30, 25, 40],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 3,
        pointRadius: 6,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#fff",
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#ff6384",
        pointHoverBorderColor: "#fff",
        tension: 0.4,
      },
    ],
  }), [isDarkMode]);

  const options = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: textColor,
          font: { size: 14, weight: "bold" },
        },
      },
      tooltip: {
        backgroundColor: isDarkMode ? "#222" : "#fff",
        titleColor: isDarkMode ? "#fff" : "#000",
        bodyColor: isDarkMode ? "#fff" : "#000",
      },
    },
    scales: {
      x: {
        ticks: { color: textColor, font: { size: 12 } },
        grid: { color: gridColor },
      },
      y: {
        ticks: { color: textColor, font: { size: 12 } },
        grid: { color: gridColor },
      },
    },
  }), [isDarkMode]);

  return <Line data={data} options={options} />;
};

export default LineChart;
