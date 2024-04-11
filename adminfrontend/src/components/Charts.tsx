/** @format */

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface BarChartProps {
  datasets: {
    data: number[];
    labels: string[];
    label: string;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
  }[];
}

const BarChart: React.FC<BarChartProps> = ({ datasets }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart>();

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: datasets[0].labels,
            datasets: datasets.map((dataset) => ({
              label: dataset.label,
              data: dataset.data,
              backgroundColor:
                dataset.backgroundColor || "rgba(54, 162, 235, 0.5)",
              borderColor: dataset.borderColor || "rgba(54, 162, 235, 1)",
              borderWidth: dataset.borderWidth || 1,
            })),
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [datasets]);

  return <canvas ref={chartRef} />;
};

export default BarChart;
