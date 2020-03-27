import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { getPaymentInfo } from '../../store/actions/test';

class PaymentSuccess extends Component{
    state = {
        result : false,
        initialPage: true
    }

    async componentDidMount(){
        await this.props.onGetUserPaymentInfo(localStorage.getItem('uid'), localStorage.getItem('fbKey'));
        this.setState({result: this.props.success, initialPage: false})
        this.redirectHandler(); 
    }
    
    redirectHandler =  () => {
        setTimeout(() => {
            this.props.history.push('/');
        }, 6500);
    }

    render (){

    let paymentRes = (
        this.state.result ? <><h3>Isleminiz basariyla gerceklesmistir. Detayli bilgiyi email adresiniz de bulabilirsiniz.</h3><h4 style={{marginTop: '20px'}}>Yönlendiriliyor...</h4> </> : 
        <><h3>Bir hata olustu. Lutfen tekrar deneyiniz.</h3><h4 style={{marginTop: '20px'}}>Yönlendiriliyor...</h4></>
    )

    return (
        <div style={{marginTop: '40vh'}}>
            {this.state.initialPage ? null : paymentRes}
        </div>
    )
}
}
const mapStateToProps = state => {
    return {
        success: state.test.userInfo.paymentResult,
        testCompleted: state.test.userInfo.testCompleted,        
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        onGetUserPaymentInfo: (uid, key) => dispatch(getPaymentInfo(uid, key))
    }
}



export default connect(mapStateToProps, mapDispatchtoProps)(PaymentSuccess);