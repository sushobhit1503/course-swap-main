import React from "react"
import "./addCourse.css"
import { Button, Card, Label, SelectMenu, Pane, Spinner } from "evergreen-ui"
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
            isPageLoading: false
        }
    }
    render() {
        const onSubmit = event => {
            event.preventDefault()
            this.setState({ isLoading: true })
            // TASKS TO DO:
            // Store the course requirements in the course collection
            //Show the error or confirmation message
            // Stop loading and refresh the fields
        }
        return (
            <div>
                {this.state.isPageLoading ?
                    <Pane>
                        <Spinner marginX="auto" marginY={120} />
                    </Pane> :
                    <Card className="course-card">
                        <h3 style={{ paddingBottom: "20px", width: "max-content", margin: "auto" }}>ADD YOUR REQUIREMENTS !!</h3>
                        <div style={{ margin: "auto", paddingBottom: "20px", display: "flex", flexDirection: "column" }}>
                            <Label>Course You Have: </Label>
                            <SelectMenu
                                title="Select Course Name"
                                options={['Apple', 'Apricot', 'Banana', 'Cherry', 'Cucumber'].map((label) => ({ label, value: label }))}
                                selected={this.state.courseHave}
                                onSelect={(item) => this.setState({ courseHave: item.value })}
                            >
                                <Button>{this.state.courseHave || 'Select Course Name...'}</Button>
                            </SelectMenu>
                        </div>
                        <div style={{ margin: "auto", display: "flex", flexDirection: "column", paddingBottom: "20px" }}>
                            <Label>Course You Want: </Label>
                            <SelectMenu
                                title="Select Course Name"
                                options={['Apple', 'Apricot', 'Banana', 'Cherry', 'Cucumber'].map((label) => ({ label, value: label }))}
                                selected={this.state.courseWant}
                                onSelect={(item) => this.setState({ courseWant: item.value })}
                            >
                                <Button>{this.state.courseWant || 'Select Course Name...'}</Button>
                            </SelectMenu>
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

export default login