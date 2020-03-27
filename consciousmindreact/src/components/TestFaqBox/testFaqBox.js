import React from 'react';
import classes from './testFaqBox.module.css';


const testFaqBox = props => {
    let imgRoute;

    if(props.gender === 'm'){
        imgRoute =  require(`../../assets/illustrations/avatars/man.svg`);
    }
    else if(props.gender === 'f'){
        imgRoute =  require(`../../assets/illustrations/avatars/girl.svg`);
    }
    else {
        imgRoute =  require(`../../assets/illustrations/avatars/questionMark.svg`);
    }

    return (
        <div className={classes.FaqContainer}>
            <div className={classes.FaqBox}>
                <div className={classes.FaqAvatar} style={{width: props.ques ? '30px' : '45px', height: props.ques ? '30px' : '45px'}}>
                <div style={{width: props.ques ? '20px' : '45px', height: props.ques ? '20px' : '45px', backgroundImage: `url(${imgRoute})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>{props.avatar}</div>
                </div>
                <div className={classes.FaqName}>{props.name}</div>
                <div className={classes.FaqDescription}>{props.desc}</div>
            </div>
        </div>
    )
}

export default testFaqBox
