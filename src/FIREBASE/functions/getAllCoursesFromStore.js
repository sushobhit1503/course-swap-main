import { firestore } from "../config"

export const getAllCoursesFromStore = () => {
    let allCourses = []
    firestore.collection("courses").orderBy("seatsInDemand").get().then(Snapshot => Snapshot.forEach(doc => {
        allCourses.push(doc.data())
    }))
    console.log(allCourses);
    return allCourses
}

export const getAllCourseNames = () => {
    let allCourseName = []
    firestore.collection("courses").get().then(Snapshot => Snapshot.forEach(doc => {
        allCourseName.push(doc.data().courseName)
    }))
    return allCourseName
}