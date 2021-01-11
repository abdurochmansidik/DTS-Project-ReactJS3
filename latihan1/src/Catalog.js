import React, { Component } from 'react';

export default class Catalog extends Component {
    constructor() {
        super()

        this.state = {
            lenght: 0,
            products: []
        }
    }

    componentDidMount() {
        fetch('https://fakestoreapi.com/products?limit=5')
            .then(res => res.json())
            .then(res => this.setState({
                lenght: res.lenght,
                products: res
            }))
    }

    render() {
        const { products } = this.state
        const productsItem = products.map((product) =>
            <div key={product.id}>
                {product.title} - ${product.price}
            </div>
        )
        return (
            <div style={{ textAlign: 'left' }}>
                {productsItem}
            </div>
        )
    }
}