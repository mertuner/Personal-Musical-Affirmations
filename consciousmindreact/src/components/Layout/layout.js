import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MainPage from '../../containers/mainPage/mainPage';
import Test from '../../containers/test/test';
// import Testimonials from '../../containers/testimonial/testimonial';
// import Faq from '../../containers/faq/faq';
import Support from '../../containers/support/support';
// import PaymentSuccess from '../../containers/paymentResult/success';
import Agreement from '../../containers/agreement/agreement';
import { connect } from 'react-redux';
import { authRef } from '../../config/firebase';

class Layout extends Component {

    componentDidMount(){
        //IHaMJ4Uv6keNxYjGPwJkCAgKmko1
        authRef.signInAnonymously().catch(error => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ...
          });
          authRef.onAuthStateChanged(user => {
            if (user) {
              // User is signed in.
              let uid = user.uid;
              localStorage.setItem('uid', uid);
              // ...
            } else {
              // User is signed out.
              // ...
            }
            // ...
          });
    }

    render() {
        let routes = (
            <Switch>
                {/* <Route path="/paymentsuccess" component={PaymentSuccess} /> */}
                {/* <Route path="/testimonials" component={Testimonials} />
                <Route path="/faq" component={Faq} /> */}
                <Route path="/test" component={Test} />
                {/* <Route path="/support" component={Support} />
                <Route path="/agreement" component={Agreement} /> */}
                <Route path="/" exact component={MainPage} />
                <Redirect to="/" />
            </Switch>
        );


        return (
            <div>
                {routes}
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


export default connect(mapStateToProps, null)(Layout);