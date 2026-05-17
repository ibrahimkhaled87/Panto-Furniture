import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

function Signup() {
    //Read credintials from inputs
    const [form, setForm] = useState({f_name: "", l_name: "", user: "", pass: "", confirm_pass: ""});
    function handleChange(e) {
        const {name, value} = e.target;
        console.log(name, value);
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    } 
    //Send signup route
    const navigate = useNavigate();
    const signup = async (e) => {
        e.preventDefault(); //stop page refresh
        try {
            const response = await axios.post("/auth/signup", form);
            alert(response.data);
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.error || "Signup failed");
        }
    }

    return <div className="signup">
        <Header />
        <div className="signup-form">
            <p>Create an account</p>
            <form onSubmit={signup} method="post">
                <div className="name">
                    <label htmlFor="f_name">First Name</label>
                    <label htmlFor="f_name">Last  Name</label>
                    <input type="text" name="f_name" placeholder="Enter first name" onChange={handleChange} required/>
                    <input type="text" name="l_name" placeholder="Enter last name" onChange={handleChange} required/>
                </div>
                <label htmlFor="user">Username</label>
                <input type="text" name="user" placeholder="Enter username" onChange={handleChange} required/>
                <label htmlFor="pass">Password</label>
                <input type="password" name="pass" placeholder="Enter password" onChange={handleChange} required/>
                <label htmlFor="confirm_pass">Confirm Password</label>
                <input type="password" name="confirm_pass" placeholder="Confirm password" onChange={handleChange} required/>
                <button type="submit">Signup</button>
            </form>

            <div className="sign-up">
                <p>Already a member? <Link to="/login">Login</Link></p>
            </div>
        </div>
        <div className="background">
            <div className="ball"></div>
        </div>
    </div>
}

export default Signup;