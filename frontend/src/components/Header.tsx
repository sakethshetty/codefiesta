import React from "react";
import { Link } from "react-router-dom";

export default function Header() {

    return (
        <div className="header">
            {/* <img src="../assets/gdscLogo.jpeg" alt="Logo" /> */}
            <h1>Codefiesta LeaderBoard</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                </ul>
            </nav>
        </div>
    )
}

