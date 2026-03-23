import React from "react";
import FacebookLogin from "react-facebook-login";

function SignIn(props) {
  return (
    <div className="container mt-5 text-center">
      <h3>Sign In</h3>
      <hr />
      <p>Please sign in to continue to checkout.</p>
      <FacebookLogin
        appId="930180989761769"
        autoLoad={false}
        fields="name,email,picture"
        callback={props.onFBLogin}
        icon="fa-facebook"
      />
    </div>
  );
}

export default SignIn;
