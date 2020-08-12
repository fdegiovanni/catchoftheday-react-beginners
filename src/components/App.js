import React from "react";
import PropTypes from "prop-types";
import Header from "./Header.js";
import Inventory from "./Inventory.js";
import Order from "./Order.js";
import fishes from "../sample-fishes";
import Fish from "./Fish";

import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    orders: {},
  };

  static propTypes = {
    match: PropTypes.object,
  };

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ orders: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.orders)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    const fishes = { ...this.state.fishes };

    fishes[`fish${Date.now()}`] = fish;

    this.setState({ fishes });
    console.log(fish);
  };

  updateFish = (key, fishUpdated) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = fishUpdated;
    this.setState({ fishes });
  };

  removeFish = (key) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;
    this.setState({ fishes });
  };

  addToOrder = (key) => {
    const orders = { ...this.state.orders };

    orders[key] = orders[key] + 1 || 1;

    this.setState({ orders });
  };

  removeFromOrder = (key) => {
    const orders = { ...this.state.orders };
    delete orders[key];
    this.setState({ orders });
  };

  loadSamplesFishes = () => {
    console.log(fishes);
    this.setState({ fishes });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh fish!" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          orders={this.state.orders}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          storeId={this.props.match.params.storeId}
          fishes={this.state.fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          loadSamplesFishes={this.loadSamplesFishes}
        />
      </div>
    );
  }
}

export default App;
