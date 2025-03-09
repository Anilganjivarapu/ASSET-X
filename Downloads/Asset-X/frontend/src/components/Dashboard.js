import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await API.get("/accounts/balance", {
                    headers: { Authorization: token },
                });
                setBalance(data.balance);
            } catch (error) {
                alert("Error fetching balance!");
            }
        };
        fetchBalance();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <h3>Balance: ₹{balance}</h3>
            <button onClick={() => navigate("/deposit")}>Deposit</button>
            <button onClick={() => navigate("/withdraw")}>Withdraw</button>
        </div>
    );
};

export default Dashboard;
