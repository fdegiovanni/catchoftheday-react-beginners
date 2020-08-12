import React from "react";
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {
  static propTypes = {
    fish: PropTypes.shape({
      name: PropTypes.string, 
      desc: PropTypes.string, 
      price: PropTypes.number, 
      image: PropTypes.string, 
      status:PropTypes.string
    }),
    index: PropTypes.string,
    updateFish: PropTypes.func,
    removeFish: PropTypes.func
  }

  handleChange = (event) => {
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value
    }
    this.props.updateFish(this.props.index, updatedFish);
  };

  render() {
    return (
      <div className="fish-edit">
        <input onChange={this.handleChange} name="name" value={this.props.fish.name} type="text" />
        <input onChange={this.handleChange} name="price" value={this.props.fish.price} type="text" />
        <select onChange={this.handleChange} name="status" value={this.props.fish.status}>
          <option value="avalaible">Fresh!</option>
          <option value="unavalaible">Sold Out!</option>
        </select>
        <textarea onChange={this.handleChange} name="desc" value={this.props.fish.desc}></textarea>
        <input
          onChange={this.handleChange} name="image"
          value={this.props.fish.image}
          type="text"
          placeholder="Image"
        />
        <button onClick={() => this.props.removeFish(this.props.index)} >Remove item!</button>
      </div>
    );
  }
}

export default EditFishForm;
