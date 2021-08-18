import { firestore } from "../config"
import firebase from "../config"

export const addRequirementToStore = (user, requestData) => {
    const { courseHave, courseWant } = requestData
    const { displayName } = user
    if (courseWant === "ANY") {
        firestore.collection("courses").get().then(Snapshot => {
            Snapshot.forEach(doc => {
                doc.data().studentsHaveList.push(displayName)
                doc.data().seatsInDemand = doc.data().seatsInDemand + 1
                firestore.collectionGroup("users").doc(`${user.uid}`).update({
                    courseHaveList: firebase.firestore.FieldValue.arrayUnion(doc.data().courseCode)
                })
            })
        })
    }
    if (courseHave !== "NONE" && courseWant !== "ANY") {
        firestore.collection("courses").doc(`${courseHave}`).update({
            studentsHaveList: firebase.firestore.FieldValue.arrayUnion(displayName),
            seatsAvailable: firebase.firestore.FieldValue.increment(1)
        })
        firestore.collection("users").doc(`${user.uid}`).update({
            courseHaveList: firebase.firestore.FieldValue.arrayUnion(courseHave)
        })
        firestore.collection("courses").doc(`${courseWant}`).update({
            studentsWantList: firebase.firestore.FieldValue.arrayUnion(displayName),
            seatsInDemand: firebase.firestore.FieldValue.increment(1)
        })
        firestore.collection("users").doc(`${user.uid}`).update({
            courseWantList: firebase.firestore.FieldValue.arrayUnion(courseWant)
        })
    }
}