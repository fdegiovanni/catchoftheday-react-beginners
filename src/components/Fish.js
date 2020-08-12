import React from "react";
import PropTypes from 'prop-types';
import { formatPrice } from "../helpers";

class Fish extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      name: PropTypes.string, 
      desc: PropTypes.string, 
      price: PropTypes.number, 
      image: PropTypes.string, 
      status:PropTypes.string
    }),
    addToOrder: PropTypes.func
  }

  render() {
    const { name, desc, price, image, status } = this.props.details;
    let isAvailable = status === 'available';
    return (
      <li className="menu-fish">
        <img src={image} name={name} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)} > { isAvailable ? "Add to cart" : "Sold Out" } </button>
      </li>
    );
  }
}

export default Fish;
