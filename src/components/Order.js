import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class Order extends React.Component{
    static propTypes = {
        fishes: PropTypes.object,
        orders: PropTypes.object,
        removeFromOrder: PropTypes.func
    }

    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.orders[key];
        const isAvailable = fish && fish.status === 'available';
        if(!fish){return null;}
        if (!isAvailable) {
            return (
                <li key={key}>
                    Sorry the {fish ? fish.name : 'fish'} is not longer available
                </li>
            )
        }

        return (
            <li key={key}>
                {count} lbs {fish.name}
                { formatPrice(count * fish.price) }
                <button onClick={() => this.props.removeFromOrder(key)} >&times;</button>
            </li>
        )
    }

    render(){
        const  ordersId = Object.keys(this.props.orders);
        const total = ordersId.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.orders[key];
            const isAvailable = fish && fish.status === 'available';
            if (isAvailable) {
                return prevTotal + (count * fish.price);
            }
            return prevTotal;
        },0);
        


        return (<div className="order-wrap">
            <h2 className="order">Order</h2>
            <ul className="order">
            {ordersId.map(this.renderOrder)}
            </ul>
            <div className="total">
                Total: 
                <strong>{formatPrice(total)}</strong>
            </div>
        </div>
        )
    }
}

export default Order;