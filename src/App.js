import React from "react"
import { Route, Switch, withRouter } from "react-router-dom";
import './App.css';
import Home from "./COMPONENTS/Home"
import PrivateRoute from "./COMPONENTS/PrivateRoute";
import { connect } from "react-redux"
import AddCourse from "./COMPONENTS/addCourse";
import AddRequirement from "./COMPONENTS/addRequirements"
import MyCourses from "./COMPONENTS/myCourses"
import Toolbar from "./COMPONENTS/Toolbar"
import Dashboard from "./COMPONENTS/dashboard"
import { setCurrentUser } from "./REDUX/actions/authAction";
import { auth, firestore } from "./FIREBASE/config";
import firebase from "./FIREBASE/config"
import { courseAction } from "./REDUX/actions/courseAction"
import { authUser } from "./FIREBASE/functions/authUser"

class App extends React.Component {
  unsubscribeAuth = null
  componentDidMount() {
    const { setCurrentUser, courseAction } = this.props
    this.unsubscribeAuth = auth.onAuthStateChanged(async user => {
      console.log(user);
      if (user) {
        const ref = firestore.collection("users").doc(`${user.uid}`)
        console.log(ref);
        ref.get().then(doc => {
          if (!doc.exists) {
            //     return ref
            // }
            // else {
            ref.set({
              displayName: user.displayName,
              photoURL: user.photoURL,
              email: user.email,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              coursesHaveList: [],
              coursesWantList: [],
              uid: user.uid
            })
          }
        })
        console.log(ref);
        ref.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
        const { allCourseName } = this.props.courseList
        if (allCourseName.length === 0) {
          let allCourseNames = []
          firestore.collection("courses").get().then(Snapshot => Snapshot.forEach(doc => {
            allCourseNames.push(doc.data().courseName)
          }))
          courseAction(allCourseNames)
        }
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeAuth()
  }
  render() {
    return (
      <div>
        <Toolbar />
        <Switch>
          <Route path="/add-course" component={AddCourse} />
          <PrivateRoute path="/add-requirement" component={AddRequirement} />
          <PrivateRoute path="/my-courses" component={MyCourses} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authUser,
  courseList: state.courseList
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  courseAction: list => dispatch(courseAction(list))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
