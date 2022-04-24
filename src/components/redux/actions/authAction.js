import { auth, googleAuthProvider } from "../../Firebase/firebase.config"
import { GOOGLE_SIGNIN_FAIL, GOOGLE_SIGNIN_START, GOOGLE_SIGNIN_SUCCESS, GOOGLE_SIGNOUT_FAIL, GOOGLE_SIGNOUT_START, GOOGLE_SIGNOUT_SUCCESS } from "../types"


export const googleSignInInitiate = () => async (dispatch) => {
    try {
        dispatch({ type: GOOGLE_SIGNIN_START })
        auth.signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch({ type: GOOGLE_SIGNIN_SUCCESS, payload: user })
            }).catch((error) =>
                dispatch({ type: GOOGLE_SIGNIN_FAIL, payload: error.message })
            )
    } catch (error) {
        console.log(error)
    }
}
export const googleSignOutInitiate = () => async (dispatch) => {
    try {
        dispatch({ type: GOOGLE_SIGNOUT_START })
        auth.signOut(googleAuthProvider)
            .then(({ user }) => {
                dispatch({ type: GOOGLE_SIGNOUT_SUCCESS })
            }).catch((error) =>
                dispatch({ type: GOOGLE_SIGNOUT_FAIL, payload: error.message })
            )
    } catch (error) {
        console.log(error)
    }
}