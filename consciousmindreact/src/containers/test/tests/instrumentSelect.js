import React, { Component } from 'react';
import ContinueButton from '../../../components/UI/ContinueButton/continueButton';
import classes from './tests.module.css';
import ImageBox from '../../../components/ImageBox/imageBox';


class InstrumentSelect extends Component {
    
    state = {
        instruments: [
            {
                eng: 'violin',
                tr: 'Violin'
            },
            {
                eng: 'piano',
                tr: 'Piano'
            },
            {
                eng: 'ocean',
                tr: 'Ocean'
            },
            {
                eng: 'forest',
                tr: 'Forest'
            },
            {
                eng: 'rain',
                tr: 'Rain'
            },
            {
                eng: 'winter',
                tr: 'winter'
            }
        ],
        selected: null,
        testCompleted: true
    }

    componentDidMount() {
        this.checkerHandler(this.props.selectedIns)
    }

    checkerHandler = (selectedIns) => {
        let tempState = { ...this.state };
        if(selectedIns){
            tempState.selected = selectedIns;
        }
        this.setState(tempState);
    }
    
    clickHandler = idx => {
        let newState = {...this.state};
        newState.selected = newState.instruments[idx];
        this.setState(newState);
    }

    checkCompletion = () => {
        if (this.state.selected.eng){
            this.props.next('instrumentSelect', this.state.selected, this.state.selected);
        }
        else {
            this.setState({...this.state, testCompleted: false})
        }
    }

    render() {
        let insBoxes = this.state.instruments.map((ins, idx) => {
            return (
            <ImageBox
            clicked = {() => this.clickHandler(idx)}
            imgText = {ins.tr}
            insImg = {ins.eng}
            selected = {this.state.selected ? this.state.selected.eng === ins.eng : false}
            key={idx}
            insBox
            />
        )})


        return (
            <>
                <div className = {classes.HeaderContainer}>
                <p className={classes.ImgHeaderText}>Now, choose your background sound.</p>
                </div>
                <div className={classes.InsImageContainer}>
                    {insBoxes}
                </div>
                {this.state.testCompleted ? false : <label style={invalidLabelStyle}>Please choose a background sound.</label>}
                <div className={classes.ButtonContainer} style={{justifyContent: 'space-around'}}>
                    <ContinueButton clicked={this.props.prev}>Back</ContinueButton>
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

export default InstrumentSelect;