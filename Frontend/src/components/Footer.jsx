import React from "react";

function Footer() {
    return <div className="footer">
        <div className="desc">
            <h2>Panto</h2>
            <p>The advantage of hiring a workspace with us is that it gives you
                comfortable service and all-around facilities.
            </p>
        </div>
        <div className="services">
            <p>Services</p>
            <ul>
                <li>Email Marketing</li>
                <li>Campaigns</li>
                <li>Branding</li>
            </ul>
        </div>
        <div className="furniture">
            <p>Furniture</p>
            <ul>
                <li>Beds</li>
                <li>Chair</li>
                <li>All</li>
            </ul>
        </div>
        <div className="follow">
            <p>Follow Us</p>
            <ul>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
            </ul>
        </div>

        <div className="copyright">
            <p>Copyright © 2026</p>
            <div className="terms">
                <p>Terms & Conditions</p>
                <p>Privacy Poilcy</p>            
            </div>
        </div>
    </div>
}

export default Footer;