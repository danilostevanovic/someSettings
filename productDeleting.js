import React from 'react';
import ReactDOM from 'react-dom';

class Deleting extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            products: [{ id: 1, name: 'product 1', quantity: 2 }, { id: 2, name: 'product 2', quantity: 3 }, { id: 3, name: 'product 3', quantity: 2 }]
        }
        this.deleteProduct = this.deleteProduct.bind(this);
        this.changeQuantity = this.changeQuantity.bind(this);
    }
    componentDidMount() {
        try {
            const products = JSON.stringify(this.state.products);
            sessionStorage.setItem('products', products)

        } catch (e) {
            // do nothing at all
        }
    }
    deleteProduct(productToRemove) {
        this.setState((prevState) => ({
            products: prevState.products.filter(product => productToRemove.id !== product.id)
        }))
    }
    changeQuantity(e, productToChange, index) {
        const newQuantity = Number(e.target.value);
        const { quantity } = productToChange;
        const changed = {
            ...productToChange,
            quantity: newQuantity
        }

        this.setState((prevState) => ({
            products: prevState.products.map((product, index) => {
                if (productToChange.id === product.id) {
                    return {
                        ...changed
                    }
                }
                return product
            })
        }))

    }
    componentDidUpdate(prevPros, prevState) {
        if (prevState.products.length !== this.state.products.length) {
            const json = JSON.stringify(this.state.products);
            sessionStorage.setItem('products', json);
        }
        if (prevState.products !== this.state.products) {
            const json = JSON.stringify(this.state.products);
            sessionStorage.setItem('products', json);
        }
    }
    render() {
        return (
            <div>
                {this.state.products.map((product, index) => (
                    <div key={index}>{product.name} and {product.quantity} <span><button onClick={() => this.deleteProduct(product)}>Delete Product</button></span><input onChange={(e) => this.changeQuantity(e, product, index)} type="number" /></div>
                ))}
            </div>
        )
    }
}

ReactDOM.render(<Deleting />, document.getElementById('app'));