import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyDQgnANhLtQM0ah2ZDLM4whfMH1E4OIZfo",
    authDomain: "course-swap.firebaseapp.com",
    projectId: "course-swap",
    databaseURL: "https://course-swap.firebaseio.com",
    storageBucket: "course-swap.appspot.com",
    messagingSenderId: "552157950168",
    appId: "1:552157950168:web:a21dbacaa88e43e371e7ad",
    measurementId: "G-633069N77L"
}

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: "select_account" })

export const googleSign = () => auth.signInWithPopup(provider)

export default firebase