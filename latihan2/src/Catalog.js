import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'

export default class Catalog extends Component {
    constructor() {
        super()

        this.state = {
            lenght: 0,
            products: []
        }

        this.handleAdd = this.handleAdd.bind(this);
    }

    componentDidMount() {
        fetch('https://fakestoreapi.com/products?limit=5')
            .then(res => res.json())
            .then(res => this.setState({
                lenght: res.lenght,
                products: res
            }))
    }

    handleAdd() {
        const newProducts = this.state.products.concat([
            { id:this.state.lenght + 1, title: prompt('Enter product name'), price: prompt('Enter product price')}
        ]);
        this.setState((state) => ({ lenght: state.lenght + 1, products: newProducts }));
    }

    handleRemove(id) {
        let newProducts = this.state.products.filter(function (product) {
            return product.id !== id 
        });
        this.setState({ products: newProducts });
    }

    render() {
        const { products } = this.state
        const productsItem = products.map((product) =>
            <div key={product.id}>
                <span onClick={() => this.handleRemove(product.id)} style={{ color: "red", cursor: "pointer" }}>X </span>
                {product.title} - ${product.price}
            </div>
        )
        return (
            <div style={{ textAlign: 'left' }}>
                <button onClick={this.handleAdd} style={{ padding: "5px 20px"}}><b>Add Item</b></button>
                <CSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                {productsItem}
                </CSSTransitionGroup>
            </div>
        )
    }
}