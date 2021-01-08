import React, { Component } from 'react';
import Product from './Product';
import './ProductList.css';

const APIURL = 'http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com/api/products/1';
const CONVERSION_FACTOR = 250;
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
        const filteredProducts = products.filter(product => product.category === category);
        const productItems = filteredProducts.map(product => {
			return (
				<Product key={product.title} {...product}/>
			)
        }) 

        var averageCubicWeight = 0;

        const reducer = (acc, product) => {
            const { width, length, height } = product.size
            return acc + (width * length * height / 10**6 * CONVERSION_FACTOR)
        }

        if(filteredProducts.length !== 0) {
            averageCubicWeight = filteredProducts.reduce(reducer, 0).toFixed(2)
        }

        return (
            <div>
                <h1>Category - <span>{category}</span></h1>
                <p className='subtitle'>Average cubic weight calculator built with React</p>
                <ul className='list'>
                    {productItems}
                </ul>
                <h2>Average Cubic Weight: {averageCubicWeight}kg</h2>
            </div>
        )
    }
}
