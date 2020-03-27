import React, { Component } from 'react';
import classes from './tests.module.css';
import postscribe from 'postscribe';
import PurchaseButton from '../../../components/UI/PurchaseButton/purchaseButton';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



export class Payment extends Component {

    state = {
        name: '',
        surName: '',
        phone: '',
        isReadAgreement: false,
        validity: {
            name: false,
            surName: false,
            phone: false
        },
        invalidLabels: {
            name: false,
            surName: false,
            phone: false,
            isReadAgreement: false
        },
        formSuccess: false,
        buttonFunctionality: true
    }

    checkValidity = (inputType, text) => {
        let newState = { ...this.state }
        if (inputType === 'name') {
            if (text.trim(' ') !== '') {
                newState.validity.name = true;
                newState.invalidLabels.name = false;
                return this.setState(newState)
            }
            else {
                newState.validity.name = false;
                newState.invalidLabels.name = true;
                return this.setState(newState)
            }
        }
        else if (inputType === 'surName') {
            if (text.trim(' ') !== '') {
                newState.validity.surName = true;
                newState.invalidLabels.surName = false;
                return this.setState(newState)
            }
            else {
                newState.validity.surName = false;
                newState.invalidLabels.surName = true;
                return this.setState(newState)
            }
        }
        else {
            if (validator.isMobilePhone(text, ['tr-TR'])) {
                newState.validity.phone = true;
                newState.invalidLabels.phone = false;
                return this.setState(newState)
            }
            else {
                newState.validity.phone = false;
                newState.invalidLabels.phone = true;
                return this.setState(newState)
            }
        }
    }

    changeHandler = (event, inputType) => {
        if (inputType === 'name') {
            this.setState({ ...this.state, name: event.target.value })
        }
        else if (inputType === 'surName') {
            this.setState({ ...this.state, surName: event.target.value })
        }
        else if (inputType === 'checkbox') {
            this.setState({ ...this.state, isReadAgreement: event.target.checked })
        }
        else {
            this.setState({ ...this.state, phone: event.target.value })
        }
    }


    formSubmitHandler = async () => {
        let newState = { ...this.state }
        if (newState.isReadAgreement) {
            newState.invalidLabels.isReadAgreement = false;
            this.setState(newState);
        }
        else {
            newState.invalidLabels.isReadAgreement = true;
            this.setState(newState)
        }
        for (let valid in newState.validity) {
            await this.checkValidity(valid, newState[valid])
        }
        if (newState.validity.name && newState.validity.surName && newState.validity.phone && newState.isReadAgreement) {
            this.setState({ ...this.state, buttonFunctionality: false })
            this.postData();
        }
    }


    postData = async () => {
        // Default options are marked with *
        try {
            const response = await fetch('https://bilinclizihin.herokuapp.com/api/paymentform', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: `${this.state.name}`,
                    phone: `${this.state.phone}`,
                    email: `${this.props.email}`,
                    userKey: `${this.props.userKey}@@${this.props.fbKey}`
                })
            })
            let data = await response.json();
            this.setState({ ...this.state, formSuccess: true })
            postscribe('#weepay', `${data.CheckoutFormData}`);
        } catch (error) {
            throw new Error(error);
        }
    }


    render() {
        return (
            <div id='payment' className={classes.PaymentContainer}>
                <div className={classes.PaymentForm}>
                    <div className={classes.InputContainer}>
                        <input value={this.state.name} onChange={(event) => this.changeHandler(event, 'name')} type='text' className={classes.PaymentInput} placeholder="Ad" />
                        {this.state.invalidLabels.name ? <label style={invalidLabelStyle}>Lütfen geçerli bir ad giriniz.</label> : null}
                    </div>
                    <div className={classes.InputContainer}>
                        <input value={this.state.surName} onChange={(event) => this.changeHandler(event, 'surName')} type='text' className={classes.PaymentInput} placeholder="Soyad" />
                        {this.state.invalidLabels.surName ? <label style={invalidLabelStyle}>Lütfen geçerli bir soyad giriniz.</label> : null}
                    </div>
                    <div className={classes.InputContainer}>
                        <input value={this.state.phone} onChange={(event) => this.changeHandler(event, 'phone')} type='text' className={classes.PaymentInput} placeholder="Telefon" />
                        {this.state.invalidLabels.phone ? <label style={invalidLabelStyle}>Lütfen geçerli bir telefon numarası giriniz.</label> : null}
                    </div>
                </div>
                <div className={classes.CheckContainer}>
                    <input onChange={(event) => this.changeHandler(event, 'checkbox')} checked={this.state.isReadAgreement} type='checkbox' style={{ marginRight: '10px', marginTop: '2px' }} />
                    <div>
                        <p>Web sitesinin <Link to={'/agreement'} target='_blank' style={{ color: '#6DECB9' }}> şartlar ve koşullar</Link> sayfasını okudum ve kabul ediyorum.</p>
                        {this.state.invalidLabels.isReadAgreement ? <label style={invalidLabelStyle}>Lütfen bu alanı işaretleyiniz.</label> : null}
                    </div>
                </div>
                <div className={classes.PriceContainer}>
                    <p><span>Toplam tutar: </span>200 ₺</p>
                </div>
                <div className={classes.ThankContainer}>
                    <p style={{ margin: '40px 0 0 50px', textAlign: 'left', lineHeight: '1.4rem' }}>Bilinçli Zihin ailesi olarak bizi tercih ettiğiniz için teşekkür ederiz.</p>
                    <p style={{ margin: '10px 0 0 50px', textAlign: 'left', lineHeight: '1.4rem' }}>WeePay ödeme formunu açmak için lütfen aşağıdaki butona basınız.</p>
                </div>
                {!this.state.formSuccess ? <div style={{ margin: '35px 0 0 50px', pointerEvents: !this.state.buttonFunctionality ? 'none' : 'auto' }}>
                    <PurchaseButton clicked={this.formSubmitHandler}>Ödeme Formu</PurchaseButton>
                </div> : null}
                <div id='weepay' className={classes.WeePayContainer}>
                    <div id='weePay-checkout-form' className='popup'></div>
                </div>
            </div>
        )
    }
}

const invalidLabelStyle = {
    color: '#FA697C',
    fontSize: '0.7em',
    textAlign: 'left',
    paddingTop: '5px'
}


const mapStateToProps = state => {
    return {
        userKey: state.test.userInfo.userKey,
        fbKey: state.test.userInfo.fbKey,
        email: state.test.userInfo.email
    }
}

export default connect(mapStateToProps, null)(Payment);
