import React from 'react';
import { Link } from 'react-router-dom';
import classes from './mainPageButton.module.css';

const mainPageButton = props => {
    return (
        <Link style={{textDecoration: 'none'}} to={'/test'}>
            <div className = {classes.Button}>
                GET STARTED
            </div>
        </Link>
    )
}


export default mainPageButton;