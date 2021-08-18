import React from "react"
import "./addCourse.css"
import { connect } from "react-redux"
import { addRequirementToStore } from "../FIREBASE/functions/addRequirementToStore"
import { getAllCoursesFromStore } from "../FIREBASE/functions/getAllCoursesFromStore"
import { Button, Card, Label, Select, Pane, Spinner } from "evergreen-ui"
// TASKS TO DO:
// Replace the select items menu with courses in the database
// Add the option of Any and None
// Add the courses to a global reducer to reduce the number of reads
// The courseWant can be an array

class login extends React.Component {
    constructor() {
        super()
        this.state = {
            courseHave: "",
            courseWant: "",
            courseList: [],
            isLoading: false,
            isPageLoading: true
        }
    }
    async componentDidMount() {
        const courseLists = await getAllCoursesFromStore()
        this.setState({ courseList: courseLists, isPageLoading: false }, () => console.log(this.state))
    }
    render() {
        const onChange = event => {
            const { name, value } = event.target
            this.setState({ [name]: value })
        }
        const onSubmit = event => {
            event.preventDefault()
            this.setState({ isLoading: true })
            if (this.state.courseWant === "" || this.state.courseHave === "")
                this.setState({ error: "The fields can not be empty", isLoading: false })
            else {
                addRequirementToStore(this.props.user.currentUser, this.state)
                this.setState({ courseHave: "", courseWant: "", isLoading: false, error: "Your requirement has been saved successfully" })
            }
        }
        return (
            <div>
                {this.state.isPageLoading ?
                    <Pane>
                        <Spinner marginX="auto" marginY={120} />
                    </Pane> :
                    <Card className="course-card">
                        <h3 style={{ paddingBottom: "20px", width: "max-content", margin: "auto", color: "#303030" }}>ADD YOUR REQUIREMENTS !!</h3>
                        <div style={{ margin: "auto", paddingBottom: "20px", display: "flex", flexDirection: "column" }}>
                            <Label>Course You Have: </Label>
                            <Select name="courseHave" onChange={onChange}>
                                <option>SELECT COURSE</option>
                                <option value="NONE">NONE</option>
                                {this.state.courseList.map(options => {
                                    return (
                                        <option value={options.courseCode}>{options.courseName}</option>
                                    )
                                })}
                            </Select>
                        </div>
                        <div style={{ margin: "auto", display: "flex", flexDirection: "column", paddingBottom: "20px" }}>
                            <Label>Course You Want: </Label>
                            <Select value={this.state.courseWant} name="courseWant" onChange={onChange}>
                                <option>SELECT COURSE</option>
                                <option value="ANY">ANY</option>
                                {this.state.courseList.map(options => {
                                    return (
                                        <option value={options.courseCode}>{options.courseName}</option>
                                    )
                                })}
                            </Select>
                        </div>
                        <div style={{ color: "#CA0B00", fontSize: "15px", margin: "auto", width: "max-content" }}>
                            {this.state.error}
                        </div>
                        <div style={{ marginTop: "20px", width: "0px" }}></div>
                        <Button isLoading={this.state.isLoading} style={{ width: "150px", margin: "auto" }} onClick={onSubmit} appearance="primary">SUBMIT</Button>
                    </Card>}

            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.authUser
})

export default connect(mapStateToProps, null)(login)