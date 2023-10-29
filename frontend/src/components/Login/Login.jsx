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
  background: #fb641b;
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
const loginInitialValues = {
    username: '',
    password: ''
  };

const Login = () => {
    const  navigate=useNavigate()
    const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
    const [login, setLogin] = useState(loginInitialValues);
    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        try {
          const {username, password } = login;
          const res = await fetch("http://localhost:8000/api/v1/user/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password,
            }),
          });
          const data=await res.json();
          if(res.status === 400 || !data)
          {
            toast.error("Invalid Details")
          }
          else
          {
            localStorage.setItem("token",JSON.stringify(data))
            localStorage.setItem("userId",data.userLogin._id)
            toast.success("Login Successfull")
            console.log("Registration Successfull") 
            navigate("/my-blog")
          }
        } catch (error) {
          
        }
      }
  return (
    <Component>
      <ToastContainer />
      <Box style={{ marginTop: 64 }}>
        <Image src={imageURL} alt="blog" />
        <Wrapper>
            <TextField
              variant="standard"
              name="username"
              value={login.username} onChange={(e) => onValueChange(e)}
              label="Enter Username"
            />
            <TextField
              variant="standard"
              name="password"
              value={login.password} onChange={(e) => onValueChange(e)}
              label="Enter Password"
            />
            <LoginButton onClick={() => loginUser()} variant="contained">Login</LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton
              href="/register"
              style={{ marginBottom: 50 }}
            >
              Create an account
            </SignupButton>
          </Wrapper>
      </Box>
    </Component>
  )
}

export default Login
