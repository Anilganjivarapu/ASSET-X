import React, { useState } from "react";
import API from "../api";

const Deposit = () => {
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");

    const handleDeposit = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found, please log in again.");
            setMessage("Please log in first.");
            return;
        }

        try {
            const { data } = await API.post("/transactions/deposit", { amount }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage(data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "Deposit failed");
        }
    };

    return (
        <div>
            <h2>Deposit</h2>
            <input 
                type="number" 
                placeholder="Enter amount" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
            />
            <button onClick={handleDeposit}>Deposit</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Deposit;
