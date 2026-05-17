import { Chart } from "chart.js/auto";
import { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

export function RevenueChart({revenueData}) {
    const data = {
        labels: revenueData?.map(item => new Date(item.day).toDateString()) || [],
        datasets: [
        {
            label: "Revenue",
            data: revenueData?.map(item => item.revenue) || [],
            backgroundColor: "blue",
            barThickness: 40
        }
        ]
    };
    const options = {
        scales: {
        y: {
            min: 0,
            max: 10000,
            ticks: {stepSize: 2000}
        }
        }
    };

    return (
        <div style={{width: "100%", display: "flex", gap: "3em"}}>
            <Line data={data} options={options}/>
        </div>
    );
}


export function CategoryChart({ categoryData }) {
    const COLORS = [
        "#8B5CF6",
        "#3B82F6",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#14B8A6"
    ];
    const data = {
        labels: categoryData?.map(item => item.type) || [],
        datasets: [
        {
            label: "Revenue",
            data: categoryData?.map(item => Number(item.cat_net)) || [],
            backgroundColor: COLORS,
            borderWidth: 0,
            hoverOffset: 10,
            spacing: 2
        }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        legend: {
            position: "right",
            labels: {
            usePointStyle: true,
            pointStyle: "circle",
            padding: 16,
            font: {
                size: 12,
                weight: "500"
            }
            }
        },
        tooltip: {
            backgroundColor: "#111827",
            padding: 12,
            cornerRadius: 8,
            titleColor: "#fff",
            bodyColor: "#D1D5DB"
        }
        },
        cutout: "60%" // makes it more modern (donut style)
    };

    return (
        <div
        style={{
            height: "260px",
            padding: "16px",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
        >
        <Pie data={data} options={options} />
        </div>
    );
}