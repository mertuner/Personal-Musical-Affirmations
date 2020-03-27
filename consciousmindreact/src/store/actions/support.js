import { SET_SUPPORT_MESSAGE } from './actionTypes';
import { databaseRef } from '../../config/firebase';


export const setSupportMessage = info => {
    return {
        type: SET_SUPPORT_MESSAGE,
        supportUserInfo: info
    }
}



export const postSupportMessage = info => {
    return async dispatch => {
        try {
            let supportKey = databaseRef.push().key;
            info.supportKey = supportKey;
            info.userKey = localStorage.getItem('uid');
            info.timeStamp = Date.now();
            console.log(info.timeStamp);
            await databaseRef.child('support/' + info.userKey + '/' + info.supportKey).update(info);
            dispatch(setSupportMessage(info));
        } catch (error) {
            throw Error(error);
        }
    }
}