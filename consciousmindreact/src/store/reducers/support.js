import * as actions from '../actions/actionTypes';

const initialState = {
    name: '',
    email: '',
    message: '',
    key: null,
    userKey: null
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_SUPPORT_MESSAGE:
            return {
                ...state,
                ...action.supportUserInfo
            }
        default:
            return state
    }
}

export default reducer;