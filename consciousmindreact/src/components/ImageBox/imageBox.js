import React from 'react';
import classes from './imageBox.module.css';

const imageBox = props => {

    let imgRoute;
    if (props.affBox) {
        imgRoute = require(`../../assets/illustrations/affirmations/${props.affImg}.svg`)
    }
    // let aff = require(`../../assets/illustrations/affirmations/${props.affImg}.svg`)
    else if(props.insBox){
        imgRoute = require(`../../assets/illustrations/instruments/${props.insImg}.svg`)
    }
    else {
        imgRoute = require(`../../assets/illustrations/results/${props.resImg}.svg`)
    }
    
    return (
        <div className={classes.ImageBox} style={{ backgroundColor: props.selected ? '#6DECB9' : 'rgba(0,0,0,0)', border: props.resBox ? '3px solid #6DECB9' : null, boxShadow: '0 0 6px #1089FF' }} onClick={props.clicked}>
            <div style={{ height: props.affBox ? '66%' : '50%', width: props.affBox ? '80%' : '65%', backgroundImage: `url(${imgRoute})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>
            <p>{props.imgText}</p>
        </div>
    )
}

export default imageBox;