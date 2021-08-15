import React from "react"
import { TabNavigation, Tab, Menu, Popover, Button, Position, Avatar } from "evergreen-ui"
import { Link, Redirect, withRouter } from "react-router-dom"
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
            <div>
                {
                    this.props.user.currentUser === null ?
                        <TabNavigation>
                            <Tab style={{ backgroundColor: "#DB4437", margin: "20px" }} key="login" id="login">
                                <Link onClick={googleSign} style={{ textDecoration: "none", color: "white" }}>LOGIN</Link>
                            </Tab>
                        </TabNavigation> :
                        <Popover
                            position={Position.BOTTOM_LEFT}
                            content={
                                <Menu>
                                    <Menu.Item>MY COURSES</Menu.Item>
                                    <Menu.Item onClick={() => {
                                        auth.signOut()
                                        this.props.history.push("/");
                                        < Redirect to="/" />
                                    }} >LOGOUT</Menu.Item>
                                </Menu>
                            }
                        >
                            <Button style={{ margin: "20px" }}><Avatar style={{ marginRight: "10px" }} src={this.props.user.currentUser.photoURL} alt="course" /> Hi {this.props.user.currentUser.name.split(" ")[0]}</Button>
                        </Popover>
                }
            </div >
        )
    }
}

const mapStateToProps = state => ({
    user: state.authUser
})

export default connect(mapStateToProps, null)(withRouter(Toolbar))