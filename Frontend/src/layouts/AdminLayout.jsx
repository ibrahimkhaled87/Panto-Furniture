import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";

function AdminLayout() {
    const location = useLocation();
    function getTitle() {
        if(location.pathname === "/admin") return "Dashboard";
        else if(location.pathname === "/admin/products") return "Products";
        else if(location.pathname === "/admin/orders") return "Orders";
        else if(location.pathname === "/admin/users") return "Users";
    }

    //Navigation object
    const navigate = useNavigate();

    return <div className="adminLayout">
        <div className="sideBar">
            <h2 onClick={() => navigate("/")}>Panto</h2>
            <ul>
                <li><Link className="navbar-item" to="/admin">Dashboard</Link></li>
                <li><Link className="navbar-item" to="/admin/products">Products</Link></li>
                <li><Link className="navbar-item" to="/admin/orders">Orders</Link></li>
                <li><Link className="navbar-item" to="/admin/users">Users</Link></li>
            </ul>
            <div className="logged-user">
                <img src="/images/profile.svg" alt="" />
                <div className="info">
                    <h4>Ibrahim Khaled</h4>
                    <p>Admin</p>
                </div>
            </div>
        </div>

        <div className="content">
            <div className="top-row">
                <h1>{getTitle()}</h1>
                <div className="logout">
                    <img src="/images/logout.svg" alt="" />
                    <p>Logout</p>
                </div>
            </div>

            <Outlet />
        </div>
    </div>
}

export default AdminLayout;