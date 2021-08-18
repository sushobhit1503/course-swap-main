import React from "react"
import { Link, NavLink, Redirect, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { auth } from "../FIREBASE/config"
import { googleSign } from "../FIREBASE/config"


class Toolbar extends React.Component {
    constructor() {
        super()
        this.state = {
            isSelected: 2
        }
    }
    render() {
        return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignSelf: "center", margin: "20px" }}>
                    <i style={{ marginRight: "10px" }} className="fa fa-exchange"></i>
                    <div style={{ fontFamily: "Kurale" }} >SWAP-SWEEP</div>
                </div>
                {
                    this.props.user.currentUser === null ?
                        <div style={{ backgroundColor: "#DB4437", margin: "20px", fontSize: "15px", padding: "5px 10px 5px 10px", borderRadius: "3px" }}>
                            <Link to="/dashboard" onClick={googleSign} style={{ textDecoration: "none", color: "white" }}>LOGIN</Link>
                        </div> :
                        <div style={{ display: "flex" }}>
                            <NavLink activeClassName="tab-classes" to="/dashboard" style={{ fontSize: "15px", margin: "20px", color: "white", textDecoration: "none" }}>
                                DASHBOARD
                            </NavLink>
                            <NavLink activeClassName="tab-classes" to="my-courses" style={{ fontSize: "15px", margin: "20px", color: "white", textDecoration: "none" }}>
                                MY COURSES
                            </NavLink>
                            <Link to="/" onClick={() => auth.signOut()} style={{ fontSize: "15px", margin: "20px", color: "white", textDecoration: "none" }}>
                                LOG OUT
                            </Link>
                        </div>
                }
            </div >
        )
    }
}

const mapStateToProps = state => ({
    user: state.authUser
})

export default connect(mapStateToProps, null)(withRouter(Toolbar))