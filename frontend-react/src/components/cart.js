import React, { Component } from 'react'
import Axios from "axios"
import "../css/cart.css"



class Cart extends Component{
    constructor(props){
        super(props)
        this.state = {
            cartList : [],
            productList : []
        }

        this.fetchCart = this.fetchCart.bind(this)
    }

    componentWillMount(){
        this.fetchCart()
    }

    fetchCart(){
        Axios.get(`http://127.0.0.1:8000/cart/`,
        {
            headers: {
                "Authorization": `JWT `+localStorage.getItem("token"),
                "Content-Type": 'application/json'
            }
        }
        )
        .then((res)=>{
            console.log(res.data)
            this.setState({
                cartList : res.data
            })
            console.log(this.state.cartList)
        })
        .then(() => {
            Axios.get(`http://127.0.0.1:8000/cart/cart-products/`,
            {
                headers: {
                    "Authorization": `JWT `+localStorage.getItem("token"),
                    "Content-Type": 'application/json'
                }
            })
            .then((res)=>{
                console.log(res.data)
                this.setState({
                    productList : res.data
                })
            })
        })
    }

    cartCountIncrement = (id) => {
        let cartList = this.state.cartList
        let cart = cartList.find(c => c.product === id);
        Axios.put(`http://127.0.0.1:8000/cart/`+ cart.id + `/`, {
            "product": id,
            "count": cart.count+1,
        },
        {
            headers: {
                "Authorization": `JWT `+localStorage.getItem("token"),
                "Content-Type": 'application/json'
            }
        }
        )
        .then((res)=>{
            console.log(res)
            this.fetchCart()
        })
    }

    cartCountDecrement = (id) => {
        let cartList = this.state.cartList
        let cart = cartList.find(c => c.product === id);
        Axios.put(`http://127.0.0.1:8000/cart/`+ cart.id + `/`, {
            "product": id,
            "count": cart.count-1,
        },
        {
            headers: {
                "Authorization": `JWT `+localStorage.getItem("token"),
                "Content-Type": 'application/json'
            }
        }
        )
        .then((res)=>{
            console.log(res)
            this.fetchCart()
        })
        
    }

    cartDelete = (id) => {
        let cartList = this.state.cartList
        let cart = cartList.find(c => c.product === id);
        Axios.delete(`http://127.0.0.1:8000/cart/`+ cart.id + `/`,
        {
            headers: {
                "Authorization": `JWT `+localStorage.getItem("token"),
                "Content-Type": 'application/json'
            }
        }
        )
        .then((res)=>{
            console.log(res)
        })
        this.fetchCart()
    }

    checkout = () => {
        console.log(this.state.cartList)
    }

    render(){
        var productList = this.state.productList
        var cartList = this.state.cartList
        var cci = this.cartCountIncrement
        var ccd = this.cartCountDecrement
        var cd = this.cartDelete
        return (
            <div>
                <ui>
                    <div class="container mt-5 mb-5">
                        <div class="d-flex justify-content-center row">
                            <div class="col-md-8 cart-container">
                                <div class="p-2">
                                    <h4>Shopping cart</h4>
                                </div>
                                <hr />
                                
                                {productList.map(function(product, index){
                                    let cart = cartList.find(c => c.product === product.id);
                                    if (cart !== undefined){

                                        return(
                                            <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded" key = {index}>
                                                <div class="mr-1"><img class="rounded" src={product.main_img} width="70" /></div>
                                                <div class="d-flex flex-column align-items-center product-details">
                                                    <span class="font-weight-bold">{product.name}</span>
                                                </div>
                                                <div class="d-flex flex-row align-items-center qty">
                                                    <i class="fa fa-minus text-danger" onClick = {()=>{
                                                        if (cart.count>1){
                                                            ccd(product.id)
                                                        }else{
                                                            cd(product.id)
                                                        }
                                                    }}></i>
                                                    <h5 class="text-grey mt-1 mr-1 ml-1">&nbsp;{cart.count}&nbsp;</h5>
                                                    <i class="fa fa-plus text-success" onClick = {()=>cci(product.id)}></i>
                                                </div>
                                                <div>
                                                    <h5 class="text-grey">&#8377;{product.price*cart.count}</h5>
                                                </div>
                                                <div class="d-flex align-items-center"><i class="fa fa-trash mb-1 text-danger" onClick = {()=>cd(product.id)}></i></div>
                                            </div>

                                            
                                        )
                                    }else{
                                        return(
                                            <div><h3 style = {{textAlign : "center", color : "grey"}}>Cart is empty . . .</h3></div>
                                        )
                                    }
                                })}
                            </div>
                            {cartList.length>=1?(
                                
                                <button className = "btn btn-outline-success" onClick = {this.checkout}>Checkout</button>
                            ):(
                                ""
                            )
                            }
                        </div>
                    </div>
                </ui>
            </div>
        )
    }
}

export default Cart