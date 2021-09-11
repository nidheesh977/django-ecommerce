import React, { Component } from "react"
import { Link } from "react-router-dom"

class Header extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                <ul className="nav justify-content-center bg-dark" style = {{padding: "10px"}}>
                    
                    
                    <li className="nav-item">
                        <Link className="nav-link" to = "/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to = "/handle-product-checkout/">
                            Product-Checkouts
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to = "/handle-cart-checkout/">Cart-Checkouts</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to = "/login/">Login</Link>
                    </li>
                </ul>
                <br />
            </div>
        )
    }
}

export default Header
