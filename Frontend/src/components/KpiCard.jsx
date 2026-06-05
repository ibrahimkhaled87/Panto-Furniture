import { useState } from "react"
import ChartComponent from "./ChartComponent";
import api from "../utils/axios";

export default function KpiCard(props) {
    let data = {};

    const preparedData = {
        totalSales: {
            icon: "images/bag.svg", 
            accent: "#8B5CF6", 
            percentage: "+4.45%"
        },
        newCustomers: {
            icon: "images/kpi/new-customers.svg",
            accent: "#3B82F6",
            percentage: "+3.14%"
        },
        pendingOrders: {
            icon: "images/kpi/pending-orders.svg",
            accent: "#F59E0B",
            percentage: "-2.84%"
        },
        conversionRate: {
            icon: "images/kpi/conversion-rate.svg",
            accent: "#10B981",
            percentage: "+0.16%"
        }
    }

    if(props.name === "Total Sales")
        data = preparedData.totalSales;
    else if(props.name === "New Customers") 
        data = preparedData.newCustomers;
    else if(props.name === "Pending Orders") 
        data = preparedData.pendingOrders;
    else if(props.name === "Conversion Rate") 
        data = preparedData.conversionRate;


    return <div className="kpi-card">
        <div className="row">
            <img src={data.icon} alt="" style={{backgroundColor: data.accent}}/>
            <p className="name">{props.name}</p>
        </div>
        <div className="row">
            <p className="value" style={{color: data.accent}}>{props.value}</p>
        </div>
        <div className="row">
            <p className="percentage" style={{backgroundColor: parseFloat(data.percentage)>0? "#DCFCE7" : "#FEE2E2"}}>{data.percentage}</p>
            <p>vs Last Week</p>
        </div>
    </div>
}