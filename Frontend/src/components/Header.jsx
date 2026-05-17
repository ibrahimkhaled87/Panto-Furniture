import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import useTokenDecode from "../hooks/useTokenDecode";
import { useGuestCart } from "../context/GuestCartContext";

function Header() {    
    // mobile menu click
    function menuClick() {
        console.log("menu is clicked!!!")
        const menu = document.querySelector(".header ul");
        menu.classList.toggle("show-menu");
    }

    //cart count
    const {guestCart, updateItem} = useGuestCart();
    const [cartCount, setCartCount] = useState(0);
    useEffect(() => {
        setCartCount(guestCart.length);
    }, [guestCart])

    //Token decode
    const {payload} = useTokenDecode();


    return <div className="header">
        <div className="logo">
            <h3><Link to="/" className="no-link">Panto</Link></h3>
        </div>
        <div className="nav">
            <img src="images/menu.svg" alt="" className="mobile-menu" onClick={menuClick}/>
            <ul>
                <li className="close" onClick={menuClick}>x</li>
                <li>Furniture</li>
                <li><Link to="/shop" className="no-link">Shop</Link></li>
                <li>About Us</li>
                <li>Contact</li>
            </ul>
        </div>
        <div className="right">
            <div className="loginBtn">
                {payload ? 
                    <Link to="/user" className="profile">
                        <img src="images/profile.svg" alt="" />
                    </Link> : 
                    <Link to="/login" className="no-link login">Login</Link>
                }
            </div>
            <Link to="/cart" className="no-link">
                <div className="cartBtn">
                    <img src="images/bag.svg" alt="" />
                    <p>{cartCount}</p>
                </div>
            </Link>
        </div>
    </div>
}


export default Header;