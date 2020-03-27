import React, { Component } from 'react';
import ContinueButton from '../../../components/UI/ContinueButton/continueButton';
import classes from './tests.module.css';
import ImageBox from '../../../components/ImageBox/imageBox';


class AffirmationSelect extends Component {
    
    state = {
        affirmations: [
            {
                eng: 'success',
                tr: 'Success'
            },
            {
                eng: 'happiness',
                tr: 'Happiness'
            },
            {
                eng: 'money',
                tr: 'Money'
            },
            {
                eng: 'anxiety',
                tr: 'Anxiety'
            },
            {
                eng: 'sleep',
                tr: 'Sleep'
            },
            {
                eng: 'physicalHealth',
                tr: 'Physical Health'
            },
            {
                eng: 'love',
                tr: 'Love'
            },
            {
                eng: 'obsession',
                tr: 'Obsession'
            },
            {
                eng: 'forgiving',
                tr: 'Forgiving'
            },
        ],
        selected: null,
        testCompleted: true
    }

    componentDidMount() {
        this.checkerHandler(this.props.selectedAff)
    }

    checkerHandler = (selectedAff) => {
        let tempState = { ...this.state };
        if(selectedAff){
            tempState.selected = selectedAff;
        }
        this.setState(tempState);
    }
    
    clickHandler = idx => {
        let newState = {...this.state};
        newState.selected = newState.affirmations[idx];
        this.setState(newState);
    }

    checkCompletion = () => {
        if (this.state.selected.eng){
            this.props.next('affirmationSelect', this.state.selected, this.state.selected);
        }
        else {
            this.setState({...this.state, testCompleted: false})
        }
    }

    render() {
        let affBoxes = this.state.affirmations.map((aff, idx) => {
            return (
            <ImageBox
            clicked = {() => this.clickHandler(idx)}
            imgText = {aff.tr}
            affImg = {aff.eng}
            selected = {this.state.selected ? this.state.selected.eng === aff.eng : false}
            key={idx}
            affBox
            />
        )})


        return (
            <>
                <div className = {classes.HeaderContainer}>
                <p className={classes.ImgHeaderText}>Now, choose your favorite affirmation.</p>
                </div>
                <div className={classes.AffImageContainer}>
                    {affBoxes}
                </div>
                {this.state.testCompleted ? false : <label style={invalidLabelStyle}>Please choose an affirmation.</label>}
                <div className={classes.ButtonContainer} style={{justifyContent: 'space-around'}}>
                    {/* <ContinueButton clicked={this.props.prev}>Back</ContinueButton> */}
                    <ContinueButton clicked={this.checkCompletion} continue>Next</ContinueButton>
                </div>
            </>
        )
    }
}


const invalidLabelStyle = {
    color: '#FA697C',
    fontSize: '0.7em',
    textAlign: 'left',
    marginTop: '20px',
}

export default AffirmationSelect