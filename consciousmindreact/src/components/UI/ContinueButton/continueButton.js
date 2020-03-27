import React from 'react'
import classes from './continueButton.module.css'
import MaterialIcon from 'material-icons-react';

const continueButton =  props => {
    return (
        <div onClick={props.clicked} className={classes.Button} style= {props.continue ? cBtn : bBtn}>
            {props.continue ? <p>{props.children}</p> : null}
            <div className= {props.continue ? classes.RightArrow : classes.LeftArrow}>
                {props.continue ? 
                <MaterialIcon icon = {'arrow_forward'} color={'#FCFCFC'} size={22}/> : <MaterialIcon icon = {'arrow_back'} size={22} color={'#FCFCFC'}/>
            }
            </div>
            {!props.continue ? <p>{props.children}</p> : null}
        </div>
    )
}





let cBtn = {
    backgroundColor: '#2F89FC',
}
let bBtn = {
    backgroundColor: '#FA697C'
}

export default continueButton
