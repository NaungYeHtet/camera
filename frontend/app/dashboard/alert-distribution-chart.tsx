"use client";

import { Chart, ChartData, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
Chart.register(ArcElement, Tooltip, Legend);

type AlertDistributionProps = {
  cameras: Camera[];
};

type DoughnutChartData = ChartData<"doughnut", number[], string>;

export default function AlertDistributionChart({
  cameras,
}: AlertDistributionProps) {
  const [chartData, setChartData] = useState<DoughnutChartData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_PATH}/alerts/distribution`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cameraIds: cameras.map((camera) => camera.id),
            }),
          }
        );

        const data = await response.json();

        const labels = Object.keys(data);
        const counts = Object.values(data);
        console.log(labels, data);

        setChartData({
          labels,
          datasets: [
            {
              data: counts as number[],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch alert distribution:", error);
      }
    };

    fetchData();
  }, [cameras]);

  return (
    <>
      <h4 className="">Alert Distribution</h4>
      {chartData ? (
        <Doughnut
          data={chartData}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: "white",
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                },
              },
            },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
