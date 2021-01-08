import React, { Component } from 'react'

const APIURL = 'http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com/api/products/1';
export default class ProductList extends Component {
    constructor(props) {
		super(props)
		this.state = {
			products:[]
		}
    }
    
    componentDidMount() {
        this.loadProducts();
	}

    loadProducts() {
        fetch(APIURL)
		.then(res => {
			if(!res.ok) {
				if(res.status >= 400 || res.status < 500) {
					const data = res.json();
					let errorMessage = { errorMessage: data.message };
					throw errorMessage;
				} else {
					let errorMessage = {errorMessage: 'Please try again later, server is not responding.'}
					throw errorMessage
				}
			} else {
				return res.json()
			}
        })
        .then(res => this.setState({products: res.objects}))
	}

    render() {
        const { products } = this.state;
        const { category } = this.props;

        const filteredProducts = products.filter(product => product.category === category)
        console.log(filteredProducts)

        return (
            <div>
                <h1>Product List</h1>
            </div>
        )
    }
}
