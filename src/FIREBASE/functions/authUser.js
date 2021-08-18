import { firestore } from "../config"
import firebase from "../config"


export const authUser = (user) => {
    const ref = firestore.collection("users").doc(`${user.uid}`)
    console.log(ref);
    ref.get().then(doc => {
        if (doc.exists) {
            return ref
        }
        else {
            ref.update({
                displayName: user.displayName,
                photoURL: user.photoURL,
                email: user.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                coursesHaveList: [],
                coursesWantList: [],
                uid: user.uid
            })
            return ref
        }
    })

}