import React, { Component } from 'react';
import Question from '../../../components/Question/question';
import ContinueButton from '../../../components/UI/ContinueButton/continueButton';
import classes from './tests.module.css';

class LearningStyle extends Component {

    state = {
        questions: [
            {
                marked: null,
                questionText: "Choose the statement that applies to you.",
                choices: {
                    a: 'I love listening to music.',
                    b: 'I like to look at the shop windows and go to the galleries.',
                    c: 'When I hear good music, I dance.',
                }
            },
            {
                marked: null,
                questionText: "Choose the statement that applies to you.",
                choices: {
                    a: 'I prefer to be verbal to writing.',
                    b: 'I mostly write properly and without errors.',
                    c: 'I hesitate to rely on my senses in the tests.',
                }
            },
            {
                marked: null,
                questionText: "Choose the statement that applies to you.",
                choices: {
                    a: 'My tone of voice is said to be beautiful.',
                    b: 'When I look good, my confidence increases.',
                    c: 'I like practical jokes.',
                }
            },
            {
                marked: null,
                questionText: "Choose the statement that applies to you.",
                choices: {
                    a: 'I will fix the problems more quickly when I say aloud what I will do.',
                    b: 'Bir şeyin anlatılmasından çok gösterilmesini tercih ederim.',
                    c: 'I prefer to see something rather than being told.',
                }
            },
            {
                marked: null,
                questionText: "Choose the statement that applies to you.",
                choices: {
                    a: 'I understand the sincerity of a person from his voice.',
                    b: 'Often times, I judge people with their appearance.',
                    c: 'Shaking hands is the key for me.',
                }
            },
            {
                marked: null,
                questionText: "Choose the statement that applies to you.",
                choices: {
                    a: 'I prefer listening to tapes rather than reading books.',
                    b: 'I love watching TV and going to the movies',
                    c: 'I love walking or going out',
                }
            },
            {
                marked: null,
                questionText: "Choose the statement that applies to you.",
                choices: {
                    a: 'I hear the slightest sound made by the car.',
                    b: 'The interior and exterior cleaning of the car is very important.',
                    c: `I don't change the car that I can feel good when I use it to anything.`,
                }
            },
            {
                marked: null,
                questionText: "Choose the statement that applies to you.",
                choices: {
                    a: 'People say they can talk to me comfortably.',
                    b: 'I love watching people.',
                    c: 'I tend to touch people as I speak.',
                }
            },
            {
                marked: null,
                questionText: "Choose the statement that applies to you.",
                choices: {
                    a: 'I am hypersensitive to all sounds on the phone.',
                    b: `Even though I don't remember the names, I never forget the faces.`,
                    c: 'I have trouble remembering what people look like.',
                }
            },
            {
                marked: null,
                questionText: "Choose the statement that applies to you.",
                choices: {
                    a: 'I usually sing along when I hear a song on radio.',
                    b: 'I really enjoy taking pictures.',
                    c: 'I enjoy doing things using my hands.',
                }
            },
            // {
            //     marked: null,
            //     questionText: "Choose the statement that applies to you.",
            //     choices: {
            //         a: 'I prefer to be told to me rather than reading an idea.',
            //         b: 'I am more concerned with the speaker than the visual supports.',
            //         c: 'I prefer to watch the activities rather than doing them.',
            //     }
            // },
            // {
            //     marked: null,
            //     questionText: "Choose the statement that applies to you.",
            //     choices: {
            //         a: 'I am a good listener.',
            //         b: 'Appearance is my most important evaluation criterion.',
            //         c: 'I like or dislike some people for reasons I understand.',
            //     }
            // },
            // {
            //     marked: null,
            //     questionText: "Choose the statement that applies to you.",
            //     choices: {
            //         a: 'I will solve the problems more quickly when I speak loudly.',
            //         b: 'I find my direction very comfortable by looking at the map.',
            //         c: 'I feel great after doing sport.',
            //     }
            // },
            // {
            //     marked: null,
            //     questionText: "Choose the statement that applies to you.",
            //     choices: {
            //         a: 'A house must have a quiet place.',
            //         b: 'It is very important that my house should be clean and tidy.',
            //         c: 'I love a comfortable and cosy house.',
            //     }
            // },
            // {
            //     marked: null,
            //     questionText: "Choose the statement that applies to you.",
            //     choices: {
            //         a: `I imitate people's speech.`,
            //         b: 'I make a list of the things I will do every day.',
            //         c: 'I am said to be a very coordinated person.',
            //     }
            // },
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




    changeHandler = (event, idx) => {
        let newQuestions = [...this.state.questions]
        newQuestions[idx].marked = event.target.value;
        this.setState({
            questions: newQuestions
        })
    }


    handleResult = answers => {
        let answer = '';
        const testResult = [];
        for(let ans of answers){
            if(ans === 'a'){
                answer = 'auditory';
                testResult.push(answer);
            }
            else if (ans === 'b'){
                answer = 'visual';
                testResult.push(answer);
            }
            else {
                answer = 'kinetic';
                testResult.push(answer);
            }
        }
        let auditoryCount = 0;
        let visualCount = 0;
        let kineticCount = 0;
        for (let style of testResult){
            if(style === 'auditory'){
                auditoryCount += 1;
            }
            else if (style === 'visual'){
                visualCount += 1;
            }
            else {
                kineticCount += 1;
            }
        }
        let testResObj = {
            auditory: auditoryCount,
            visual: visualCount,
            kinetic: kineticCount
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
        this.props.next('learningStyle', results, testResults);
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
                    d={q.choices.d}
                    e={q.choices.e}
                    marked={q.marked}
                    qNumber={index + 1}
                    handleOptionChange={event => this.changeHandler(event, index)}
                    key={index}
                />
            )
        })

        return (
            <>
                {/* <div className = {classes.HeaderContainer}>
            
                </div> */}
                {questions}
                {this.state.testCompleted ? false : <label style={invalidLabelStyle}>Please answer all questions.</label>}
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

export default LearningStyle