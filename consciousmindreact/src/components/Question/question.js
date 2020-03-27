import React from 'react';
import classes from './question.module.css';

const question = props => {
    return (
        <div className={classes.QuestionContainer}>
            <p className={classes.QuestionNumber}>QUESION {props.qNumber}</p>
            <p className={classes.Question}>{props.questionText}</p>
            <label className={classes.Answer} style={{border: props.marked === 'a' ? '3px solid #6DECB9' : null}}>
                <input
                    type="radio"
                    // qidx => question index
                    name= {props.qidx}
                    value= 'a'
                    onChange={props.handleOptionChange}
                    checked = {props.marked === 'a'}
                    className = {classes.OldButton}
                />
                <span className={classes.RadioBtn}></span>
                {props.a}
            </label>
            <label className={classes.Answer} style={{border: props.marked === 'b' ? '3px solid #6DECB9' : null}}>
                <input
                    type="radio"
                    // qidx => question index
                    name= {props.qidx}
                    value= 'b'
                    onChange={props.handleOptionChange}
                    checked = {props.marked === 'b'}
                    className = {classes.OldButton}
                />
                <span className={classes.RadioBtn}></span>
                {props.b}
            </label>
            <label className={classes.Answer} style={{border: props.marked === 'c' ? '3px solid #6DECB9' : null}}>
                <input
                    type="radio"
                    // qidx => question index
                    name= {props.qidx}
                    value= 'c'
                    onChange={props.handleOptionChange}
                    checked = {props.marked === 'c'}
                    className = {classes.OldButton}
                />
                <span className={classes.RadioBtn}></span>
                {props.c}
            </label>
            { props.d ? <label className={classes.Answer} style={{border: props.marked === 'd' ? '3px solid #6DECB9' : null}}>
                <input
                    type="radio"
                    // qidx => question index
                    name= {props.qidx}
                    value= 'd'
                    onChange={props.handleOptionChange}
                    checked = {props.marked === 'd'}
                    className = {classes.OldButton}
                />
                <span className={classes.RadioBtn}></span>
                {props.d}
            </label> : null }
            { props.e ? <label className={classes.Answer} style={{border: props.marked === 'e' ? '3px solid #6DECB9' : null}}>
                <input
                    type="radio"
                    // qidx => question index
                    name= {props.qidx}
                    value= 'e'
                    onChange={props.handleOptionChange}
                    checked = {props.marked === 'e'}
                    className = {classes.OldButton}
                />
                <span className={classes.RadioBtn}></span>
                {props.e}
            </label> : null }
        </div>
    )
}



export default question;