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
            })
        })
    }
    if (courseHave !== "NONE" && courseWant !== "ANY") {
        firestore.collection("courses").doc(`${courseHave}`).update({
            studentsHaveList: firebase.firestore.FieldValue.arrayUnion(displayName),
            seatsAvailable: firebase.firestore.FieldValue.increment(1)
        })
        courseWant.map(eachCourseWant => {
            firestore.collection("courses").doc(`${eachCourseWant}`).update({
                studentsWantList: firebase.firestore.FieldValue.arrayUnion(displayName),
                seatsInDemand: firebase.firestore.FieldValue.increment(1)
            })
        })
    }
}