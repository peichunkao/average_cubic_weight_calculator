import React, { Component } from 'react';
import './Product.css';

export default class Product extends Component {
    render() {
        const { title, weight, size } = this.props;
        const { width, length, height } = size;

        return (
            <li className='product'>
                {title} - {weight}g - {width}cm * {length}cm * {height}cm
            </li>
        )
    }
}
