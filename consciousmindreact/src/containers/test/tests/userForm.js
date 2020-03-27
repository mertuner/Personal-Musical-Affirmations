import React, { Component } from 'react';
import classes from './tests.module.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import ContinueButton from '../../../components/UI/ContinueButton/continueButton';
import * as dates from '../../../utilities/date';
import validator from 'validator';

class UserForm extends Component {
    state = {
        name: '',
        email: '',
        day: '',
        month: '',
        year: '',
        options: {
            dayOptions: dates.DAYS,
            monthOptions: Array.from(dates.MONTHS.values()),
            yearOptions: dates.YEARS
        },
        validity: {
            name: false,
            email: false
        },
        invalidInputLabels: {
            name: false,
            email: false,
        },
        form: false
    }

    componentDidMount() {
        this.checkerHandler(this.props.userInfo);
    }

    checkerHandler = (userInfoObject) => {
        let tempState = { ...this.state };
        for (let info in userInfoObject) {
            tempState[info] = userInfoObject[info];
        }
        this.setState(tempState);
    }

    onChangeHandler = (event, inputType) => {
        let newState = { ...this.state }
        if (inputType === 'name') {
            newState.name = event.target.value;
            newState.validity.name = this.checkValidity(inputType, newState.name);
            this.setState(newState);
        }
        else if (inputType === 'email') {
            newState.email = event.target.value;
            newState.validity.email = this.checkValidity(inputType, newState.email);
            this.setState(newState);
        }
    }

    dayChangeHandler = (option) => {
        let newState = { ...this.state };
        newState.day = option.label;
        this.setState(newState);
    }

    monthChangeHandler = (option) => {
        let newState = { ...this.state };
        newState.month = option.label;
        this.setState(newState);
    }

    yearChangeHandler = (option) => {
        let newState = { ...this.state };
        newState.year = option.label;
        this.setState(newState);
    }


    checkValidity = (inputType, text) => {
        if (inputType === 'name') {
            if (text.trim(' ') !== '') {
                return true;
            }
            else {
                return false
            }
        }
        else if (inputType === 'email') {
            if (validator.isEmail(text)) {
                return true;
            }
            else {
                return false
            }
        }
    }

    checkCompletion = async () => {
        const result = {};
        for (let info in this.state) {
            if (this.state[info] === '' || this.state[info] === undefined) {
                console.log('Lutfen butun sorulari cevaplayiniz');
                await this.setState({ ...this.state, form: true });
                await this.setState({ ...this.state, invalidInputLabels: { name: false, email: false } })
                return
            }
            result[info] = this.state[info];
        }
        await this.setState({ ...this.state, form: false });
        // Get the key for the selected date value
        const monthSelectedInt = [...dates.MONTHS.entries()]
            .filter(({ 1: v }) => v === result.month)
            .map(([k]) => k)[0];

        // Append combined year, month, day date object to results
        result.birthDate = new Date(result.year, monthSelectedInt, result.day).toDateString()

        // Remove day, month, year propertie
        let currentState = this.state;
        for (let valids in this.state.validity) {
            currentState.validity[valids] = this.checkValidity(valids, this.state[valids])
            if (!currentState.validity[valids]) {
                currentState.invalidInputLabels[valids] = true;
                await this.setState(currentState);
                return;
            }
            else {
                currentState.invalidInputLabels[valids] = false;
                await this.setState(currentState);
            }
        }
        let { day, month, year, ...rest } = result
        this.props.next('userInfo', result);
    }

    /*
    limitDays = () => {
        
        // 1. Get the month & year

        // 2. Set the day limit wrt year & month

        // 3. edit dates.DAYS

        // 4. return updated days
    }
    */

    render() {
        return (
            <div className={classes.UserFormContainer}>
                <div className={classes.UserForm}>
                    {!this.state.form ? false : <label style={invalidFormStyle}>Please fill all fields</label>}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                        <input className={classes.UserFormInput} type='text' onChange={(event) => this.onChangeHandler(event, 'name')} placeholder={'Name'} value={this.state.name} />
                        {!this.state.invalidInputLabels.name ? false : <label style={invalidLabelStyle}>Please enter a valid name</label>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                        <input className={classes.UserFormInput} type='text' onChange={(event) => this.onChangeHandler(event, 'email')} placeholder={'Email'} value={this.state.email} />
                        {!this.state.invalidInputLabels.email ? false : <label style={invalidLabelStyle}>Please enter a valid email address.</label>}
                    </div>
                    <div style={{ width: '100%', textAlign: 'left' }}>
                        <p className={classes.BirthdayText}>Birthday</p>
                        <div className={classes.BirthdayContainer}>
                            <Dropdown menuClassName={classes.MyDropDownMenu} controlClassName={classes.MyDropDownControl} arrowClassName={classes.MyDropDownArrow} onChange={this.dayChangeHandler} options={this.state.options.dayOptions} value={this.state.day} placeholder="Day" />
                            <Dropdown menuClassName={classes.MyDropDownMenu} controlClassName={classes.MyDropDownControl} arrowClassName={classes.MyDropDownArrow} onChange={this.monthChangeHandler} options={this.state.options.monthOptions} value={this.state.month} placeholder="Month" />
                            <Dropdown menuClassName={classes.MyDropDownMenu} controlClassName={classes.MyDropDownControl} arrowClassName={classes.MyDropDownArrow} onChange={this.yearChangeHandler} options={this.state.options.yearOptions} value={this.state.year} placeholder="Year" />
                        </div>
                    </div>
                </div>
                <ContinueButton continue clicked={this.checkCompletion}>Next</ContinueButton>
            </div>
        )
    }
}

const invalidLabelStyle = {
    color: '#FA697C',
    fontSize: '0.7em',
    textAlign: 'left',
    paddingTop: '10px',
}

const invalidFormStyle = {
    color: '#FA697C',
    fontSize: '0.7em',
    textAlign: 'center',
}

export default UserForm
