import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { UseProducts } from "../context/productContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Barchart = () => {
  const { products } = UseProducts();

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        backgroundColor: "rgba(47, 40, 42, 0.8)",
        usePointStyle: true,
        padding: 10,
        bodyFont: {
          size: 14,
          width: 100,
        },
        callbacks: {
          label: (context) => {
            return "price" + ": " + "Rp." + context.parsed.y;
          },
        },
      },
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          offset: true,
        },
        border: {
          color: "white",
        },
        ticks: {
          padding: 4,
          font: {
            size: 15,
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        min: 0,
        ticks: {
          beginAtZero: true,
          font: {
            size: 15,
          },
          callback: function (value, index, ticks) {
            return "Rp." + value;
          },
          padding: 10,
        },
        border: {
          color: "white",
        },
      },
    },

    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
      events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
    },
    responsiveAnimationDuration: 1000,
    animations: {
      duration: 2000,
      easing: "linear",
      from: 3,
      to: 0,
    },
  };

  const labels = products.map((p) => {
    const { title } = p;
    return title;
  });
  const dataChart = products.map((p) => {
    const { title, price } = p;
    return { x: title, y: price };
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Product",
        data: dataChart,
        borderColor: "rgba(42, 36, 37, 0.8)",
        backgroundColor: ["rgba(43, 60, 187, 0.8)"],
        pointStyle: "circle",
        pointRadius: 6, // ukuran symbol
        pointBackgroundColor: "white", // warna symbol
        pointBorderColor: "rgba(42, 36, 37, 0.8)", // warna border symbol
        pointBorderWidth: 2,
        borderWidth: 2,
        hoverBackgroundColor: "rgba(91, 103, 195, 0.8)",
        barThickness: 40,
        barPercentage: 0.5,
        borderRadius: 5,
      },
    ],
  };
  return <Bar data={data} options={options} height={"70%"} />;
};

export default Barchart;
