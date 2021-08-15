import React from "react"
import { Table, Button, Pane, Spinner } from "evergreen-ui"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { getUserBoardHaveCourses, getUserBoardWantCourses } from "../FIREBASE/functions/getUserBoardCourses"
import "./myCourses.css"

//TASKS TO DO:
// Import the data in the table from the database
// Add the delete functionality in delete option and change it to button
//Add the resolve functionality in the resolve option and change it to button
//Link the add requirements tab

class myCourses extends React.Component {
    constructor() {
        super()
        this.state = {
            courseDataHave: [],
            courseDataWant: [],
            isPageLoading: true
        }
    }
    componentDidMount() {
        const { currentUser } = this.props.authUser
        let courseReceiveHave = getUserBoardHaveCourses(currentUser)
        this.setState({ courseDataHave: courseReceiveHave })
        let courseReceiveWant = getUserBoardWantCourses(currentUser)
        this.setState({ courseDataWant: courseReceiveWant, isPageLoading: false })
    }
    render() {
        return (
            <div>
                {this.state.isPageLoading ?
                    <Pane>
                        <Spinner marginX="auto" marginY={120} />
                    </Pane> :
                    <div>
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                            <h3 style={{ paddingBottom: "20px", width: "max-content", margin: "auto" }}>YOUR COURSES !!</h3>
                            <Link style={{ margin: "auto", width: "max-content", textDecoration: "none" }} to="/add-requirement">
                                <Button intent="success" appearance="primary" >ADD REQUIREMENTS</Button>
                            </Link>
                            <div style={{ width: "0px", marginBottom: "20px" }}></div>
                        </div>
                        {this.state.courseDataHave.length === 0 && this.state.courseDataWant.length === 0 ?
                            <div style={{ fontSize: "15px", textAlign: "center", color: "#303030" }}>
                                You have not added any requirements
                            </div>
                            :
                            <Table style={{ margin: "auto" }} width="80%">
                                <Table.Head>
                                    <Table.TextHeaderCell>Course Code</Table.TextHeaderCell>
                                    <Table.TextHeaderCell>Course Name</Table.TextHeaderCell>
                                    <Table.TextHeaderCell>Course Timings</Table.TextHeaderCell>
                                    <Table.TextHeaderCell>Course Status</Table.TextHeaderCell>
                                    <Table.TextHeaderCell>Resolve</Table.TextHeaderCell>
                                    <Table.TextHeaderCell>Delete</Table.TextHeaderCell>
                                </Table.Head>
                                <Table.Body>
                                    {this.state.courseDataHave.map((profile) => (
                                        <Table.Row key={profile.id}>
                                            <Table.TextCell><b>{profile.code}</b></Table.TextCell>
                                            <Table.TextCell><b>{profile.name}</b></Table.TextCell>
                                            <Table.TextCell><b>{profile.time}</b></Table.TextCell>
                                            <Table.TextCell><b>HAVE</b></Table.TextCell>
                                            <Table.TextCell className="row-hover-success" style={{ cursor: "pointer" }}><b>RESOLVE</b></Table.TextCell>
                                            <Table.TextCell className="row-hover" style={{ cursor: "pointer" }}><b> DELETE</b></Table.TextCell>
                                        </Table.Row>
                                    ))}
                                    {this.state.courseDataWant.map((profile) => (
                                        <Table.Row key={profile.id}>
                                            <Table.TextCell><b> {profile.code}</b></Table.TextCell>
                                            <Table.TextCell><b> {profile.name}</b></Table.TextCell>
                                            <Table.TextCell><b> {profile.time}</b></Table.TextCell>
                                            <Table.TextCell><b>WANT</b></Table.TextCell>
                                            <Table.TextCell className="row-hover-success" style={{ cursor: "pointer" }}><b>RESOLVE</b></Table.TextCell>
                                            <Table.TextCell className="row-hover" style={{ cursor: "pointer" }}><b> DELETE</b></Table.TextCell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        }
                    </div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authUser: state.authUser
})

export default connect(mapStateToProps, null)(myCourses)