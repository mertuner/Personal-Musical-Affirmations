import React, { Component } from 'react'
import classes from './navigation.module.css';
import { Link } from 'react-router-dom';

class SideBar extends Component {

    state = {
        width: 0
    }

    sideBarClosingHandler = () => {
        this.setState({ width: 0 })
    }

    sideBarOpeningHandler = () => {
        this.setState({ width: 250 })
    }


    render() {
        return (
            <React.Fragment>
                <div className={classes.SideBar} style={{ width: this.state.width }}>
                    <span className={classes.CloseButton} onClick={this.sideBarClosingHandler}>&times;</span>
                    <div className={classes.SideBarContainer}>
                        <Link style={{ textDecoration: 'none' }} to={'/'}><p className={classes.MobileLink}>HOME</p></Link>
                        {/* <Link style={{ textDecoration: 'none' }} to={'/faq'}><p className={classes.MobileLink}>SSS</p></Link>
                        <Link style={{ textDecoration: 'none' }} to={'/testimonials'}><p className={classes.MobileLink}>YORUMLARINIZ</p></Link> */}
                        {/* <Link style={{ textDecoration: 'none' }} to={'/support'}><p className={classes.MobileLink}>SUPPORT</p></Link> */}
                        {this.props.children}
                    </div>
                </div>
                <span className={classes.OpenButton} onClick={this.sideBarOpeningHandler}>&#9776;</span>
            </React.Fragment>
        )
    }
}
export default SideBar
