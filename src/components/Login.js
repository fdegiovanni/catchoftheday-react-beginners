import React from "react";
import PropTypes from "prop-types";

const Login = (props) => (
  <nav className="login">
    <h2>Inventory login</h2>
    <p>Sign in to manage your store's inventory</p>
    <button
      className="github"
      onClick={() => props.autheticate("Github")}
    >Log In with GitHub</button>

    <button
      className="facebook"
      onClick={() => props.autheticate("Facebook")}
    >Log In with Facebook</button>


</nav>
);

Login.propTypes = {
    autheticate: PropTypes.func.isRequired
  };

export default Login;
