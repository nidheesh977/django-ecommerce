import React, {Component} from "react";
import Axios from "axios"
import { Link } from "react-router-dom"
import "../css/account.css"
import toast, {Toaster} from "react-hot-toast"

class Account extends Component{
    constructor(props){
        super(props)
        this.state = {
            account : undefined,
            addresses : [],
        }
        this.fetchAccount = this.fetchAccount.bind(this)
        this.fetchAddress = this.fetchAddress.bind(this)
    }

    componentWillMount(){
        this.fetchAccount()
        this.fetchAddress()
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

    fetchAddress(){
        Axios.get(`http://127.0.0.1:8000/accounts/address/`,
        {
            headers: {
                "Authorization": `Bearer `+localStorage.getItem("token"),
                "Content-Type": 'application/json'
            }
        }
        )
        .then((res)=>{
            this.setState({
                addresses: res.data
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

    deleteAddress = (id) => {
        Axios.delete(`http://127.0.0.1:8000/accounts/address-edit/` + id + `/`,
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }
        )
        .then((res) => {
            this.fetchAddress()
        })
        .catch((error) => {
            toast("You cant delete this address because you used this address to buy products!", {
                duration: 5000
            })
        })
    }


    render(){
        let account = this.state.account
        let addresses = this.state.addresses
        let deleteAddress = this.deleteAddress
        if(account !== undefined){
            return(
                <div>
                    <Toaster />
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
                    <h2>Address :</h2>
                    <ul class="list-group" style={{maxWidth: "540px"}}>
                        {addresses.map(function(address, index){
                            return(
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    {address.addressLine1 + " , " + address.addressLine2 + " , " + address.city + " , " + address.pincode + " , " + address.state + " , " + address.country}
                                    <div className="d-flex align-items-center" style = {{cursor:"pointer"}}><i className="fa fa fa-trash-o mb-1 text-danger" onClick = {() => deleteAddress(address.id)}></i></div>
                                </li>
                            )
                        })}
                    </ul>
                    <button className = "btn btn-primary" onClick = {() => this.props.history.push("/address/")}>Create new address</button>
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