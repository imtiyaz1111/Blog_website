import React, { useState,} from 'react';
import {useNavigate} from "react-router-dom"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TextField, Box, Button, Typography, styled } from "@mui/material";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled("img")({
  width: 100,
  display: "flex",
  margin: "auto",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;
const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;


const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const signupInitialValues = {
    name: "",
    username: "",
    password: "",
  };

const Register = () => {
    const  navigate=useNavigate()
    const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
    const [signup, setSignup] = useState(signupInitialValues);

    
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    const { name, username, password } = signup;
    const res = await fetch("http://localhost:8000/api/v1/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        password,
      }),
    });
    const data = await res.json();
    if (!data) {
      toast.error("Invalid Registration");
    } else if (!name || !username || !password) {
      toast.error("All Filled Required");
    } 
    else if(res.status === 422)
    {
      toast.error("userName Already Exist ")
    }
    else if (res.status === 422) {
      toast.error("Email Already Exist ");
    } else {
      toast.success("Registration Successfull");
      console.log("Registration Successfull");
      navigate("/login")
    }
  };


  return (
    <Component>
      <ToastContainer />
      <Box style={{ marginTop: 64 }}>
        <Image src={imageURL} alt="blog" />
        <Wrapper>
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="name"
              label="Enter Name"
            />
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="username"
              label="Enter Username"
            />
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="password"
              label="Enter Password"
            />

            <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton href='/login' variant="contained">
              Already have an account
            </LoginButton>
          </Wrapper>
      </Box>
    </Component>
  )
}

export default Register
