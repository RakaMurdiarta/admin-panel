import React from "react";
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
import { useUserContext } from "../context/userContext";
import { UseProducts } from "../context/productContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const LineChart = () => {
  const { users } = useUserContext();
  const { products } = UseProducts();

  const month = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const handleFilter = (month) => {
    const filter = users.filter((f) => {
      return new Date(f.createdAt).getMonth() + 1 === month;
      // return f.title === "Smartwatch black metal";
    });
    return filter;
  };

  const dataMaping = users.map((p) => {
    return {
      x: month[new Date(p.createdAt).getMonth()],
      y: handleFilter(new Date(p.createdAt).getMonth() + 1).length,
    };
  });

  const data2 = dataMaping // cara mendapatkan nilai unik tanpa agregat
    .filter(
      (item, index, self) => self.findIndex((t) => t.x === item.x) === index
    )
    .map((item) => ({ x: item.x, y: item.y }));

  const dataMapingUser = data2.sort((a, b) => {
    const aMonth = month.indexOf(a.x);
    const bMonth = month.indexOf(b.x);
    return aMonth - bMonth;
  });

  const options = {
    responsiveAnimationDuration: 1000,
    animations: {
      duration: 2000,
      easing: "linear",
      from: 3,
      to: 0,
    },
    responsive: true,
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
      events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
    },
    plugins: {
      legend: {
        position: "chartArea",
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
      tooltip: {
        backgroundColor: "rgba(47, 40, 42, 0.8)",
        usePointStyle: true,
        padding: 10,
        bodyFont: {
          size: 10,
          width: 100,
        },
        callbacks: {
          label: (context) => {
            return "user" + ": " + context.parsed.y;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
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
          padding: 10,
        },
        border: {
          color: "white",
        },
      },
    },
  };

  const labels = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Data Set 1",
        data: dataMapingUser,
        borderColor: "rgba(42, 36, 37, 0.8)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointStyle: "circle",
        pointRadius: 6, // ukuran symbol
        pointBackgroundColor: "white", // warna symbol
        pointBorderColor: "rgba(42, 36, 37, 0.8)", // warna border symbol
        pointBorderWidth: 2, // lebar border symbol
        tension: 0.1,
      },
    ],
  };
  return <Line data={data} options={options} height={"80%"} />;
};

export default LineChart;
