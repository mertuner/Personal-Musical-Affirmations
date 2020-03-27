import React from 'react';
import classes from './progressBar.module.css'

const progressBar = props => {
    return (
        <div className={classes.ProgressBar}>
            <div style={{...progressBarDefaultStyle, width: dynamicWidth(props.page)}}></div>
        </div>
    )
}


const progressBarDefaultStyle = {
    backgroundImage: 'linear-gradient(to right, #F08A64, #E76DEC)',
    height: '100%',
    borderRadius: '50px'
}


const dynamicWidth = pageNumber => {
    if (pageNumber === 1){
        return '50%'
    }
    else if (pageNumber === 2){
        return '100%'
    }
}

export default progressBar;