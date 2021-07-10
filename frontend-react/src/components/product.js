import React, {Component} from "react"
import { render } from "react-dom"
import "../css/productStyle.css"


class Product extends Component{

    constructor(props){
        super(props)
        this.state = {
            productList : [],
            searchValue : ""
        }
        this.fetchProducts = this.fetchProducts.bind(this)
    }

    componentWillMount(){
        this.fetchProducts()
    }

    fetchProducts(){
        fetch("http://127.0.0.1:8000/")
        .then(response => response.json())
        .then(data => this.setState({
            productList: data
        }))
    }

    changeHandler(e){
        this.setState({
            searchValue: e.target.value
        )}
    }



    render(){
        
        var products = this.state.productList;
        return (
            <div className = "container">
                <nav className="navbar navbar-light bg-light search-container">
                    <div className="container-fluid">
                        <form className="d-flex form">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange = {this.changeHandler} />
                            <button className="btn btn-outline-success">Search</button>
                        </form>
                    </div>
                </nav>
                <div>
                    <h1>{this.state.searchValue}</h1>
                </div>
                <div className = "row">
                    {products.map(function(product, index){
                        return(
                            <div className = "product-card col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6">
                                <div className = "product-image-container">
                                    <img src = {product.main_img} className = "product-image"/>
                                </div>
                                <p>{product.name}</p>
                                <p>&#8377;{product.price}</p>
                                <button type="button" class="btn btn-success">Buy</button>
                                <button type="button" class="btn btn-warning">Add to cart</button>
                            </div>
                        )

                    })}
                </div>
            </div>
        )
    }
}

export default Product