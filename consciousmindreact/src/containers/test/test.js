import React, { Component } from 'react';
import Navigation from '../../components/Navigation/navigation';
import { Link } from 'react-router-dom';
import classes from './test.module.css';
// import LearningStyle from './tests/learningStyle';
// import PersonalityForm from './tests/personalityForm';
import ProgressBar from '../../components/UI/ProgressBar/progressBar';
// import UserForm from './tests/userForm';
import AffirmationSelect from './tests/affirmationSelect';
import InstrumentSelect from './tests/instrumentSelect';
import Result from './tests/result';
import { connect } from 'react-redux';
import { setUserInfo } from '../../store/actions/test';
// import Payment from './tests/payment';

class Test extends Component {


    // State was moved into redux store.
    // It is going to be much more convient to maintain the applicaton state from redux store.
    state = {
        step: 1,
        testRef: React.createRef()
    }
    componentDidMount() {
        this.handleScroll()
    }
    componentDidUpdate() {
        this.handleScroll();
    }

    handleScroll = () => {
        const { index, selected } = this.props
        if (index === selected) {
          setTimeout(() => {
            this.state.testRef.current.scrollIntoView(true, {behavior: 'smooth' })
          }, 500)
        }
      }
    nextStep = (testType, results, testCalculations) => {
        let newState = { ...this.props.userInfo }
        let newStep = this.state.step + 1;
        if(testType === 'result'){
            return(this.setState({step: newStep}));
        }
        if (testType === 'userInfo') {
            newState.name = results.name;
            newState.email = results.email;
            newState.birthdayINT = results.birthDate;
            newState.birthdayTR = results.day + '/' + results.month + '/' + results.year;
            this.setState({step: newStep});
            return this.props.onCreateUser(newState);
        }
        if(testType === 'personalityForm'){
            newState.testCompleted = true;
        }
        newState[testType].answers = results;
        newState[testType].result = testCalculations;
        this.setState({step: newStep});
        // this.props.onSetUserInfoToDB(newState);
        return this.props.onUserInfo(newState);
    }


    prevStep = () => {
        let prevStep = this.state.step - 1;
        this.setState({step: prevStep })
    }

    render() {
        let birthdayArr = this.props.userInfo.birthdayTR.split('/');
        let testForm = null;
        let userInfo = {
            name: this.props.userInfo.name,
            email: this.props.userInfo.email,
            day: birthdayArr[0],
            month: birthdayArr[1],
            year: birthdayArr[2]
        }
        const step = this.state.step

        switch (step) {
            // case 1:
            //     testForm = <UserForm next={this.nextStep} userInfo= {userInfo}/>
            //     break;
            case 1:
                testForm = <AffirmationSelect prev = {this.prevStep} next={this.nextStep} selectedAff = {this.props.userInfo.affirmationSelect.answers}/>
                break;
            case 2:
                testForm = <InstrumentSelect prev = {this.prevStep} next={this.nextStep} selectedIns = {this.props.userInfo.instrumentSelect.answers}/>
                break;
            // case 4:
            //     testForm = <LearningStyle answers={this.props.userInfo.learningStyle.answers} next={this.nextStep} prev={this.prevStep} />
            //     break;
            // case 5:
            //     testForm = <PersonalityForm answers={this.props.userInfo.personalityForm.answers} next={this.nextStep} prev={this.prevStep} />
            //     break;
            case 3:
                testForm = <Result next={this.nextStep}/>
                break;
            // case 7:
            //     testForm = <Payment/>
            //     break;
            default:
                break;
        }

        return (
            <div className={classes.Test} ref={this.state.testRef}>
                {this.state.step > 2 ? null : 
                <Navigation>
                    <Link style={{ textDecoration: 'none' }} to={'/'}><p className={classes.LinkButton}>HOME</p></Link>
                </Navigation> }
                <div className={classes.TestWrapper} >
                    {/* <p className={classes.TestHeader}>Her seyi sana özel hale getirebilmemiz icin 4 adim.</p> */}
                    {/* {this.state.step > 2 ? null : <ProgressBar page = {this.state.step}/>} */}
                    {testForm}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.test.userInfo,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onUserInfo: info => dispatch(setUserInfo(info)),
        // onCreateUser: initialInfo => dispatch(createUser(initialInfo)),
        // onSetUserInfoToDB: info => dispatch(setUserInfoToDB(info))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);