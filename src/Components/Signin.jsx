import React, {useState} from "react";
import { Link } from "@reach/router";
import { signInWithGoogle } from "../firebase";
import { auth } from "../firebase";


const SignIn = () => { //Has three pieces of state:
    const [email, setEmail] = useState(''); //For storing user email
    const [password, setPassword] = useState(''); //For storing user password
    const [error, setError] = useState(null);//For displaying error message 

    const signInWithEmailAndPasswordHandler = 
            (event,email, password) => {
                event.preventDefault();
                auth.signInWithEmailAndPassword(email, password).catch(error => {
                  setError("Error signing in with password and email!");
                    console.error("Error signing in with password and email", error);
                });
    };

      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;

          if(name === 'userEmail') {
              setEmail(value);
          }
          else if(name === 'userPassword'){
            setPassword(value);
          }
      };

  return (
    <div className="container">
      <h1 className="email-button">Sign In</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
        <form className="">
          <input
            type="email"
            className="signin-field"
            name="userEmail"
            value = {email}
            placeholder="Email"
            id="userEmail"
            onChange = {(event) => onChangeHandler(event)}
          />
          <br></br>
          <input
            type="password"
            className="signin-field"
            name="userPassword"
            value = {password}
            placeholder="Password"
            id="userPassword"
            onChange = {(event) => onChangeHandler(event)}
          />      
        </form>

        <div classname="signin-signup-buttons">
        <button className="button-email" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
            Sign In
        </button>
        <button className="button-email" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
            SignUp
        </button>
        </div>

        <button
          onClick={() => {
            try {
              signInWithGoogle();
            } catch (error) {
              console.error("Error signing in with Google", error);
            }
          }}
          className="button-google">
          Sign in with Google
        </button>
        <p className="text-center my-3">
          Don't have an account?{" "}
          {/*Link component that Reach Router provides:similar to the anchor element in HTML, 
          and similar in function to the href attribute of the anchor element.*/}
          <Link to="signUp" className="text-blue-500 hover:text-blue-600"> 
            Sign up here
          </Link>{" "}
          <br />{" "}
          <Link to = "passwordReset" className="text-blue-500 hover:text-blue-600">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;