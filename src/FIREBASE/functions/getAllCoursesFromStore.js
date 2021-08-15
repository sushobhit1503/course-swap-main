import { firestore } from "../config"

export const getAllCoursesFromStore = () => {
    let allCourses = []
    firestore.collection("courses").where("seatsInDemand", "!=", 0).orderBy("seatsInDemand").get().then(Snapshot => Snapshot.forEach(doc => {
        allCourses.push(doc.data())
    }))
    return allCourses
}

export const getAllCourseNames = () => dispatch => {
    let allCourseName = []
    firestore.collection("courses").get().then(Snapshot => Snapshot.forEach(doc => {
        allCourseName.push(doc.data().name)
    }))
    dispatch({
        type: "SET_COURSE_LIST",
        payload: allCourseName
    })
}