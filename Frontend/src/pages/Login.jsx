import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

function Login() {
    //Read credintials from inputs
    const [credintials, setCredintials] = useState({user: "", pass: ""});
    function handleChange(e) {
        const {name, value} = e.target;
        console.log(name, value);
        setCredintials(prev => ({
            ...prev,
            [name]: value
        }))
    } 
    //Send login route
    const navigate = useNavigate();
    const login = async (e) => {
        e.preventDefault(); //stop page refresh
        try {
            localStorage.removeItem("token");
            const response = await axios.post("/auth/login", credintials);
            localStorage.setItem("token", response.data.token);
            alert("Login successful");
            navigate("/user");
        } catch (error) {
            alert(error.response?.data?.error || "Login failed");
        }
    }

    return <div className="login">
        <Header />
        <div className="login-form">
            <p>Welcome Back</p>
            <form onSubmit={login} method="post">
                <input type="text" name="user" placeholder="Enter username" onChange={handleChange} required/>
                <input type="password" name="pass" placeholder="Enter password" onChange={handleChange} required/>
                <button type="submit">Login</button>
            </form>

            <div className="sign-up">
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
        <div className="background">
            <div className="ball"></div>
        </div>
    </div>
}

export default Login;