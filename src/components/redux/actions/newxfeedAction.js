import { db } from "../../Firebase/firebase.config";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { CREATE_NWESFEED, GET_NWESFEED, UPDATE_REACTION, BOOKMARK_POST, DELETE_NWESFEED, GET_SINGLE_NEWSFEED, UPDATE_NWESFEED, UPDATE_NWESFEED_STATE, UPDATE_MODAL_STATE, UPDATE_DIALOG_STATE } from "../types";


let usersCollectionRef = collection(db, "newsfeeds");

export const getNewsFeeds = () => async (dispatch) => {
    try {
        const data = await getDocs(usersCollectionRef);
        const allData = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        // console.log(allData)
        dispatch({
            type: GET_NWESFEED,
            payload: allData,
        })

    } catch (error) {
        console.log(error)
    }
}
export const createNewsFeeds = (post) => async (dispatch) => {
    try {
        await addDoc(usersCollectionRef, post);
        dispatch({ type: CREATE_NWESFEED })
        dispatch(getNewsFeeds())
        console.log('created successfully')

    } catch (error) {
        console.log(error)
    }
}
export const updateReactButton = (option, id) => async (dispatch) => {
    try {
        const userDoc = doc(db, "newsfeeds", id);
        const newFields = { reaction: option };
        await updateDoc(userDoc, newFields);
        dispatch({ type: UPDATE_REACTION })
        dispatch(getNewsFeeds())

    } catch (error) {
        console.log(error)
    }
}
export const updateBookmarkButton = (option, email, id) => async (dispatch) => {
    try {
        const userDoc = doc(db, "newsfeeds", id);
        const newFields = { bookmarked: option, bookmarkedUserEmail: email };
        await updateDoc(userDoc, newFields);
        dispatch({ type: BOOKMARK_POST })
        dispatch(getNewsFeeds())

    } catch (error) {
        console.log(error)
    }
}

export const deleteNewsFeed = (id) => async (dispatch) => {
    try {
        const userDoc = doc(db, "newsfeeds", id);
        await deleteDoc(userDoc);
        dispatch({ type: DELETE_NWESFEED })
        dispatch(getNewsFeeds())
        console.log('deleted successfully')
    } catch (error) {
        console.log(error)
    }
}
export const getSingleNewsFeed = (id) => async (dispatch) => {
    try {
        const data = await getDocs(usersCollectionRef);
        const allData = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        const singleData = allData.find(data => data.id === id)
        dispatch({ type: GET_SINGLE_NEWSFEED, payload: singleData })
        dispatch(getNewsFeeds())
    } catch (error) {
        console.log(error)
    }
}
export const updateNewsFeed = (data, id) => async (dispatch) => {
    try {
        const userDoc = doc(db, "newsfeeds", id);
        await updateDoc(userDoc, data);
        dispatch({ type: UPDATE_NWESFEED })
        dispatch(getNewsFeeds())
        console.log('uploaded successfully')
    } catch (error) {
        console.log(error)
    }
}
export const updateStateNewsFeed = (data) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_NWESFEED_STATE, payload: data })
        dispatch(getNewsFeeds())
    } catch (error) {
        console.log(error)
    }
}
export const updateStateModal = (data) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_MODAL_STATE, payload: data })
        dispatch(getNewsFeeds())
    } catch (error) {
        console.log(error)
    }
}
export const updateStateDialog = (data) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_DIALOG_STATE, payload: data })
        dispatch(getNewsFeeds())
    } catch (error) {
        console.log(error)
    }
}
