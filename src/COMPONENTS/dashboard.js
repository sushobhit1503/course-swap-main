import React from "react"
import { Table, Pane, Spinner, Dialog, Button } from "evergreen-ui"
import { getAllCoursesFromStore } from "../FIREBASE/functions/getAllCoursesFromStore"
import { getCourseHaveStudentList } from "../FIREBASE/functions/getCourseHaveStudentList"
import { getCourseWantStudentList } from "../FIREBASE/functions/getCourseWantStudentList"

class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            allCourses: [],
            StudentList: [],
            isDialogBox: false,
            isPageLoading: true
        }
    }

    componentDidMount() {
        const allValues = getAllCoursesFromStore()
        this.setState({ allCourses: allValues, isPageLoading: false }, () => console.log(this.state))
    }
    render() {
        const getStudentList = (code, type) => {
            if (type === "HAVE") {
                this.setState({ isDialogBox: true })
                const havelist = getCourseHaveStudentList(code)
                this.setState({ StudentList: havelist })
            }
            else {
                this.setState({ isDialogBox: true })
                const wantlist = getCourseWantStudentList(code)
                this.setState({ StudentList: wantlist })
            }
        }
        return (
            <div>
                {this.state.isPageLoading ?
                    <Pane>
                        <Spinner marginX="auto" marginY={120} />
                    </Pane> :
                    <div>
                        {console.log(this.state.allCourses.length)}
                        {
                            this.state.allCourses.length === 0 ?
                                <div style={{ fontSize: "15px", textAlign: "center" }}>
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
                                                <Table.TextCell>{profile.courseCode}</Table.TextCell>
                                                <Table.TextCell>{profile.courseName}</Table.TextCell>
                                                <Table.TextCell>{profile.courseTimings}</Table.TextCell>
                                                <Table.TextCell>{profile.seatsAvailable}</Table.TextCell>
                                                <Table.TextCell>{profile.seatsInDemand}</Table.TextCell>
                                                <Table.TextCell onClick={() => getStudentList(profile.courseCode, "HAVE")} className="row-hover-success" style={{ cursor: "pointer" }}><b>VIEW STUDENTS</b></Table.TextCell>
                                                <Table.TextCell onClick={() => getStudentList(profile.courseCode, "WANT")} className="row-hover" style={{ cursor: "pointer" }}><b> VIEW STUDENTS</b></Table.TextCell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>

                        }
                        <Pane>
                            <Dialog
                                isShown={this.state.isDialogBox}
                                title="List of Students"
                                onCloseComplete={() => this.setState({ isDialogbox: false })}
                                confirmLabel="Got it !!"
                            >
                                {this.state.StudentList.map(eachStudent => {
                                    return (
                                        <li>{eachStudent}</li>
                                    )
                                })}
                            </Dialog>
                        </Pane>
                    </div>}
            </div>
        )
    }
}

export default Dashboard