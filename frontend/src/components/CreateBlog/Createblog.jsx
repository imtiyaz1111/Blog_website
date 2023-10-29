import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Createblog = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  // input change
  const onInputChange = (e) => {
    setInputs({...inputs,[e.target.name]: e.target.value})
  };
  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {title,description,image}=inputs;
      const res = await fetch("https://blog-website-neon-one.vercel.app/api/v1/blog/create-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          image,
          user: id,
        }),
      });
      const data = await res.json();
      if (!data) {
        toast.error("Invalid Details");
      } else if (!title || !description || !image) {
        toast.error("All Filled Required");
      } 
      else
      {
        toast.success("Blog Created Successfull");
        console.log("Blog Created Successfull");
        navigate("/my-blog")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form method="POST">
      <ToastContainer />
        <Box
          width={"50%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="gray"
          >
            Create A Pots
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            onChange={(e) => onInputChange(e)}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            onChange={(e) => onInputChange(e)}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            onChange={(e) => onInputChange(e)}
            margin="normal"
            variant="outlined"
            required
          />
          <Button type="submit" color="primary" variant="contained" onClick={handleSubmit}>
            SUBMIT
          </Button>
        </Box>
      </form>
    </>
  )
}

export default Createblog
