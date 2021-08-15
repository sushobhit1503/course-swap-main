import { firestore } from "../config"
import firebase from "firebase"

export const deleteCourseFromReq = (code, user, type) => {
    const { displayName } = user
    if (type === "HAVE") {
        firestore.collection("courses").doc(`${code}`).update({
            studentsHaveList: firebase.firestore.FieldValue.arrayRemove(displayName),
            seatsAvailable: firebase.firestore.FieldValue.increment(-1)
        })
        firestore.collection("users").doc(`${user.uid}`).update({
            coursesHaveList: firebase.firestore.FieldValue.arrayRemove(code)
        })
    }
    if (type === "WANT") {
        firestore.collection("courses").doc(`${code}`).update({
            studentsWantList: firebase.firestore.FieldValue.arrayRemove(displayName),
            seatsInDemand: firebase.firestore.FieldValue.increment(-1)
        })
        firestore.collection("users").doc(`${user.uid}`).update({
            coursesWantList: firebase.firestore.FieldValue.arrayRemove(code)
        })
    }
}