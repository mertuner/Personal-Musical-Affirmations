import * as actions from '../actions/actionTypes';

const initialState = {
    userInfo: {
        name: '',
        email: '',
        birthdayTR: '',
        birthdayINT: '',
        learningStyle: {
            answers: [],
            result: {}
        },
        personalityForm: {
            answers: [],
            result: null
        },
        affirmationSelect: {
            answers: {},
            result: null
        },
        instrumentSelect: {
            answers: {},
            result: null
        },
        isClickedPurchase: false,
        userKey: null,
        paymentResult: false,
        testCompleted: false
    },
    loading: true
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.UPDATE_USERINFO:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    ...action.userInfo
                }
            }
        case actions.SET_PAYMENT_INFO:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    paymentResult: action.paymentResult
                }

            }
        default:
            return state
    }
}

export default reducer