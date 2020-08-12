import React from "react";
import firebase from "firebase";
import PropTypes from "prop-types";
import base, { firebaseApp } from "../base";
import AddNewFish from "./AddNewFish";
import EditFishForm from "./EditFishForm";
import Login from "./Login";

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    removeFish: PropTypes.func,
    addFish: PropTypes.func,
    loadSamplesFishes: PropTypes.func,
    storeId: PropTypes.string.isRequired,
  };

  state = {
    uid: null,
    owner: null,
  };

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({user});
      }
    })
  }

  authHandler = async (authData) => {
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      });
    }

    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });

    console.log(authData);
  };

  autheticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({uid: null});
  }

  render() {
    const logout = <button className="logout" onClick={this.logout}>Log Out!</button>

    if (!this.state.uid) {
      return <Login autheticate={this.autheticate} />;
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner!</p>
          {logout}
        </div>
      );
    }

    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map((key) => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            removeFish={this.props.removeFish}
          />
        ))}
        <AddNewFish addFish={this.props.addFish} />
        <button onClick={this.props.loadSamplesFishes}>
          Load Sample Fishes!
        </button>
      </div>
    );
  }
}

export default Inventory;
