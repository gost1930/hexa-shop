import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "../../context/ThemeProvider";
import { useMemo } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const { isDarkMode } = useTheme();

  const textColor = isDarkMode ? "#fff" : "#333";
  const backgroundColors = isDarkMode
    ? ["rgba(200, 200, 255, 0.8)", "rgba(100, 149, 237, 0.8)", "rgba(70, 130, 180, 0.8)", "rgba(25, 25, 112, 0.8)"]
    : ["rgba(173, 216, 230, 0.8)", "rgba(135, 206, 235, 0.8)", "rgba(70, 130, 180, 0.8)", "rgba(25, 25, 112, 0.8)"];

  const hoverBackgroundColors = backgroundColors.map(color => color.replace("0.8", "1")); // تكثيف الألوان عند التحويم

  // بيانات الرسم البياني
  const data = useMemo(() => ({
    labels: ["Light Blue", "Sky Blue", "Deep Blue", "Navy Blue"],
    datasets: [
      {
        label: "Distribution",
        data: [20, 30, 25, 25],
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverBackgroundColors,
        borderColor: isDarkMode ? "#1d293d" : "#fff",
        borderWidth: 2,
        cutout: "70%",
      },
    ],
  }), [isDarkMode]);

  // إعدادات المخطط
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
        bodyFont: { size: 14 },
      },
    },
  }), [isDarkMode]);

  return <Doughnut data={data} options={options} />;
};

export default PieChart;
