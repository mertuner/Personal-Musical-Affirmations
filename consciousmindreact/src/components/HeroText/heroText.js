import React from 'react';  
import classes from './heroText.module.css';
import MainButton from '../UI/MainButton/mainPageButton';

const heroText = props => {
    return (
        <div className = {classes.HeroWrapper}> 
            <p className = {classes.BigText}>READY TO DISCOVER<br></br>THE SECRET?</p><br></br>
            <p className = {classes.MottoText}>Personal Musical Affirmations</p>
            <MainButton testlink='personalityform'/>
        </div>
    )
}

export default heroText;