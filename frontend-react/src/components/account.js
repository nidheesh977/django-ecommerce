import React, {Component} from "react";
import Axios from "axios"
import { Link } from "react-router-dom"
import "../css/account.css"

class Account extends Component{
    constructor(props){
        super(props)
        this.state = {
            account : undefined,
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
        .catch((error) => {
            Axios.post(`http://127.0.0.1:8000/token/refresh/`, 
                {
                    "refresh": localStorage.getItem("refresh-token")
                },
                {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                }
                )
                .then((res)=>{
                    localStorage.setItem("token", res.data.access)
                    this.fetchCart()
                })
                .catch((error) => {
                    this.props.history.push("/login/")
                })
        })
    }


    render(){
        let account = this.state.account
        if(account !== undefined){
            console.log(account)
            return(
                <div>
                    <h1>Account</h1>
                    <hr />

                    <div className="card mb-3" style={{maxWidth: "540px"}} id = "account-details">
                        <div className="row g-0">
                            <div className="col-md-4">
                            <img src={account.image} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                            <div className="card-body">
                                <h3 className="card-title">{account.name}</h3>
                                <p className="card-text">Age : {account.age}</p>
                                <p className="card-text">Email : {account.email}</p>
                                <Link to = "/account-edit/"><button className = "btn btn-outline-danger">Edit</button></Link>
                            </div>
                            </div>
                        </div>
                    </div>

                </div>
            )
        }else{
            return(
                <div>
                </div>
            )
        }
    }
}

export default Account