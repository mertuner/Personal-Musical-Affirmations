import React, { Component } from 'react';
import classes from './support.module.css';
import ContinueButton from '../../components/UI/ContinueButton/continueButton';
import Navigation from '../../components/Navigation/navigation';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { connect } from 'react-redux';
import { postSupportMessage } from '../../store/actions/support';

class Support extends Component {
    state = {
        name: '',
        email: '',
        message: '',
        validity: {
            name: false,
            email: false,
            message: false
        },
        invalidInputLabels: {
            name: false,
            email: false,
            message: false
        },
        form: true,
        clicked: false,
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
        else if (inputType === 'message') {
            newState.message = event.target.value;
            newState.validity.message = this.checkValidity(inputType, newState.message);
            this.setState(newState);
        }
    }




    checkValidity = (inputType, text) => {
        if (inputType === 'name' || inputType === 'message') {
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
                await this.setState({ ...this.state, form: false });
                await this.setState({ ...this.state, invalidInputLabels: { name: false, email: false, message: false } })
                return
            }
            result[info] = this.state[info];
        }
        await this.setState({ ...this.state, form: true});
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
        await this.setState({...this.state, clicked: true});
        this.props.onSupportSubmit(this.state);
        setTimeout(() => {
            this.props.history.push('/');
        }, 3500);
    }

    render() {
        return (
            <React.Fragment>
            <Navigation>
            <Link style={{ textDecoration: 'none' }} to={'/'}><p className={classes.LinkButton}>BAŞLA</p></Link>
            </Navigation>
            <div className={classes.SupportFormContainer}>
                <div className={classes.SupportForm}>
                    {this.state.form ? false : <label style={invalidFormStyle}>Lütfen butun alanları doldurunuz</label>}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                        <input className={classes.SupportFormInput} type='text' onChange={(event) => this.onChangeHandler(event, 'name')} placeholder={'Adınız'} value={this.state.name} />
                        {!this.state.invalidInputLabels.name ? false : <label style={invalidLabelStyle}>Lütfen geçerli bir isim giriniz</label>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                        <input className={classes.SupportFormInput} type='text' onChange={(event) => this.onChangeHandler(event, 'email')} placeholder={'Email'} value={this.state.email} />
                        {!this.state.invalidInputLabels.email ? false : <label style={invalidLabelStyle}>Lütfen geçerli bir email adresi giriniz</label>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                        <textarea className={classes.SupportFormTextArea} rows={7} onChange={(event) => this.onChangeHandler(event, 'message')} placeholder={'Mesajınız...'} value={this.state.message} />
                        {!this.state.invalidInputLabels.message ? false : <label style={invalidLabelStyle}>Lütfen geçerli bir mesaj giriniz</label>}
                    </div>
                </div>
                {this.state.form && this.state.clicked ? <label style={validFormStyle}>Mesajınız bize ulaşmıstır. <br></br><br></br> En kısa zamanda dönüş yapılacaktır.</label> : null}
                <div style ={{pointerEvents: this.state.clicked ? 'none' : 'auto'}}>
                    <ContinueButton continue clicked={this.checkCompletion}>Gönder</ContinueButton>
                </div>
            </div>
            </React.Fragment>
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

const validFormStyle = {
    color: '#6DECB9',
    fontSize: '0.7em',
    textAlign: 'center',
    paddingBottom: '40px'
}


const mapDispatchToProps = dispatch => {
    return {
        onSupportSubmit: info => dispatch(postSupportMessage(info))
    }
} 

export default connect(null, mapDispatchToProps)(Support);
