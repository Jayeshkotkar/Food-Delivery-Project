import React from 'react'
import './AppDownload.css';
import { assets } from '../../assets/assets.js';

export const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For the best experience, download our app now! <br /> Tomato App </p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt="google-play-store" />
            <img src={assets.app_store} alt="apple-app-store" /> 
        </div>
    </div>
  )
}
