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
import { auth } from "./FIREBASE/config";
import { authUser } from "./FIREBASE/functions/authUser"

class App extends React.Component {
  unsubscribeAuth = null
  componentDidMount() {
    const { setCurrentUser } = this.props
    this.unsubscribeAuth = auth.onAuthStateChanged(async user => {
      console.log(user);
      if (user) {
        const userRef = await authUser(user)
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
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
          <Route path="/add-requirement" component={AddRequirement} />
          <Route path="/my-courses" component={MyCourses} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
