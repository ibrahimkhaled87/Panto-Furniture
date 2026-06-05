import { useLocation, useNavigate, Link, Outlet } from "react-router-dom"
import useTokenDecode from "../hooks/useTokenDecode";

export default function UserLayout() {
    //Get title
    const location = useLocation();
    const getTitle = () => {
        if(location.pathname==="/user") return "Dashboard";
        else if(location.pathname === "/user/order-history") return "Order History";
        else if(location.pathname === "/user/settings") return "Settings";
    }

    //Decode token
    const {payload} = useTokenDecode();

    //Logout
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }


    if(!payload) return <p>Loading...</p>;

    return <div className="userLayout">
        <div className="sideBar">
            <h2 onClick={() => navigate("/")}>Panto</h2>
            <ul>
                <li><Link className="navbar-item" to="/user">Dashboard</Link></li>
                <li><Link className="navbar-item" to="/user/order-history">Order History</Link></li>
                <li><Link className="navbar-item" to="/user/settings">Settings</Link></li>
            </ul>
            <div className="logged-user">
                <img src="/images/profile.svg" alt="" />
                <div className="info">
                    <h4>{`${payload.f_name} ${payload.l_name}`}</h4>
                    <p>User</p>
                </div>
            </div>
        </div>

        <div className="content">
            <div className="top-row">
                <h1>{getTitle()}</h1>
                <div className="logout" onClick={logout}>
                    <img src="/images/logout.svg" alt="" />
                    <p>Logout</p>
                </div>
            </div>

            <Outlet />
        </div>
    </div>
}