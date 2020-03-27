import React from 'react';
import Navigation from '../../components/Navigation/navigation';
import classes from './mainPage.module.css';
import HeroText from '../../components/HeroText/heroText';
import { Link } from 'react-router-dom';

const mainPage = props => {
    return (
        <div className={classes.Wrapper} >
            <Navigation>
                <Link style={{ textDecoration: 'none' }} to={'/test'}><p className={classes.LinkButton}>START</p></Link>
            </Navigation>
            <div className={classes.Container}>
                <HeroText />
            </div>
        </div>
    )
}

export default mainPage;