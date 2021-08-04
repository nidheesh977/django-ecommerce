import React, {Component} from "react"
import { render } from "react-dom"
import "../css/productStyle.css"
import Axios from "axios"


class Product extends Component{

    constructor(props){
        super(props)
        this.state = {
            productList : [],
            categories : [],
            searchValue : ""
        }
        this.fetchProducts = this.fetchProducts.bind(this)
        this.fetchCategory = this.fetchCategory.bind(this)
    }

    componentWillMount(){
        this.fetchProducts()
        this.fetchCategory()
    }

    fetchProducts(){
        fetch("http://127.0.0.1:8000/")
        .then(response => response.json())
        .then(data => this.setState({
            productList: data
        }))
        
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
        fetch("http://127.0.0.1:8000/product-filter/?search="+searchValue)
        .then(response => response.json())
        .then(data => this.setState({
            productList: data
        }))
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
            fetch("http://127.0.0.1:8000/")
            .then(response => response.json())
            .then(data => this.setState({
                productList: data
            }))
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
            console.log(res)
            alert(product+" "+id+" added to cart")
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
                    console.log(error)
                    this.props.history.push("/login/")
                })
        })
    }

    buy = (id, product) => {
        var id = id
        Axios.post(`http://127.0.0.1:8000/checkout/product-checkout/`, {
            "product": id
        },
        {
            headers: {
                "Authorization": `Bearer `+localStorage.getItem("token"),
                "Content-Type": 'application/json'
            }
        }
        )
        .then((res)=>{
            console.log(res)
            alert(product+" "+id+" added to buy list" )
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
                    console.log(error)
                    this.props.history.push("/login/")
                })
        })
    }

    render(){
        
        var products = this.state.productList;
        var categories = this.state.categories;
        var cp = this.categoryProducts
        var atc = this.addToCart
        var buy = this.buy
        return (
            <div className = "container">
                <nav className="navbar navbar-light bg-light search-container">
                    <div className="container-fluid">
                        <div className="d-flex form">
                            <ul class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><button class="dropdown-item" onClick = {()=>cp("all")}>All</button></li>
                                    {categories.map(function(category, index){
                                        return(
                                            <li key={index}><button class="dropdown-item" onClick = {()=>cp(category.id)}>{category.title}</button></li>
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
                                <p>${product.price}</p>
                                <button type="button" class="btn btn-success" onClick = {() => buy(product.id, product.name)}>Buy</button>
                                <button type="button" class="btn btn-warning" onClick = {() => atc(product.id, product.name)}>Add to cart</button>
                            </div>
                        )

                    })}
                </div>
            </div>
        )
    }
}

export default Product