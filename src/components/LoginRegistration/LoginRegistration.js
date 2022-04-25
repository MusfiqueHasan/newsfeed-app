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
  const { currentUser } = useSelector(state => state.authentication)
  console.log(currentUser.email)
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
            <input
              type="password"
              className="inputlog"
              placeholder="Password"
              name="password"
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
            <h1 className="h1log">Login</h1>

            <div class="social-container">
              <Button
                onClick={() => {
                  // if (currentUser?.email) {
                  // }
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
            <br />
            <input
              className="inputlog"
              required
              placeholder="Your Password"
              // className="w-8/12 my-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              type="password"
              name="password"
            // onBlur={handleOnChange}
            />
            <br />
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