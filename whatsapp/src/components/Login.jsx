import React from "react";
import { Button } from "@mui/material";
import { auth, provider } from "../firebase";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import "./login.css";
import { useStateValue } from "./ContextApi/StateProvider";
import { actionTypes } from "./ContextApi/reducer";

const Login = () => {
  const [state, dispatch] = useStateValue();

  console.log(state);

  const singIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <div className="login">
        <div className="login_conatiner">
          <img
            src="https://tse1.mm.bing.net/th?id=OIP.hbr47SG8Nl1CUsQBVLhz_AHaHa&pid=Api&P=0&h=220"
            alt=""
          />
          <div className="login_text">
            <h1>Signin to whatsapp</h1>
          </div>
          <Button onClick={singIn}>Sing in with google</Button>
        </div>
      </div>
    </>
  );
};

export default Login;
