import axios from "axios";
import { RevenueChart, CategoryChart } from "../../components/ChartComponent";
import { useEffect, useState } from "react";
import KpiCard from "../../components/KpiCard";

function AdminDashboard() {
    const [revenue, setRevenue] = useState();
    const [totalSales, setTotalSales] = useState();
    const [pending, setPending] = useState();
    const [categories, setCategories] = useState();
    useEffect(() => {
        const getRevenue = async () => {
            try {
                const response = await axios.get("analytics/revenue");
                setRevenue(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getRevenue();

        const getTotalSales = async () => {
            try {
                const response = await axios.get("/analytics/revenue");
                const total_sales = response.data.reduce((acc, item) => acc + Number(item.revenue), 0);
                setTotalSales(total_sales);
            } catch (error) {
                console.log(error);
            }
        }
        getTotalSales();

        const getPending = async () => {
            try {
                const response = await axios.get("/analytics/pending");
                setPending(response.data[0].pending_orders);
            } catch (error) {
                console.log(error);
            }
        }
        getPending();

        const getCategoryPercentages = async () => {
            try {
                const response = await axios.get("/analytics/categories");
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCategoryPercentages();
    }, [])

    return <div className="adminDashboard">
        <div className="kpi">
            <KpiCard name="Total Sales" value={"$"+totalSales?.toFixed(2)} />
            <KpiCard name="New Customers" value="1,314" />
            <KpiCard name="Pending Orders" value={pending} />
            <KpiCard name="Conversion Rate" value="2.16%" />
        </div>
        <div className="charts">
            <div className="chart">
                <h4>Sales Overview</h4>
                <RevenueChart revenueData={revenue} />
            </div>
            <div className="chart">
                <h4>Sales by Category</h4>
                <CategoryChart categoryData={categories} />
            </div>
        </div>
        Low stock alerts
    </div>
}

export default AdminDashboard;