import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { googleSignInInitiate } from "../redux/actions/authAction";
import { updateStateModal } from "../redux/actions/newxfeedAction";
import GoogleIcon from '@mui/icons-material/Google';
import "./LoginRegistration.css";

const LoginRegistration = () => {

  const [addclass, setaddclass] = useState("");
  const dispatch = useDispatch()

  return (
    <Box sx={{ my: 8 }}>
      <div className={`containerlog ${addclass}`} id="container">
        <div className="form-container sign-up-container">
          <form
            className="formlog"
          // onSubmit={handleRegisterSubmit}
          // onClick={createUser}
          >
            <h3>Create Account</h3>
            <Button
              onClick={() => {
                dispatch(updateStateModal(false))
                dispatch(googleSignInInitiate())
              }}
              className=" social">
              <GoogleIcon />
            </Button>
            <input
              type="text"
              className="inputlog"
              placeholder="Full Name"
              name="name"
            // onBlur={handleOnChange}
            />
            <input
              type="email"
              className="inputlog"
              placeholder="Email"
              name="email"
            // onBlur={handleOnChange}
            />
            <input
              type="text"
              name="githubname"
              className="inputlog"
              placeholder="UserName of GithubAccount"
            // onBlur={handleOnChange}
            />
            <input
              type="number"
              name="phoneNumber"
              className="inputlog"
              placeholder="Phone Number"
            // onBlur={handleOnChange}
            />

            <button className="btnlog" type="submit">
              REGISTER
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form className="formlog"
          // onSubmit={handleLoginSubmit}
          >
            <h3 >Login</h3>

            <div class="social-container">
              <Button
                onClick={() => {
                  dispatch(updateStateModal(false))
                  dispatch(googleSignInInitiate())
                }}
                className=" social">
                <GoogleIcon />
              </Button>
            </div>
            <span className="heading_two spanlog">or use your account</span>

            <input
              required
              type="email"
              className="inputlog"
              // className="w-8/12 my-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Your  Email"
              name="email"
            // onBlur={handleOnChange}
            />
            <input
              type="number"
              name="phoneNumber"
              className="inputlog"
              placeholder="Phone Number"
            // onBlur={handleOnChange}
            />
            <button className="btnlog" type="submit">
              Login
            </button>
            <br />
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="text-2xl font-bold ">Welcome Back!</h1>
              <p className="plog heading">
                To keep connected with us please login with your personal info.
              </p>
              <button
                className="ghost btnlog"
                id="signIn"
                onClick={() => setaddclass("")}
              >
                GO TO LOGIN
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="text-2xl font-bold ">Hello, Friend!</h1>
              <p className=" plog heading">
                Enter your personal details and start journey with us.
              </p>
              <button
              
                className="ghost btnlog"
                id="signUp"
                onClick={() => setaddclass("right-panel-active")}
              >
                GO TO REGISTER
              </button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default LoginRegistration;