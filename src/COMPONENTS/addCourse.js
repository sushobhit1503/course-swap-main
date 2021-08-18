import React from "react"
import "./addCourse.css"
import { addCourseToStore } from "../FIREBASE/functions/addCourseToStore"
import { Button, Card, Label, TextInput } from "evergreen-ui"

class addCourse extends React.Component {
    constructor() {
        super()
        this.state = {
            code: "",
            name: "",
            time: "",
            error: "",
            isLoading: false
        }
    }
    render() {
        const onChange = event => {
            const { name, value } = event.target
            this.setState({ [name]: value })
        }
        const onSubmit = event => {
            event.preventDefault()
            this.setState({ isLoading: true })
            const reference = addCourseToStore(this.state)
            this.setState({ error: "The course has been added successfully", isLoading: false })
            this.setState({ code: "", time: "", name: "" })
            // TODO LIST
            // Store the data in the firestore
            //Display a success message or an error message
        }
        return (
            <div>
                <Card className="course-card">
                    <h3 style={{ paddingBottom: "20px", width: "max-content", margin: "auto", color: "#303030" }}>ADD COURSES TO THE LIST !!</h3>
                    <div style={{ margin: "auto", paddingBottom: "20px", display: "flex", flexDirection: "column" }}>
                        <Label>Course Code: </Label>
                        <TextInput onChange={onChange} value={this.state.code} name="code" type="text" placeholder="BITS FXXX" />
                    </div>
                    <div style={{ margin: "auto", display: "flex", flexDirection: "column", paddingBottom: "20px" }}>
                        <Label>Course Name: </Label>
                        <TextInput onChange={onChange} value={this.state.name} name="name" type="text" placeholder="xyz" />
                    </div>
                    <div style={{ margin: "auto", display: "flex", flexDirection: "column", paddingBottom: "5px" }}>
                        <Label>Course Timings: </Label>
                        <TextInput onChange={onChange} value={this.state.time} name="time" type="text" placeholder="MWF 2" />
                    </div>
                    <div style={{ color: "#4BB543", fontSize: "15px", margin: "auto", width: "max-content" }}>
                        {this.state.error}
                    </div>
                    <div style={{ marginTop: "20px", width: "0px" }}></div>
                    <Button isLoading={this.state.isLoading} style={{ width: "150px", margin: "auto" }} onClick={onSubmit} appearance="primary">SUBMIT</Button>
                </Card>
            </div>
        )
    }
}

export default addCourse