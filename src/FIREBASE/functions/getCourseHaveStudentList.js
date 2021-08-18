import { firestore } from "../config"

// returns the list of students who have that specific course with that courseCode

export const getCourseHaveStudentList = (code) => {
    let studentName = []
    firestore.collection("courses").doc(`${code}`).get().then(doc => {
        studentName = doc.data().studentsHaveList
    })
    console.log(studentName);
    return studentName
}