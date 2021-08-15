import { firestore } from "../config"

// returns the list of students who want that specific course with that courseCode

export const getCourseWantStudentList = (code) => {
    let studentName = []
    firestore.collection("courses").doc(`${code}`).get().then(doc => {
        studentName = doc.data().studentsWantList
    })
    return studentName
}