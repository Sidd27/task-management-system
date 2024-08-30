import { Bar } from "react-chartjs-2";
import { Card, CardContent } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CompletedPendingChart = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  // Memoized counts of completed and pending tasks
  const { completedCount, pendingCount } = useMemo(() => {
    const counts = {
      completedCount: 0,
      pendingCount: 0,
    };

    tasks.forEach((task) => {
      if (task.status === "completed") {
        counts.completedCount += 1;
      } else if (task.status === "pending") {
        counts.pendingCount += 1;
      }
    });

    return counts;
  }, [tasks]);

  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Tasks",
        data: [completedCount, pendingCount], // Example data
        backgroundColor: ["#4caf50", "#ff9800"],
        borderColor: ["#388e3c", "#f57c00"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Task Completion Overview</h2>
        <Bar data={data} options={options} />
      </CardContent>
    </Card>
  );
};

export default CompletedPendingChart;
