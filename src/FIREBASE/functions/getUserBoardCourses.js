import { firestore } from "../config";

export const getUserBoardHaveCourses = (user) => {
    let allHaveCourses = []
    let allHaveCourseDetails = []
    firestore.collection("users").doc(`${user.uid}`).get().then(doc => {
        allHaveCourses = doc.data().coursesHaveList
    })
    allHaveCourses.map(eachCourse => {
        firestore.collection("courses").doc(`${eachCourse}`).get().then(doc => {
            allHaveCourseDetails.push(doc.data())
        })
    })
    console.log(user.uid);
    console.log(allHaveCourses);
    console.log(allHaveCourseDetails);
    return allHaveCourseDetails
}

export const getUserBoardWantCourses = (user) => {
    let allWantCourses = []
    let allWantCourseDetails = []
    firestore.collection("users").doc(`${user.uid}`).get().then(doc => {
        allWantCourses = doc.data().coursesWantList
    })
    allWantCourses.map(eachCourse => {
        firestore.collection("courses").doc(`${eachCourse}`).get().then(doc => {
            allWantCourseDetails.push(doc.data())
        })
    })
    return allWantCourseDetails
}