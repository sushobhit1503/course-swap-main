import { firestore } from "../config"

export const addCourseToStore = (courseData) => {
    const { name, code, time } = courseData
    var courseExists = false
    const ref = firestore.collection("courses").doc(`${code}`)
    firestore.collection("courses").doc(`${code}`).onSnapshot(doc => {
        if (doc.data().code) {
            courseExists = true
            return ref
        }
    })
    firestore.collection("courses").doc(`${code}`).set({
        courseCode: code,
        courseName: name,
        courseTimings: time,
        seatsAvailable: 0,
        seatsInDemand: 0,
        studentsHaveList: [],
        studentsWantList: []
    })
    return 0
}