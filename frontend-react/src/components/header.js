import React, { Component } from "react"
import { Link } from "react-router-dom"
import Axios from "axios"

class Header extends Component{

    constructor(props){
        super(props)
        this.state = {
            cart : [],
            account : undefined,
            user : undefined,
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
                })
                .then(()=>{
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
                    })
        })
    }


    logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh-token')
        window.location.replace("/login/");
    }

    

    render(){
        let cart_count = this.state.cart
        let account = this.state.account

        let Account = () => {
            if (account!==undefined){
                return(
                    <Link className="nav-link" to = "/account/" style = {{color:"white"}}>
                        <img src={account.image} className="img-fluid rounded-start" alt="..." style = {{height: "30px", width: "30px"}}/>
                        {account.name}
                    </Link>
                )
            }else{
            
                return(
                <div className = "nav-link" style = {{color: "white", cursor: "default"}}>Guest user</div>
                )
            }
        }

        let LoginLogout = () => {
            if (account!==undefined){
                return(
                    <Link className="nav-link" onClick = {this.logout}>Logout</Link>
                    
                )
            }else{
                return(
                    <Link className="nav-link" to="/login/">Login</Link>
                )
            }
        }
        return (
            <div>
                <ul className="nav justify-content-center bg-dark" style = {{padding: "10px"}}>
                    
                    
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Store</Link>
                    </li>
                    <li className="nav-item">
                        <Link type="button" className="nav-link" to = "/cart/">
                            Cart
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/checkout-list/">Checkout-List</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register/">Register</Link>
                    </li>
                    <li className="nav-item">
                        {LoginLogout()}
                    </li>
                    <li className="nav-item">
                        {Account()}
                    </li>
                </ul>
                <br />   

            </div>
            
        )
    }
}

export default Header
