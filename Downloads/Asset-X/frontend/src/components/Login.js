import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/users/login", { email, password });
            const token = response.data.token;

            if (!token) {
                alert("Login failed: No token received!");
                return;
            }

            console.log("Received Token:", token); // Debugging
            localStorage.setItem("token", token); // Store token
            console.log("Stored Token:", localStorage.getItem("token")); // Verify

            navigate("/dashboard");
        } catch (error) {
            alert("Invalid credentials!");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
