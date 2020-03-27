import React from 'react';
import classes from './purchaseButton.module.css';

const purchaseButton = props => {
    return (
        <div className = {classes.Button} onClick={props.clicked}>
            {props.children}
        </div>
    )
}


export default purchaseButton;