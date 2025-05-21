import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);


const StatsChart = ({ statics }) => {
  const data = {
    labels: statics.map((item) => item.name),
    datasets: [
      {
        label: "عدد الزيارات",
        data: statics.map((item) => item.visitCount),
        backgroundColor: "#ff7043",
        borderRadius: 10,
      },
      {
        label: "المبلغ القبوض",
        data: statics.map((item) => item.totalAmountReceived),
        backgroundColor: "#18ffff",
        borderRadius: 10,
      },
    ],
  };

  const options = {
  plugins: {
    title: {
      display: true,
    
      font: {
        size: 24,
      },
    },
    tooltip: {
      bodyFont: {
        size: 16,
      },
      titleFont: {
        size: 18,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          size: 18,
        },
      },
      title: {
        display: true,
        font: {
          size: 24,
        },
      },
    },
    y: {
      ticks: {
        font: {
          size: 18,
        },
      },
      title: {
        display: true,
        font: {
          size: 24,
        },
      },
    },
  },
};
  return <Bar data={data} options={options} />;
};

export default StatsChart;
