import React from 'react';
import { Link } from 'react-router-dom';
import classes from './navigation.module.css';
import SideBar from './sideBar';

const navigation = props => {
    return (
        <div className={classes.Navigation} style={{ backgroundColor: props.bgColor }}>
            <div className={classes.NavigationContainer}>
                <div className={classes.Brand}>
                    <div className={classes.Logo}></div>
                    <Link to={'/'} style={{textDecoration: 'none', color: 'white', cursor: 'pointer'}}><p className={classes.BrandName}>CONSCIOUS MIND</p></Link>
                </div>
                <div className={classes.Links}>
                    {/* <Link style={{ textDecoration: 'none' }} to={'/faq'}><p className={classes.Link}>SSS</p></Link>
                    <Link style={{ textDecoration: 'none' }} to={'/testimonials'}><p className={classes.Link}>YORUMLARINIZ</p></Link> */}
                    {/* <Link style={{ textDecoration: 'none' }} to={'/support'}><p className={classes.Link}>DESTEK</p></Link> */}
                    {props.children}
                </div>
                <SideBar/>
            </div>
        </div>
    )
}

export default navigation;