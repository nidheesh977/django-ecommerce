import React, {Component} from "react"
import { render } from "react-dom"
import "../css/productStyle.css"
import Axios from "axios"
import {Link} from "react-router-dom"
import Payment from "./payment"


class Product extends Component{

    constructor(props){
        super(props)
        this.state = {
            productList : [],
            next_page: "http://127.0.0.1:8000/",
            previous_page: null,
            categories : [],
            searchValue : "",
            addresses : [],
            addressSelected : ""
        }
        this.fetchProducts = this.fetchProducts.bind(this)
        this.fetchCategory = this.fetchCategory.bind(this)
    }

    componentWillMount(){
        this.fetchProducts()
        this.fetchCategory()
        window.addEventListener('scroll', this.handleScroll);
    }

    
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    fetchProducts(){
        fetch("http://127.0.0.1:8000/?page=1")
        .then(response => response.json())
        .then(data => {
            this.setState({
                productList: data.results,
                next_page: data.next,
                previous_page: data.previous
            })
        })
        
    }

    fetchCategory(){
        fetch("http://127.0.0.1:8000/category/")
        .then(response => response.json())
        .then(data => this.setState({
            categories: data
        }))
    }


    changeHandler = (e)=>{
        this.setState({
            searchValue: e.target.value
        })
        var searchValue = e.target.value.replace(/\s+/g, '+')
        if (searchValue){
            fetch("http://127.0.0.1:8000/product-filter/?search="+searchValue)
            .then(response => response.json())
            .then(data => this.setState({
                productList: data
            }))
        }
        else{
            this.fetchProducts()
        }
    }

    search = ()=>{
        var searchValue = this.state.searchValue
        searchValue = searchValue.replace(/\s+/g, '+')
        fetch("http://127.0.0.1:8000/product-filter/?search="+searchValue)
        .then(response => response.json())
        .then(data => this.setState({
            productList: data
        }))
        
    }

    categoryProducts = (id)=>{
        if(id==="all"){
            this.fetchProducts()
        }else{
            fetch("http://127.0.0.1:8000/category-products/"+id+"/")
            .then(response => response.json())
            .then(data => this.setState({
                productList: data
            }))
        }
    }

