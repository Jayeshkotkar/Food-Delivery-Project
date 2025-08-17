import React from 'react'
import './Footer.css';
import { assets } from '../../assets/assets.js';

export const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-container">
                <div className="footer-container-left">
                    <img src={assets.logo} alt="logo" />
                    <p>Tomato is a food delivery app that allows you to order food from your favorite restaurants.</p>
                    <div className="social-icons">
                        <img src={assets.facebook_icon} alt="facebook" />
                        <img src={assets.twitter_icon} alt="twitter" />
                        <img src={assets.linkedin_icon} alt="linkedin" />
                    </div>
                </div>

                <div className="footer-container-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div className="footer-container-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91 xxxxxxxxxx</li>
                        <li>foodie@tomato.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <div className="footer-copyright">
                <p>Copyright © 2025 Tomato.com . All rights reserved.</p>
            </div>

        </div>
    )
}
