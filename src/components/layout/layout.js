import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import "./layout.css";

// create a layout component that standardizes body (content) in between navigation bar at the top and footer at the bottom of css-grid
function Layout({children}) {
    
    return (
        <div className="layout-content">
            <Navbar />
            <div className="layout-body">
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default Layout;