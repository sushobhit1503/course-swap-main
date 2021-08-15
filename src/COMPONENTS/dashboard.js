import React from "react"
import { Table, Pane, Spinner } from "evergreen-ui"
import { getAllCoursesFromStore } from "../FIREBASE/functions/getAllCoursesFromStore"
// TASKS TO DO:
// Add the tables with only those courses where demand and availability both are 0
// Change the Have and want icons to buttons
class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            allCourses: [],
            isPageLoading: true
        }
    }

    componentDidMount() {
        const allValues = getAllCoursesFromStore()
        this.setState({ allCourses: allValues, isPageLoading: false }, () => console.log(this.state))
    }
    render() {
        return (
            <div>
                {this.state.isPageLoading ?
                    <Pane>
                        <Spinner marginX="auto" marginY={120} />
                    </Pane> :
                    <div>
                        {
                            this.state.allCourses.length === 0 ?
                                <div style={{ fontSize: "15px", textAlign: "center", color: "#303030" }}>
                                    No Course has been added by any user
                                </div> :
                                <Table style={{ margin: "auto" }} width="85%">
                                    <Table.Head>
                                        <Table.TextHeaderCell>Course Code</Table.TextHeaderCell>
                                        <Table.TextHeaderCell>Course Name</Table.TextHeaderCell>
                                        <Table.TextHeaderCell>Course Timings</Table.TextHeaderCell>
                                        <Table.TextHeaderCell>Seats Available</Table.TextHeaderCell>
                                        <Table.TextHeaderCell>Seats In Demand</Table.TextHeaderCell>
                                        <Table.TextHeaderCell>Student List (HAVE)</Table.TextHeaderCell>
                                        <Table.TextHeaderCell>Student List (WANT)</Table.TextHeaderCell>
                                    </Table.Head>
                                    <Table.Body>
                                        {this.state.allCourses.map((profile) => (
                                            <Table.Row key={profile.uid}>
                                                <Table.TextCell>{profile.code}</Table.TextCell>
                                                <Table.TextCell>{profile.name}</Table.TextCell>
                                                <Table.TextCell>{profile.time}</Table.TextCell>
                                                <Table.TextCell>{profile.seatsAvailable}</Table.TextCell>
                                                <Table.TextCell>{profile.seatsInDemand}</Table.TextCell>
                                                <Table.TextCell className="row-hover-success" style={{ cursor: "pointer" }}><b>VIEW STUDENTS</b></Table.TextCell>
                                                <Table.TextCell className="row-hover" style={{ cursor: "pointer" }}><b> VIEW STUDENTS</b></Table.TextCell>
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

export default Dashboard