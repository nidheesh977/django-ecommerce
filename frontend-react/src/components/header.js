import React, { Component } from "react"
import { Link, NavLink } from "react-router-dom"

class Header extends Component{


    render(){
        return (
            <div> 

                <ul class="nav justify-content-center bg-dark">
                    <li class="nav-item">
                        <Link class="nav-link" to="/">Store</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/cart/">Cart</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/register/">Register</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/login/">Login</Link>
                    </li>
                </ul>
                <br />   

            </div>
            
        )
    }
}

export default Header


