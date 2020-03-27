import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './tests.module.css';
import { Link } from 'react-router-dom';

export class Result extends Component {

    state = {
        audioRef: new Audio(require(`../../../assets/audios/${this.props.music}.mp3`)),
        isPlaying: false,
        affirmations: {
            success: [
                'Mу bоdу іѕ healthy, mу mind іѕ brilliant, my soul is tranquil.',
                'I believe I саn dо anything.',
                'Everything that is happening now is happening for my ultimate good.',
                'I am the architect of my life, I built its foundation and choose its contents.',
                'I forgive those who have harmed me in my past and peacefully detach from them.',
                'I саn achieve greatness.'
            ],
            happiness: [
                'I deserve to be healthy, happy, and successful.',
                'I’m creating the life I deserve to live.',
                'I’m committing myself to live a happy life.',
                'I’m not selfish if I focus on myself for a little bit. I need to make sure I’m okay and happy.',
                'The only person I want to be is a better version of myself.',
            ],
            money: [
                'I am a magnet for money. Prosperity is drawn to me.',
                'Money comes to me in expected and unexpected ways.',
                'I am worthy of making more money.',
                'I embrace new avenues of income.',
                'Wealth constantly flows into my life.'
            ],
            anxiety: [
                'I will be OK.',
                `The picture in my head isn't healthy. That's just me being negative.`,
                `I feel anxious, but so what? I know what that feels like and I'll get through it.`,
                `I'm going to focus on things I love to get me through this.`,
                `Anxiety isn't dangerous. I'm just uncomfortable. I'll make it through this. `
            ],
            sleep: [
                `I have permission to fall asleep.`,
                'I forgive it all.',
                'I release today.',
                `I now enter a place of deep and restful sleep.`,
                'May my sleep be peaceful.'
           ],
           physicalHealth: [
               'I love my body.',
               'I am vital and alive.',
               'I feed my body nutritious, wholesome foods.',
               'I am a strong and healthy person.',
               'My body is the perfect size and shape.'
           ],
           love: [
               `Love follows me everywhere I go.`,
                `My heart is always open to love.`,
                `I know that my soulmate is out there.`,
                `I spread love to those around me and it returns to me in abundance.`,
                `I am attracting my soulmate.`
           ],
           obsession: [
               `I am in control of my thoughts`,
               `I challenge improbable thoughts`,
               `I know when my thoughts are accurate or not`,
               `I control my anxieties`,
               `I am able to still my mind`
           ],
           forgiving: [
               `I am free from the prison of resentment.`,
               `I do not confuse people from my past with people in the present.`,
               `I acknowledge my faults and forgive myself completely.`,
               `Forgiveness is a gift to myself.`,
               `I forgive to stop the negative karmic cycle in my life.`
           ]
        },
        selected: '',
    }

    componentDidMount(){
        this.state.audioRef.loop = true;
        this.state.audioRef.play();
        this.setState({...this.state, selected: this.state.affirmations[this.props.affirmation][0]})
        this.handleAffirmationText(this.props.affirmation);
    }

    componentWillUnmount() {
        this.state.audioRef.pause();
        this.state.audioRef.currentTime = 0;
    }
    

    handleAffirmationText = selected => {
        let i = 1;

        setInterval(() => {
            this.setState({...this.state, selected: this.state.affirmations[selected][i]});
            i++;
            if(i > 4){
                i = 0;
            }
            console.log(this.state.selected, i);
        }, 6000);
    }

    render() {
        let affText = (
            <p className={classes.AffirmationText}>{this.state.selected}</p>
        )
        return (
            <div className={classes.ResultContainer}>
                {affText}
                <Link to ={'/'}>
                <div className={classes.Cancel}/>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.test.userInfo,
        affirmation: state.test.userInfo.affirmationSelect.result.eng,
        music: state.test.userInfo.instrumentSelect.result.eng
    }
}

export default connect(mapStateToProps, null)(Result);