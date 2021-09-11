import React, {Component} from "react"
import Axios from "axios"
import "../css/createProduct.css"


class CreateProduct extends Component{
    constructor(props){
        super(props)
        this.state = {

            categoryList: [],
            product_image: "",
            product_name: "",
            product_price: "",
            product_category: "",
            discount: "",
            categoryTitle: ""

        }

        this.fetchCategory = this.fetchCategory.bind(this)
    }

    componentWillMount(){
        this.fetchCategory()
    }

    fetchCategory(){
        Axios.get(`http://127.0.0.1:8000/category/`,
        {
            headers: {
                "Authorization": `Bearer `+localStorage.getItem("token"),
                "Content-Type": 'application/json'
            }
        }
        )
        .then((res)=>{
            this.setState({
                categoryList : res.data
            })
            console.log(res.data)
        })
        .catch((error)=>{
            this.props.history.push("/login/")
        })
    }

    imageChangeHandler = (e) => {
        this.setState({
            product_image: e.target.files[0]
        })
    }

    productNameChangeHandler = (e) => {
        this.setState({
            product_name : e.target.value
        })
    }

    productPriceChangeHandler = (e) => {
        this.setState({
            product_price : e.target.value
        })
    }

    discountChangeHandler = (e) => {
        this.setState({
            discount : e.target.value
        })
    }
    
    categoryChangeHandler = (e) => {
        console.log(e.target.value)
        this.setState({
            product_category: e.target.value
        })
    }

    createProduct = () => {

        const formData = new FormData

        formData.append("name", this.state.product_name)
        formData.append("category", this.state.product_category)
        formData.append("main_img", this.state.product_image)
        formData.append("price", this.state.product_price)
        formData.append("discount", this.state.discount)

        Axios.post(`http://127.0.0.1:8000/`, formData,
        {
            headers: {
                "Authorization": `Bearer `+localStorage.getItem("token"),
                "Content-Type": 'application/json'
            }
        }
        )
        .then((res)=>{
            alert("Product created")
        })
        .catch((error) => {
            this.props.history.push("/login/")
        })
    }

    createCategoryPopupOn = () => {
        document.getElementById("create-category-popup").style.visibility = "visible"
    }
    
    createCategoryPopupOff = () => {
        document.getElementById("create-category-popup").style.visibility = "hidden"
    }

    categoryTitleChangeHandler = (e) => {
        this.setState({
            categoryTitle: e.target.value
        })
    }

    createCategory = () => {
        if (this.state.categoryTitle !== ""){

            Axios.post(`http://127.0.0.1:8000/category/`, {
                    "title": this.state.categoryTitle
                },
                {
                    headers: {
                        "Authorization": `Bearer `+localStorage.getItem("token"),
                        "Content-Type": 'application/json'
                    }
                }
            )
            .then((res)=>{
                alert("Category created")
                window.location.reload();
            })
            .catch((error)=>{
                this.props.history.push("/login/")
            })
        }
    }

    render(){

        let categoryChangeHandler = this.categoryChangeHandler
        let imageChangeHandler = this.imageChangeHandler
        let productNameChangeHandler = this.productNameChangeHandler
        let productPriceChangeHandler = this.productPriceChangeHandler
        let discountChangeHandler = this.discountChangeHandler
        let createProduct = this.createProduct
        let categoryList = this.state.categoryList
        let createCategoryPopupOn = this.createCategoryPopupOn
        let createCategoryPopupOff = this.createCategoryPopupOff
        let categoryTitleChangeHandler = this.categoryTitleChangeHandler
        let createCategory = this.createCategory


        return(
            <div className = "container">
                <div>
                    <div class="form-group">
                        <label for="exampleFormControlFile1">Product image : </label>
                        <input type="file" class="form-control-file" id="exampleFormControlFile1" onChange = {imageChangeHandler}/>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputCity">Product name:</label>
                            <input type="text" class="form-control" id="inputCity" placeholder = "product name" onChange = {productNameChangeHandler}/>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputCity">Product price:</label>
                            <input type="number" class="form-control" id="inputCity" placeholder = "product price" onChange = {productPriceChangeHandler}/>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputCity">Discount:</label>
                            <input type="number" class="form-control" id="inputCity" placeholder = "discount in %" onChange = {discountChangeHandler}/>
                        </div>
                        <div className = "row">
                                <label for="inputState">Category:</label>
                                <div class="form-group col-md-4">
                                    <select id="inputState" class="form-control" onChange = {categoryChangeHandler}>

                                    <option>
                                        Choose category . . .
                                    </option>

                                        {categoryList.map(function(category, index){
                                            return(
                                                <option value={category.id}>
                                                    {category.title}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className = "col-md-4">
                                    <button className = "btn btn-success" onClick = {createCategoryPopupOn}>Create Category</button>
                                    
                                </div>

                                <div className = "overlay" id = "create-category-popup">
                                    <div id="text">
                                        <div class="form-row">
                                            <button type="button" className="btn-close btn-close" aria-label="Close" style = {{float: "right", margin: "10px"}} onClick={() => createCategoryPopupOff()}></button>
                                            <div class="form-group col-md-12">
                                                <input type="text" class="form-control" placeholder = "title" onChange = {categoryTitleChangeHandler}/>
                                                <br />
                                                <button className = "btn btn-success" style = {{width: "100%"}} onClick = {createCategory}>Create</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        
                    </div>
                    <br />
                    <button class="btn btn-primary" onClick = {createProduct}>Create</button>
                </div>
            </div>
        )
    }
}

export default CreateProduct