import React, {Component} from "react"
import Axios from "axios"
import { Link } from "react-router-dom"


class AccountEdit extends Component{

    constructor(props){
        super(props)
        this.state = {
            account : undefined,
            image: "",
            name : "",
            email : "",
            age : "",
        }
        this.fetchAccount = this.fetchAccount.bind(this)
    }

    componentWillMount(){
        this.fetchAccount()
    }

    fetchAccount(){
        Axios.get(`http://127.0.0.1:8000/accounts/`,
        {
            headers: {
                "Authorization": `Bearer `+localStorage.getItem("token"),
                "Content-Type": 'application/json'
            }
        }
        )
        .then((res)=>{
            this.setState({
                account: res.data
            })
        })
    }

    accountEdit = (e) => {
        e.preventDefault()

        const formData = new FormData

        formData.append("name", this.state.name)
        formData.append("age", this.state.age)
        formData.append("email", this.state.email)
        formData.append("image", this.state.image[0])

        Axios.put(`http://127.0.0.1:8000/accounts/`, formData,
        {
            headers: {
                "Authorization": `Bearer `+localStorage.getItem("token"),
                "Content-Type": 'application/json'
            }
        }
        )
        .then((res)=>{
            this.props.history.push("/account/")
        })
        .catch((error)=>{
            alert(error)
        })
    }

    imageChangeHandler = (e) => {
        this.setState({
            image: e.target.files
        })
    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    ageChangeHandler = (e) => {
        this.setState({
            age: e.target.value
        })
    }
    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    render(){
        var account = this.state.account

        return(
            <div className="container" id = "account-edit">
                <div className = "col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="preview text-center">
                        <div className="browse-button">
                            <i className="fa fa-pencil-alt"></i>
                            <input className="browse-input" type="file" required name="UploadedFile" id="UploadedFile" onChange = {this.imageChangeHandler}/>
                        </div>
                        <span className="Error"></span>
                    </div>
                    <div className="form-group">
                        <label>Name:</label>
                        <input className="form-control" type="text" name="name" required placeholder="Enter Your Full Name" onChange = {this.nameChangeHandler}/>
                        <span className="Error"></span>
                    </div>
                    <div className="form-group">
                        <label>Age:</label>
                        <input className="form-control" type="number" name="age" required placeholder="Enter Your Full Name" onChange = {this.ageChangeHandler}/>
                        <span className="Error"></span>
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input className="form-control" type="email" name="email" required placeholder="Enter Your Email" onChange = {this.emailChangeHandler}/>
                        <span className="Error"></span>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" onClick = {this.accountEdit}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default AccountEdit