    addToCart = (id, product) => {
        Axios.post(`http://127.0.0.1:8000/cart/`, {
            "product": id,
            "count": 1,
        },
        {
            headers: {
                "Authorization": `Bearer `+localStorage.getItem("token"),
                "Content-Type": 'application/json'
            }
        }
        )
        .then((res)=>{
            alert(product+" "+" added to cart")
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
                    this.addToCart(id, product)
                })
                .catch((error) => {
                    this.props.history.push("/login/")
                })
        })
    }

    addressChangeHandler = (id) => {
        this.setState({
            addressSelected: id
        })
    }

    buy = (id, product) => {
        document.getElementById(id).style.visibility = "hidden"
        var id = id
        let addresses = this.state.addresses

        if(addresses[0]!==undefined){
            let addressSelected = this.state.addressSelected

            let address = addressSelected

            if (address === ""){
                address = addresses[0].id
            }
            Axios.post(`http://127.0.0.1:8000/checkout/product-checkout/`, {
                "product": id,
                "address": address
            },
            {
                headers: {
                    "Authorization": `Bearer `+localStorage.getItem("token"),
                    "Content-Type": 'application/json'
                }
            }
            )
            .then((res)=>{
                alert(product+" "+" added to checkout list" )
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
                        this.buy(id, product)
                    })
                    .catch((error) => {
                        this.props.history.push("/login/")
                    })
            })
        }else{
            this.props.history.push("/address/")
        }
    }

    buyPopupOn = (id) => {
        
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
                addresses : res.data,
                checkout: true
            })
            document.getElementById(id).style.visibility = "visible"
        })
        .then(() => {
            if (this.state.addresses[0]){
                let default_address = this.state.addresses[0].id
                document.getElementById(id+"address"+default_address).checked = "true"
            }
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
                    this.buyPopupOn(id)
                })
                .catch((error) => {
                    this.props.history.push("/login/")
                })
        })
        
    }

    buyPopupOff = (id) => {
        document.getElementById(id).style.visibility = "hidden"
    }

    productPage = (page) => {
        if (page === "next"){
            fetch(this.state.next_page)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    productList: data.results,
                    next_page: data.next,
                    previous_page: data.previous
                })
            })
        }else{
            fetch(this.state.previous_page)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    productList: data.results,
                    next_page: data.next,
                    previous_page: data.previous
                })
            })
        }
    }

    handleScroll = () => {
        const wrappedElement = document.getElementById('main_div');
        let next_page = this.state.next_page
        if(wrappedElement.getBoundingClientRect().bottom==window.innerHeight){
            if (next_page){
                fetch(next_page)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        productList: this.state.productList.concat(data.results),
                        next_page: data.next,
                        previous_page: data.previous
                    })
                })
            }
        }
    }


    render(){
        let products = this.state.productList;
        let categories = this.state.categories;
        let categoryProducts = this.categoryProducts
        let addToCart = this.addToCart
        let buy = this.buy
        let buyPopupOff = this.buyPopupOff
        let buyPopupOn = this.buyPopupOn
        let addresses = this.state.addresses
        let addressChangeHandler = this.addressChangeHandler
        let payment = this.payment

        return (
            <div className = "container" id = "main_div">
                <nav className="navbar navbar-light bg-light search-container">
                    <div className="container-fluid">
                        <div className="d-flex form">
                            <ul class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><button class="dropdown-item" onClick = {()=>categoryProducts("all")}>All</button></li>
                                    {categories.map(function(category, index){
                                        return(
                                            <li key={index}><button class="dropdown-item" onClick = {()=>categoryProducts(category.id)}>{category.title}</button></li>
                                        )
                                    })}
                                    
                                </ul>
                            </ul>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange = {this.changeHandler} />
                            <button className="btn btn-outline-success" onClick = {this.search}>Search</button>
                        </div>
                    </div>
                </nav>
                <div className = "row">
                    {products.map(function(product, index){
                        return(
                            <div className = "product-card col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6">
                                <div className = "product-image-container">
                                    <img src = {product.main_img} className = "product-image"/>
                                </div>
                                <p>{product.name}</p>
                                <p style = {{color: "red"}}>&#8377;<strike>{product.price}</strike></p>
                                <p>&#8377;{product.price-(product.price/100*product.discount)}</p>
                                <button type="button" class="btn btn-success" onClick = {() => buyPopupOn(product.id)}>Buy</button>
                                <button type="button" class="btn btn-warning" onClick = {() => addToCart(product.id, product.name)}>Add to cart</button>
                                <div className = "overlay" id = {product.id}>
                                    <button type="button" className="btn-close btn-close" aria-label="Close" style = {{float: "right", margin: "10px"}} onClick={() => buyPopupOff(product.id)}></button>
                                    <div id="text">
                                        <div className = "product-image-container" style = {{height: "100px", textAlign: "center", borderBottom:"0"}}>
                                            <img src = {product.main_img} className = "product-image"/>
                                        </div>
                                        <p>{product.name}</p>
                                        <p>&#8377;{product.price}</p>
                                        <hr/>
                                        <h5 style = {{textAlign: "left"}}>Select Address :</h5>
                                        <div className = "address-container">
                                            {addresses.map(function(address, index){
                                                return(
                                                    <label onClick = {() => addressChangeHandler(address.id)} style = {{width:"350px", textAlign:"left"}}>
                                                        <input type = "radio" value = {address.id} name = "address" id = {product.id+"address"+address.id}/>
                                                        {address.addressLine1 + " , " + address.addressLine2 + " , " + address.city + " ..."}
                                                    </label>
                                                ) 
                                                
                                            })}

                                        </div>

                                        <button className = "btn btn-primary">
                                            <Link to = "/address/" style = {{color: "white", textDecoration: "none"}}>
                                                Create new address
                                            </Link>
                                        </button>

                                        <hr />

                                        <button className = "btn btn-warning"  onClick={() => buy(product.id, product.name)} id = "pay-on-delivery" >Pay on delivery</button>

                                        <div className = "payment-btn-container">
                                            {payment}
                                        </div>
                                        

                                    </div>
                                </div>
                            </div>
                        )

                    })}
                </div>
            </div>
        )
    }
}

export default Product