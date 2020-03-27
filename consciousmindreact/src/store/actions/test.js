import { UPDATE_USERINFO, SET_PAYMENT_INFO } from './actionTypes';
import { databaseRef } from '../../config/firebase';

export const setUserInfo = info => {
    return {
        type: UPDATE_USERINFO,
        userInfo: info
    }
}


// export const createUser = initialInfo => {
//     return async dispatch => {
//         try {
//             if(!initialInfo.userKey){
//             let newfbKey = databaseRef.push().key;
//             let newUserKey = localStorage.getItem('uid');
//             initialInfo.userKey = newUserKey;
//             initialInfo.fbKey= newfbKey;
//             localStorage.setItem('fbKey', newfbKey);
//             await databaseRef.child('users/' + newUserKey + '/' + newfbKey).update(initialInfo);
//             dispatch(setUserInfo(initialInfo));
//         }
//         else {
//             await databaseRef.child('users/' + initialInfo.userKey + '/' + initialInfo.fbKey).update(initialInfo);
//             dispatch(setUserInfo(initialInfo));
//         }
//         } catch (error) {
//             throw new Error(error);
//         }
//     }
// }

// export const setUserInfoToDB = info => {
//     return async dispatch => {
//         try {
//             await databaseRef.child('users/' + info.userKey + '/' + info.fbKey).update(info);
//         } catch (error) {
//             throw Error(error);
//         }
//     }
// }

// export const setPaymentInfo = info => {
//     return {
//         type: SET_PAYMENT_INFO,
//         paymentResult: info
//     }
// }

// export const getPaymentInfo = (uid, fbKey) => {
//     return async dispatch => {
//     let paymentInfo;
//     await databaseRef.child('users/' + uid + '/' + fbKey).once('value', snapshot => {
//         let user = snapshot.val();
//         paymentInfo = user.isPurchased ? user.isPurchased : false;
//         dispatch(setPaymentInfo(paymentInfo));
//     })
// }
// }