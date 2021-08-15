import { firestore } from "../config"

export const firstResolveCourseRequest = (user, resolveRequest) => {
    const { courseHave, courseWant, personName } = resolveRequest
    firestore.collection("resolves").doc().set({
        courseHave: [],
        courseWant: [],
        personInvolved: []
    })
}