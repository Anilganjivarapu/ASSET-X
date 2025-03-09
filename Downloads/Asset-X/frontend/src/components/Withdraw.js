import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Withdraw = () => {
    const [amount, setAmount] = useState("");
    const navigate = useNavigate();

    const handleWithdraw = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await API.post("/transactions/withdraw", { amount }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Amount withdrawn successfully!");
            navigate("/dashboard");
        } catch (error) {
            alert("Withdrawal failed!");
        }
    };

    return (
        <div>
            <h2>Withdraw</h2>
            <form onSubmit={handleWithdraw}>
                <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                <button type="submit">Withdraw</button>
            </form>
        </div>
    );
};

export default Withdraw;
