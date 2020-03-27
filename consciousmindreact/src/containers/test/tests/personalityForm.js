import React, { Component } from 'react';
import Question from '../../../components/Question/question';
import ContinueButton from '../../../components/UI/ContinueButton/continueButton';
import classes from './tests.module.css';


class PersonalityForm extends Component {

    state = {
        questions: [
            {
                marked: null,
                questionText: "Which of the following couplets tell you better?",
                choices: {
                    a: 'I am a strong, determined, sociable and innate leader.',
                    b: 'It adds meaningful colors to life, I like entertainment. I wish everyone to be happy and cheerful for life.',
                    c: `I want to spend every moment peacefully and calmly. I don't like fighting and noise, I choose the easiest way in my work.`,
                    d: 'I want everything to be perfect and smooth. I like being respectful in my relationships.',
                    e: null
                }
            },
            {
                marked: null,
                questionText: "How do you usually speak?",
                choices: {
                    a: 'Fast and result oriented',
                    b: 'So fast, exciting and fun',
                    c: 'Slower and calmer',
                    d: 'Normal and weighing what I have to say in my mind',
                    e: null
                }
            },
            {
                marked: null,
                questionText: "What is the most important factor that helps you motivate to a job?",
                choices: {
                    a: 'Thinking about the results',
                    b: 'To be approved, to be appreciated',
                    c: 'Support of my friends in the group',
                    d: 'Activity, order and discipline',
                    e: null
                }
            },
            {
                marked: null,
                questionText: "Which is suitable for your working style?",
                choices: {
                    a: 'I am busy and fast. I can do several things at once.',
                    b: 'I work in a free environment. I am focused on human relations.',
                    c: 'I have a personality that is not in the foreground but gives all kinds of support to the group.',
                    d: 'I care about the details and work with a single focus.',
                    e: null
                }
            },
            {
                marked: null,
                questionText: "How do you evaluate your working tempo?",
                choices: {
                    a: 'It works at a fast pace, I like to make decisions quickly.',
                    b: 'I work with high motivation in environments where things are not routine and boring.',
                    c: 'I am rarely in a hurry. I will finish the work I have undertaken, albeit late.',
                    d: 'I decide in detail. I work at a pace.',
                    e: null
                }
            },
            {
                marked: null,
                questionText: "Which annoys you more?",
                choices: {
                    a: 'Time wasting and business delay',
                    b: 'Jobs that require repetition and monotony',
                    c: 'Conflict and disputes',
                    d: 'Stumble and repeat the mistake',
                    e: null
                }
            },
            {
                marked: null,
                questionText: "In which position will you be more successful in the groups you are in?",
                choices: {
                    a: 'Directing events and using authority',
                    b: 'Motivates and cheers people',
                    c: 'Reconciling and ensuring harmony within the group',
                    d: 'Information provider, researcher and follower to events',
                    e: null
                }
            },
            {
                marked: null,
                questionText: "Which stresses you more?",
                choices: {
                    a: 'Feeling that my power and control over events is decreasing',
                    b: 'Being in a boring, routine environment',
                    c: 'Taking on responsibilities that I think will surpass me',
                    d: 'Untidy environments and missing jobs',
                    e: null
                }
            },
            {
                marked: null,
                questionText: "How would you react if you are a student and your teacher says that when you examine your exam paper for the second time, it increases your score?",
                choices: {
                    a: 'I think I deserve this already.',
                    b: 'I will be very happy and I will show my joy.',
                    c: 'I thank and respect my teacher.',
                    d: 'I wonder where my teacher made a mistake, I would like to see my paper.',
                    e: null
                }
            },
            {
                marked: null,
                questionText: "When you need to attend a business meeting that will take hours, which of the following would you adopt?",
                choices: {
                    a: 'I prefer to go out immediately after the conclusion is clear to discuss the main lines of the issue.',
                    b: 'I prefer to stay until the end when the meeting continues in a fun way, and go out early when it gets boring.',
                    c: 'I do my part to make the meeting peacefully and make good decisions.',
                    d: 'I come to the meeting ahead of time, write down all the details and leave late to make an assessment.',
                    e: null
                }
            },
        ],
        testCompleted: true
    }

    componentDidMount() {
        this.checkerHandler(this.props.answers)
    }

    

    checkerHandler = (markArray) => {
        let tempState = { ...this.state };
        if (markArray.length > 0) {
            for (let mark of markArray) {
                for (let question of tempState.questions) {
                    question.marked = mark;
                }
            }
        }
        this.setState(tempState);
    }

    handleResult = answers => {
        let answer = '';
        const testResult = [];
        for(let ans of answers){
            if(ans === 'a'){
                answer = 'popular optimist';
                testResult.push(answer);
            }
            else if (ans === 'b'){
                answer = 'perfectionist melankolic';
                testResult.push(answer);
            }
            else if (ans === 'c'){
                answer = 'strong choleric';
                testResult.push(answer);
            }
            else {
                answer = 'peaceful calm';
                testResult.push(answer);
            }
        }
        let popularyCount = 0;
        let perfectionistCount = 0;
        let strongCount = 0;
        let peacefulCount = 0;
        for (let style of testResult){
            if(style === 'popular optimist'){
                popularyCount += 1;
            }
            else if (style === 'perfectionist melankolic'){
                perfectionistCount += 1;
            }
            else if (style === 'strong choleric'){
                strongCount += 1;
            }
            else {
                peacefulCount += 1;
            }
        }

        

        let testResObj = {
            popularOptimist: popularyCount,
            perfectionistMelankolic: perfectionistCount,
            strongCholeric: strongCount,
            peacefulCalm: peacefulCount
        }
        let keysSorted = Object.keys(testResObj).sort(function(a,b){return testResObj[b]-testResObj[a]})
        testResObj = {
            ...testResObj,
            dominantCharacter: keysSorted[0]
        }
        return testResObj;
    }

    checkCompletion = () => {
        const results = [];
        for (let q of this.state.questions) {
            if (q.marked == null) {
                this.setState({...this.state, testCompleted: false})
                return;
            }
            results.push(q.marked);
        }
        let testResults = this.handleResult(results);
        this.props.next('personalityForm', results, testResults);
    }

    changeHandler = (event, idx) => {
        let newQuestions = [...this.state.questions]
        newQuestions[idx].marked = event.target.value;
        this.setState({
            questions: newQuestions
        })
    }



    render() {

        let questions = this.state.questions.map((q, index) => {
            return (
                <Question
                questionText={q.questionText}
                qidx={index}
                a={q.choices.a}
                b={q.choices.b}
                c={q.choices.c}
                d={q.choices.d ? q.choices.d.text : ''}
                e={q.choices.e ? q.choices.e.text : ''}
                marked = {q.marked}
                qNumber={index + 1}
                handleOptionChange={event => this.changeHandler(event, index)}
                key={index}
            />
            )
        })

        return (
            <>
            {questions}
            {this.state.testCompleted ? false : <label style={invalidLabelStyle}>Please answer all questions</label>}
            <div className={classes.ButtonContainer} style={{justifyContent: 'space-around'}}>
            <ContinueButton clicked={this.props.prev}>Back</ContinueButton>
            <ContinueButton clicked={this.checkCompletion} continue>Next</ContinueButton>
            </div>
            </>
        )
    }
}

const invalidLabelStyle = {
    color: '#FA697C',
    fontSize: '0.7em',
    textAlign: 'left',
    paddingTop: '10px',
}

export default PersonalityForm;